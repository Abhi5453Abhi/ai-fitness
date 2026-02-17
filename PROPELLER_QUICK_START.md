# 🚀 Propeller Ads - Quick Start (5 Minutes)

## Step-by-Step Setup

### 1️⃣ Sign Up (2 minutes)
```
1. Go to: https://www.propellerads.com/
2. Click "Sign Up" → Select "Publisher"
3. Enter:
   - Email: your-email@example.com
   - Website: https://your-app-url.com
   - Category: Health & Fitness
4. Verify email → Login
```

---

### 2️⃣ Create Ad Zones (2 minutes)

In Propeller Dashboard (https://partners.propellerads.com/):

#### Zone 1: Interstitial Video Ad
```
Ad Zones → + Create → Interstitial
Name: "Workout Interstitial"
Frequency: Once per 30 minutes
→ Copy Zone ID (e.g., "123456")
```

#### Zone 2: Banner Ad
```
Ad Zones → + Create → Multi Tag (Banner)
Name: "Store Banner"
Size: 320x50
→ Copy Zone ID (e.g., "789012")
```

#### Zone 3: Native Banner
```
Ad Zones → + Create → Native Banner
Name: "Dashboard Native"
→ Copy Zone ID (e.g., "345678")
```

---

### 3️⃣ Update Config File (1 minute)

Open: `lib/propeller-config.ts`

Replace these 3 lines:
```typescript
interstitialZoneId: 'YOUR_ZONE_ID_HERE', // ← Paste Zone 1 ID
bannerZoneId: 'YOUR_ZONE_ID_HERE',       // ← Paste Zone 2 ID  
nativeBannerZoneId: 'YOUR_ZONE_ID_HERE', // ← Paste Zone 3 ID
```

Save file ✅

---

### 4️⃣ Test & Deploy (30 seconds)

```bash
npm run dev
```

**Test these actions:**
- ✅ Complete a workout → See interstitial ad
- ✅ Go to Store page → See banner ad
- ✅ Check Dashboard → See native banner

**Deploy:**
```bash
git add .
git commit -m "Add Propeller Ads"
git push
```

---

## 💰 Revenue Estimate

**With 3,000 daily users:**
- **Month 1**: ₹3,870 - ₹11,610
- **Month 3**: ₹8,000 - ₹15,000 (optimized)

---

## 🎯 Where Ads Show

| Ad Type | User Action | Frequency |
|---------|-------------|-----------|
| **Interstitial** | After completing workout | Max 1 per 30 min |
| **Banner** | Opens Store page | Always visible |
| **Native Banner** | On Dashboard home | Always visible |

---

## ✅ That's It!

You're now earning money from your app. Check your Propeller Dashboard in 24 hours to see revenue.

**Need help?** Read the full guide: `PROPELLER_ADS_SETUP.md`
