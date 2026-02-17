# Propeller Ads Integration Guide

## ✅ Files Created

The following files have been added to your project:

### 1. Configuration
- `lib/propeller-config.ts` - Ad configuration and zone IDs

### 2. Ad Components
- `components/ads/PropellerInterstitial.tsx` - Full-screen video ads
- `components/ads/PropellerBanner.tsx` - Banner ads
- `components/ads/PropellerNativeBanner.tsx` - Native banner ads

### 3. Integration Points
- `components/PushUpChallenge.tsx` - Shows interstitial after workout
- `components/Store.tsx` - Shows banner in Store page
- `components/Dashboard.tsx` - Shows native banner on dashboard

---

## 🚀 Next Steps to Go Live

### Step 1: Complete Propeller Ads Registration

1. Go to: https://www.propellerads.com/
2. Click **"Sign Up"** → Select **"Publisher"**
3. Fill in your details:
   - Email: Your email
   - Website URL: Your fitness app URL
   - Category: Health & Fitness
4. Verify your email
5. Login to dashboard: https://partners.propellerads.com/

### Step 2: Add Your Website

1. In Propeller Dashboard, go to **"Websites"**
2. Click **"+ Add Website"**
3. Enter:
   - URL: `https://your-fitness-app.com`
   - Category: **Health & Fitness**
   - Monthly Visits: **90K-100K**
4. Website will be approved instantly ✅

### Step 3: Create Ad Zones

You need to create 3 ad zones:

#### Ad Zone #1: Interstitial (After Workout) - HIGHEST REVENUE
1. Go to **"Ad Zones"** → **"+ Create Ad Zone"**
2. Select **"Interstitial"** format
3. Name: "Workout Completion Interstitial"
4. Frequency: "Once per 30 minutes"
5. Click **"Create"**
6. **Copy the Zone ID** (looks like: `123456`)

#### Ad Zone #2: Banner (Store Page)
1. Create new Ad Zone
2. Select **"Multi Tag (Banner)"**
3. Name: "Store Page Banner"
4. Size: **320x50** (mobile)
5. **Copy the Zone ID**

#### Ad Zone #3: Native Banner (Dashboard)
1. Create new Ad Zone
2. Select **"Native Banner"**
3. Name: "Dashboard Header Banner"
4. **Copy the Zone ID**

### Step 4: Update Configuration File

Open `lib/propeller-config.ts` and replace the placeholder values:

```typescript
export const PROPELLER_ADS_CONFIG = {
  // Replace with your actual Zone IDs from Propeller Dashboard
  interstitialZoneId: 'YOUR_ZONE_ID_HERE', // From Ad Zone #1
  bannerZoneId: 'YOUR_ZONE_ID_HERE',       // From Ad Zone #2
  nativeBannerZoneId: 'YOUR_ZONE_ID_HERE', // From Ad Zone #3
  
  // Get this from Account Settings → Publisher ID
  publisherId: 'YOUR_PUBLISHER_ID',
  
  // These are good defaults, don't change unless needed
  enableInterstitial: true,
  enableBanner: true,
  enableNativeBanner: true,
  interstitialFrequency: 30 * 60 * 1000, // 30 minutes
  lastInterstitialShown: 0,
}
```

### Step 5: Deploy & Test

1. **Test Locally First:**
   ```bash
   npm run dev
   ```
   - Complete a workout → Interstitial ad should show
   - Go to Store page → Banner ad should show
   - Check Dashboard → Native banner should show

2. **Deploy to Production:**
   ```bash
   git add .
   git commit -m "Add Propeller Ads integration"
   git push
   ```

3. **Verify in Propeller Dashboard:**
   - Check **"Statistics"** tab
   - Should see impressions within 24 hours
   - Revenue updates daily

---

## 📊 Expected Revenue

With **3,000 daily active users**:

| Ad Type | Location | Daily Views | Revenue/Day | Monthly |
|---------|----------|-------------|-------------|---------|
| Interstitial | After workout | 2,400 | ₹48-144 | ₹1,440-4,320 |
| Banner | Store page | 2,100 | ₹21-63 | ₹630-1,890 |
| Native Banner | Dashboard | 6,000 | ₹60-180 | ₹1,800-5,400 |
| **TOTAL** | - | **10,500** | **₹129-387** | **₹3,870-11,610** |

*Note: Revenue depends on CPM rates (₹20-60 for India traffic)*

---

## 🎯 Ad Placements

### 1. Interstitial Ad (After Workout)
- **When**: User completes push-up challenge
- **Frequency**: Max once per 30 minutes
- **Impact**: High revenue, minimal annoyance
- **File**: `components/PushUpChallenge.tsx`

### 2. Banner Ad (Store Page)
- **Where**: Below balance card in Store
- **Always visible**: Yes
- **Impact**: Steady passive income
- **File**: `components/Store.tsx`

### 3. Native Banner (Dashboard)
- **Where**: Below header on main dashboard
- **Always visible**: Yes when on meal/challenge/store tabs
- **Impact**: High impressions, looks native
- **File**: `components/Dashboard.tsx`

---

## 🔧 Customization Options

### Disable Specific Ad Types

Edit `lib/propeller-config.ts`:

```typescript
// To disable interstitial ads:
enableInterstitial: false,

// To disable banner ads:
enableBanner: false,

// To disable native banner:
enableNativeBanner: false,
```

### Change Interstitial Frequency

```typescript
// Show every 15 minutes instead of 30:
interstitialFrequency: 15 * 60 * 1000,

// Show every hour:
interstitialFrequency: 60 * 60 * 1000,
```

---

## 📈 Optimization Tips

1. **Monitor Performance**: Check Propeller Dashboard daily for first week
2. **A/B Test Placements**: Try different ad positions if CTR is low
3. **Don't Overdo It**: Keep frequency caps to avoid annoying users
4. **Track User Feedback**: Monitor if users complain about ads
5. **Combine with Other Monetization**: Add Google AdSense later for comparison

---

## 🆘 Troubleshooting

### Ads Not Showing?
1. Check Zone IDs are correct in `propeller-config.ts`
2. Make sure website is approved in Propeller Dashboard
3. Check browser console for errors
4. Wait 24 hours for ad inventory to fill

### Low Revenue?
1. Check fill rate in Propeller Dashboard (should be 70%+)
2. Consider adding more ad zones
3. Try enabling "Anti-AdBlock" in Propeller settings
4. Verify traffic is real users (not bots)

### Ads Too Intrusive?
1. Reduce interstitial frequency to 60 minutes
2. Disable popunders if enabled
3. Only use native/banner ads

---

## 📞 Support

- **Propeller Ads Support**: support@propellerads.com
- **Dashboard**: https://partners.propellerads.com/
- **Documentation**: https://propellerads.com/blog/

---

## ✅ Checklist

Before going live, make sure:

- [ ] Propeller account created and verified
- [ ] Website added and approved
- [ ] All 3 ad zones created
- [ ] Zone IDs added to `propeller-config.ts`
- [ ] Tested locally (ads show up)
- [ ] Deployed to production
- [ ] Checked Propeller Dashboard after 24 hours
- [ ] Revenue is tracking properly

---

**🎉 That's it! You're now earning passive income from your fitness app!**

Questions? Check the Propeller Ads documentation or reach out to their support team.
