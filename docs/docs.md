# Project Setup Guide

This document provides step-by-step instructions to set up the project on a new machine, including GitHub Actions, Firebase Database, and Firebase Hosting.

---

## 1️⃣ Clone the Repository
Ensure Git is installed on your machine. Then, clone the repository:
```sh
git clone https://github.com/Rishi979580/FwaySMS
```

---

## 2️⃣ Install Dependencies
Run the following command to install all required dependencies:
```sh
npm install
```

---

## 3️⃣ Run the Development Server
Start the development server with:
```sh
npm run dev
```
Your project will be available at `http://localhost:3000` (or the port specified in your configuration).

---


## 4️⃣ Firebase Setup

### **A. Install Firebase CLI**
Ensure the Firebase CLI is installed:
```sh
npm install -g firebase-tools
```

### **B. Login to Firebase**
Run the following command and log in with your Firebase account:
```sh
firebase login
```

### **C. Select the Firebase Project**
Run:
```sh
firebase use --add
```
- Select the appropriate Firebase project.
- Assign an alias (e.g., `default`).



### **D. Connect Firebase Database**
If the Firebase Database is not already configured, run:
```sh
firebase init database
```
- Select **Realtime Database**.
- Choose the default database rules or modify them as needed.

### **E. Deploy Database Rules (If Modified)**
If database rules are updated, deploy them:
```sh
firebase deploy --only database
```

---

## 5️⃣ Firebase Hosting Setup

### **A. Initialize Firebase Hosting (If Not Configured)**
If Firebase Hosting is not already initialized:
```sh
firebase init hosting
```
- Select **existing Firebase project**.
- Set the public directory (e.g., `dist` for Vite or `build` for React).
- Choose whether it’s a single-page app (SPA).

### Build Your React.js Vite Project: Run the following command to build your project:
  ```sh
  npm run build

```

### **B. Deploy to Firebase Hosting**
```sh
firebase deploy --only hosting
```

---
# Ignore if you already setup==============

## 6️⃣ GitHub Actions Setup for CI/CD

### **A. Ensure GitHub Secrets Are Set**
 
 ---

## **Step 1: Get Firebase Service Account Key**  
1. **Go to Firebase Console** → [Firebase Console](https://console.firebase.google.com/)  
2. **Select Your Project** (`FuturewaInfotech`)  
3. **Go to** `Project Settings` (Click ⚙️ in the sidebar)  
4. **Go to "Service accounts" Tab**  
5. Click **"Generate new private key"**  
   - A JSON file (`.json`) will be downloaded. **Keep it safe!**
6. Open the JSON file and copy its contents.

---

## **Step 2: Add Firebase Secret to GitHub**  
1. **Go to your GitHub repo** → [GitHub Repo](https://github.com//Rishi979580/FwaySMS)  
2. Click **Settings** → **Secrets and variables** → **Actions** →  **Secrets** 
3. Click **"New repository secret"**  
4. Name it **`FIREBASE_SERVICE_ACCOUNT`**  
5. Paste the copied JSON content from **Step 1**  
6. Click **"Add secret"**  

---

## **Step 3: Create GitHub Actions Workflow**  
1. In your **GitHub repository**, go to the **"Actions"** tab  
2. Click **"New Workflow"** → Choose **"Set up a workflow yourself"**  
3. Name the file: **`.github/workflows/firebase-deploy.yml`**  
4. Copy and paste this content into the workflow file:


5. Click **Commit changes**.  

---


### **B. GitHub Actions Workflow for Automatic Deployment**
Ensure `.github/workflows/firebase-deploy.yml` exists with the following content:
```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build  # Adjust as per your framework

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          channelId: live
```

Now, every time code is pushed to the **main** branch, GitHub Actions will automatically build and deploy it to Firebase Hosting.



git remote add origin https://github.com/Rishi979580/FwaySMS.git

git add .

git commit -m "Set up GitHub Actions for Firebase Hosting"

git push -u origin main


---

## 7️⃣ Pushing Changes to GitHub
After making updates, push your changes:

1. Now push some changes or manually trigger the GitHub Action:  
   
2. Go to **GitHub → Actions Tab**  
   - You should see a new workflow running  
   - Wait for the deployment to complete  