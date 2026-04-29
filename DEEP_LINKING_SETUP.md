# Deep Linking Setup for LaunchVerse

## ✅ Files Already Configured

The following files have been set up for deep linking:

```
public/.well-known/
├── assetlinks.json                    # Android App Links verification
└── apple-app-site-association         # iOS Universal Links verification

vercel.json                            # Headers configuration
```

---

## 🚀 Quick Deploy to Vercel

### 1. Install Vercel CLI (if needed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

---

## ⚙️ Before First Deploy - Update Verification Files

### Android: Update SHA-256 Fingerprints

**Get fingerprint:**
```bash
keytool -list -v -keystore /Users/kapish/Desktop/LaunchVerse/android/app/debug.keystore \
  -alias androiddebugkey -storepass android -keypass android | grep SHA256
```

**Output example:**
```
SHA256: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99
```

**Format (remove colons):**
```
AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899
```

**Edit:** `public/.well-known/assetlinks.json`
- Replace `REPLACE_WITH_YOUR_DEV_SHA256_FINGERPRINT` with actual fingerprint
- Repeat for UAT and PROD if you have different keystores

### iOS: Update Team ID

**Get Team ID:**
1. Visit: https://developer.apple.com/account
2. Go to Membership
3. Copy Team ID (e.g., `ABC123DEFG`)

**Edit:** `public/.well-known/apple-app-site-association`
- Replace all instances of `TEAM_ID` with your actual Apple Team ID

---

## 🧪 Test After Deployment

### 1. Verify Files Are Accessible

```bash
# Replace with your actual Vercel URL
VERCEL_URL="your-app.vercel.app"

# Test Android file
curl https://$VERCEL_URL/.well-known/assetlinks.json

# Test iOS file
curl https://$VERCEL_URL/.well-known/apple-app-site-association

# Verify headers (should show Content-Type: application/json)
curl -I https://$VERCEL_URL/.well-known/apple-app-site-association
```

### 2. Update Mobile App

**Edit:** `/Users/kapish/Desktop/LaunchVerse/.env.dev`
```bash
DEEP_LINK_DOMAIN=your-app.vercel.app
```

**Rebuild mobile app:**
```bash
cd /Users/kapish/Desktop/LaunchVerse
npm run android:dev
```

### 3. Test Deep Link

```bash
# Replace with your actual Vercel URL
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://your-app.vercel.app/reset-password?token=test123" \
  com.launchverse.app.dev
```

**Expected:** App opens and navigates to Reset Password screen

---

## 📱 Test on iOS

```bash
xcrun simctl openurl booted \
  "https://your-app.vercel.app/reset-password?token=test123"
```

---

## 🔍 Troubleshooting

### Files not accessible after deploy

**Check:**
1. Files are in `public/.well-known/` (not `static/` or other directory)
2. `vercel.json` is in project root
3. Redeploy: `vercel --prod`

### App opens browser instead of app

**Android:**
```bash
# Re-verify domain
adb shell pm verify-app-links --re-verify com.launchverse.app.dev

# Check verification status
adb shell pm get-app-links com.launchverse.app.dev
```

**iOS:**
- Verify Team ID is correct
- Check Content-Type header is `application/json`
- Wait 24 hours for Apple CDN to refresh (or use different domain)

### Wrong Content-Type

If curl shows wrong Content-Type:
1. Check `vercel.json` is in project root
2. Headers are correctly formatted
3. Redeploy

---

## 📋 Deployment Checklist

- [ ] Updated `assetlinks.json` with SHA-256 fingerprint
- [ ] Updated `apple-app-site-association` with Team ID
- [ ] Deployed to Vercel (`vercel --prod`)
- [ ] Verified files accessible via curl
- [ ] Headers correct (Content-Type: application/json)
- [ ] Updated mobile app `.env.dev` with Vercel URL
- [ ] Rebuilt mobile app
- [ ] Tested deep link on Android
- [ ] Tested deep link on iOS

---

## 🎯 Next Steps After Testing

1. **For production:**
   - Add custom domain `app.launchverse.org` in Vercel dashboard
   - Update `.env.prod` in mobile app
   - Get production keystore SHA-256
   - Update `assetlinks.json` with prod fingerprint

2. **Email integration:**
   - Update password reset email template to use Vercel URL
   - Example: `https://your-app.vercel.app/reset-password?token={{token}}`

3. **Monitor:**
   - Check domain verification: `adb shell pm get-app-links`
   - Test periodically with `curl` to ensure files remain accessible

---

## 📚 Full Documentation

For complete documentation, see:
- `/Users/kapish/Desktop/LaunchVerse/docs/DEEP_LINKING.md`
- `/Users/kapish/Desktop/LaunchVerse/docs/DEEP_LINKING_TESTING.md`
- `/Users/kapish/Desktop/LaunchVerse/docs/DEEP_LINKING_DEPLOYMENT.md`
