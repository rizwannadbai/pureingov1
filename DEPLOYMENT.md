# Vercel Deployment Guide for Pureingo

## Prerequisites ✅

Before deploying, ensure you have:
- [ ] GitHub account
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com) - free)
- [ ] Supabase project URL and keys
- [ ] Razorpay keys (test or production)

---

## Step 1: Prepare Your Code

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com/new)
2. Create a new repository named `pureingo`
3. **Don't** initialize with README (your repo already has files)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/pureingo.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up / Login

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (or "Log In")
3. **Use GitHub** to sign up for easiest integration

### 2.2 Import Project

1. Click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Select your `pureingo` repository
4. Click "Import"

### 2.3 Configure Project

Vercel will auto-detect Next.js. Default settings are perfect:

- **Framework Preset:** Next.js
- **Root Directory:** ./
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

Click "Deploy" (but it will fail without environment variables)

---

## Step 3: Add Environment Variables

### 3.1 In Vercel Dashboard

1. Go to your project → "Settings" → "Environment Variables"
2. Add each variable below:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL
```
Value: Your Supabase project URL (from Supabase dashboard)

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Value: Your Supabase anon/public key

```
SUPABASE_SERVICE_ROLE_KEY
```
Value: Your Supabase service role key (from Settings → API)

```
NEXT_PUBLIC_RAZORPAY_KEY_ID
```
Value: Your Razorpay key ID

```
RAZORPAY_KEY_SECRET
```
Value: Your Razorpay key secret

```
NEXT_PUBLIC_APP_URL
```
Value: `https://your-project-name.vercel.app` (copy from Vercel after deployment)

### 3.2 Save and Redeploy

1. Click "Save" for each variable
2. Go to "Deployments" tab
3. Click "..." menu on latest deployment
4. Click "Redeploy"

---

## Step 4: Verify Deployment

### 4.1 Check Build Logs

- Build should complete in ~2-3 minutes
- Check logs for any errors
- Look for "✓ Compiled successfully"

### 4.2 Visit Your Site

1. Click "Visit" button
2. Test key functionality:
   - Home page loads
   - Products page shows items from database
   - Login/signup works
   - Cart functions
   - Admin panel accessible (after login as admin)

---

## Step 5: Update Supabase URLs (Important!)

### 5.1 Add Vercel Domain to Supabase

1. Go to Supabase Dashboard
2. Settings → Authentication → URL Configuration
3. Add your Vercel URL to "Site URL": `https://your-project-name.vercel.app`
4. Add to "Redirect URLs": `https://your-project-name.vercel.app/**`

This ensures authentication callbacks work!

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Your Domain

1. Go to Vercel project → Settings → Domains
2. Add your custom domain (e.g., `pureingo.com`)
3. Follow DNS configuration instructions

### 6.2 Update Environment Variables

Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## Troubleshooting 🔧

### Build Fails

**Error: Environment variables missing**
- Solution: Add all required env vars in Vercel dashboard

**Error: Module not found**
- Solution: Check `package.json` includes all dependencies
- Run locally: `npm install` then `npm run build`

### Runtime Errors

**Database connection fails**
- Check Supabase URL and keys are correct
- Verify keys are set as environment variables (not hardcoded)

**Authentication doesn't work**
- Add Vercel URL to Supabase redirect URLs
- Check `NEXT_PUBLIC_APP_URL` matches deployment URL

### Images Don't Load

- Place images in `public/` folder
- Use paths like `/products/image.png` (not absolute paths)
- Vercel automatically optimizes images

---

## Post-Deployment Checklist ✅

- [ ] Site loads successfully
- [ ] Products display from database
- [ ] User can sign up / login
- [ ] Cart and checkout work
- [ ] Admin panel accessible
- [ ] Payment integration functional
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SSL certificate active (automatic with Vercel)

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

1. Make code changes locally
2. Commit: `git commit -m "your changes"`
3. Push: `git push`
4. Vercel automatically builds and deploys! 🚀

---

## Production Tips

### Switch Razorpay to Live Mode

1. Get production keys from Razorpay dashboard
2. Update env vars in Vercel:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (live key)
   - `RAZORPAY_KEY_SECRET` (live secret)
3. Redeploy

### Monitor Performance

- Vercel Analytics: Settings → Analytics
- Check Core Web Vitals
- Monitor API response times

### Set Up Email (Production)

Configure Supabase SMTP:
1. Supabase → Project Settings → Auth → Email Provider
2. Add your SMTP credentials (e.g., SendGrid, AWS SES)
3. Customize email templates

---

## Cost

**Vercel Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth
- Automatic SSL
- CI/CD from Git
- Edge network (CDN)

**Your app fits comfortably in free tier!**

---

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## Quick Reference

**Build Command:** `next build`
**Install Command:** `npm install`  
**Output Directory:** `.next`
**Node Version:** 18.x (auto-detected)

**Deploy from CLI (optional):**
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Your Deployment URL

After deployment, your site will be live at:
```
https://pureingo-[random-chars].vercel.app
```

You can customize this or add a custom domain anytime!

🎉 **Happy Deploying!**
