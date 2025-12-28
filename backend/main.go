package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

type UserRequest struct {
	UserID        string   `json:"userId"` // New field
	Name          string   `json:"name"`
	SelectedGoals []string `json:"selectedGoals"`
	Gender        string   `json:"gender"`
	Age           int      `json:"age"`
	Height        int      `json:"height"`
	Weight        int      `json:"weight"`
	TargetWeight  int      `json:"targetWeight"`
	WeeklyRate    string   `json:"weeklyRate"`
	Habits        []string `json:"habits"`
	ActivityLevel string   `json:"activityLevel"`
	Barriers      []string `json:"barriers"`
	PledgeDays    int      `json:"pledgeDays"`
}

type AIPlanResponse struct {
	Calories    int    `json:"calories"`
	Protein     int    `json:"protein"`
	Carbs       int    `json:"carbs"`
	Fat         int    `json:"fat"`
	Message     string `json:"message"`
	GoalSummary string `json:"goalSummary"`
}

type OpenAIRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type OpenAIResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

var db *sql.DB

func initDB() {
	var err error
	// Try POSTGRES_URL first (common in Supabase export), fallback to SUPABASE_DB_URL
	connStr := os.Getenv("POSTGRES_URL")
	if connStr == "" {
		connStr = os.Getenv("SUPABASE_DB_URL")
	}

	if connStr == "" {
		log.Println("Warning: POSTGRES_URL is not set")
		return
	}

	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err = db.Ping(); err != nil {
		log.Println("Warning: Could not ping database:", err)
		return
	}

	fmt.Println("Connected to Database")

	createTables()
}

func createTables() {
	// Simple schema creation
	queryUsers := `
	CREATE TABLE IF NOT EXISTS users (
		user_id TEXT PRIMARY KEY,
		name TEXT,
		age INT,
		gender TEXT,
		height INT,
		weight INT,
		target_weight INT,
		activity_level TEXT,
		pledge_days INT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	queryPlans := `
	CREATE TABLE IF NOT EXISTS fitness_plans (
		id SERIAL PRIMARY KEY,
		user_id TEXT REFERENCES users(user_id),
		plan_json JSONB,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	if _, err := db.Exec(queryUsers); err != nil {
		log.Println("Error creating users table:", err)
	}
	if _, err := db.Exec(queryPlans); err != nil {
		log.Println("Error creating fitness_plans table:", err)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file")
	}

	initDB()

	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "ok", "message": "Backend is running"})
	})

	mux.HandleFunc("/api/generate-plan", handleGeneratePlan)

	// CORS handler
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5174", "http://localhost:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "Accept"},
		AllowCredentials: true,
		Debug:            true,
	})

	handler := c.Handler(mux)

	fmt.Println("Server starting on :8081...")
	if err := http.ListenAndServe(":8081", handler); err != nil {
		log.Fatal(err)
	}
}

func handleGeneratePlan(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req UserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Mocking for development if API Key is missing or for testing
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		// Return mock data
		mockPlan := AIPlanResponse{
			Calories:    2250,
			Protein:     180,
			Carbs:       200,
			Fat:         65,
			Message:     "This is a mocked plan because API key is missing.",
			GoalSummary: "Lose Weight & Build Muscle",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(mockPlan)
		return
	}

	// Construct Prompt
	prompt := fmt.Sprintf(`
		Act as an expert fitness coach. Generate a calculated fitness plan JSON for this user:
		Name: %s
		Age: %d, Gender: %s, Height: %dcm, Weight: %dkg
		Target Weight: %dkg
		Weekly Rate: %s
		Habits: %s
		Goals: %s
		Activity Level: %s
		Barriers: %s
		Commitment: %d days/week

		Return ONLY a JSON object with this exact structure (no markdown, no extra text):
		{
			"calories": 2200,
			"protein": 150,
			"carbs": 200,
			"fat": 70,
			"message": "A short, punchy 1-sentence motivational summary.",
			"goalSummary": "A very short 2-3 word summary of the strategy e.g. 'Aggressive Cut' or 'Lean Bulk'"
		}
		Calculate the values precisely based on the user's BMR and TDEE.
	`, req.Name, req.Age, req.Gender, req.Height, req.Weight, req.TargetWeight,
		req.WeeklyRate, strings.Join(req.Habits, ", "),
		strings.Join(req.SelectedGoals, ", "), req.ActivityLevel, strings.Join(req.Barriers, ", "), req.PledgeDays)

	// Call OpenAI
	aiReq := OpenAIRequest{
		Model: "gpt-4o-mini",
		Messages: []Message{
			{Role: "system", Content: "You are a precise fitness API that outputs only JSON."},
			{Role: "user", Content: prompt},
		},
	}

	jsonData, _ := json.Marshal(aiReq)
	client := &http.Client{}
	httpReq, _ := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(jsonData))
	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := client.Do(httpReq)
	if err != nil {
		http.Error(w, "Failed to call AI", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	// Parse AI Response
	var openAIResp OpenAIResponse
	if err := json.Unmarshal(body, &openAIResp); err != nil {
		http.Error(w, "Failed to parse API response", http.StatusInternalServerError)
		return
	}

	if len(openAIResp.Choices) == 0 {
		http.Error(w, "No response from AI", http.StatusInternalServerError)
		return
	}

	content := openAIResp.Choices[0].Message.Content
	// Clean markdown block if present
	content = strings.TrimPrefix(content, "```json")
	content = strings.TrimSuffix(content, "```")
	content = strings.TrimSpace(content)

	// Save to DB (Fire and forget or check error? Checking error is safer)
	if db != nil && req.UserID != "" {
		// Upsert user
		_, err := db.Exec(`
			INSERT INTO users (user_id, name, age, gender, height, weight, target_weight, activity_level, pledge_days)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
			ON CONFLICT (user_id) 
			DO UPDATE SET 
				name = EXCLUDED.name,
				age = EXCLUDED.age, 
				weight = EXCLUDED.weight,
				target_weight = EXCLUDED.target_weight,
				activity_level = EXCLUDED.activity_level,
				pledge_days = EXCLUDED.pledge_days;
		`, req.UserID, req.Name, req.Age, req.Gender, req.Height, req.Weight, req.TargetWeight, req.ActivityLevel, req.PledgeDays)

		if err != nil {
			log.Println("Error saving user:", err)
		}

		// Save plan
		_, err = db.Exec(`INSERT INTO fitness_plans (user_id, plan_json) VALUES ($1, $2)`, req.UserID, content)
		if err != nil {
			log.Println("Error saving plan:", err)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(content))
}
