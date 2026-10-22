# 🚀 TripMate Deployment Guide

This guide provides step-by-step instructions to deploy TripMate to the public internet for free so anyone can access your live application.

---

## 🏆 Recommended Option: 1-Click Deployment on Render.com (100% Free)

[Render.com](https://render.com) provides a free cloud hosting tier that builds and serves both your **React Frontend** and **Backend REST API** together on a single secure public HTTPS URL (e.g. `https://tripmate.onrender.com`).

### Step 1: Push Your Code to GitHub

Open PowerShell or Command Prompt in your project directory:

```powershell
cd "c:\java mini proj"

# Initialize git repository
git init

# Add all project files
git add .

# Create your first commit
git commit -m "Initial commit: TripMate AI Travel Planner"
```

Next, create a new repository on [GitHub](https://github.com/new) named `tripmate`:
```powershell
# Link to your new GitHub repository (replace with your GitHub username)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tripmate.git
git push -u origin main
```

---

### Step 2: Deploy on Render.com

1. Go to **[https://render.com](https://render.com)** and create a free account (Sign up with GitHub).
2. Click the **"New +"** button in the dashboard and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and select your `tripmate` repository.
4. Fill in the service configuration:
   - **Name:** `tripmate`
   - **Region:** Singapore / Frankfurt / Oregon (choose closest to India, e.g., Singapore)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. Click **"Deploy Web Service"**.

Render will automatically:
- Install backend and frontend dependencies.
- Compile the React frontend with Vite.
- Start the unified Express server.
- Generate your free live link:  
  🌐 **`https://tripmate-xxxx.onrender.com`**

---

## ⚡ Option 2: Deploy Frontend on Vercel

If you want your frontend hosted on [Vercel](https://vercel.com):

1. Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
2. Click **"Add New Project"** and import your `tripmate` repository.
3. Configure the settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Vercel gives you an instant global CDN link (e.g., `https://tripmate.vercel.app`).

---

## 🐳 Option 3: Universal Docker Deployment

TripMate includes a production-ready `Dockerfile` that builds and packages the application into an isolated container:

```bash
# Build the Docker image
docker build -t tripmate .

# Run the container locally on port 5000
docker run -p 5000:5000 tripmate
```

This Docker container can be deployed to:
- **Railway.app** (Deploy from Dockerfile)
- **Google Cloud Run**
- **AWS App Runner / ECS**
- **DigitalOcean App Platform**

---

## 💻 Option 4: Run Unified Production Build Locally

If you want to test the production bundle locally on a single port (serving the compiled React app directly through the Express server):

```powershell
cd "c:\java mini proj"

# 1. Build the production bundle
npm run build

# 2. Start the unified production server
npm start
```

Now open:  
👉 **`http://localhost:5000`**  
*(Notice that both the frontend web app AND the backend API run on port 5000 together without needing Vite dev server!)*

---

## ☕ Option 5: Deploying the Java Backend

If your college evaluator requires the live cloud deployment to run the **Java 17 backend**:

1. Use **Railway.app** or **Render.com** with **Docker** environment.
2. In the `Dockerfile`, install OpenJDK 17 and run:
   ```dockerfile
   FROM eclipse-temurin:17-jdk-alpine
   WORKDIR /app
   COPY backend-java/ ./backend-java/
   RUN javac -d backend-java/bin backend-java/src/com/tripmate/models/*.java backend-java/src/com/tripmate/services/*.java backend-java/src/com/tripmate/data/*.java backend-java/src/com/tripmate/TripMateServer.java
   EXPOSE 5000
   CMD ["java", "-cp", "backend-java/bin", "com.tripmate.TripMateServer"]
   ```
3. Connect the frontend to your live Java backend URL.
