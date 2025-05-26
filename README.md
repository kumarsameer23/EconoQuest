# 🎯 EconoQuest - Financial Literacy Quiz App

**EconoQuest** is a responsive, interactive web quiz application that educates users on economics and personal finance. It features Google authentication, a live timer-based quiz system, a dynamic leaderboard using Firebase, and a downloadable certificate of completion.

---

## 🧑‍💻 Tech Stack Used

- **Frontend**:  
  - HTML5  
  - CSS (TailwindCSS)  
  - JavaScript (Vanilla)

- **Authentication**:  
  - Firebase Authentication (Google Sign-In)

- **Database**:  
  - Firebase Realtime Database (Leaderboard storage)

- **Hosting**:  
  - Netlify (Frontend deployment)  
  - GitHub (Version control)

---

## 🚀 Live Demo

> 🌐 [EconoQuest on Netlify](https://econoquest.netlify.app/)  

---

## 📂 Project Structure

EconoQuest/
├── index.html # Landing page with Google login
├── quiz.html # Quiz interface
├── result.html # Results + leaderboard + certificate
├── script.js # Quiz logic + Firebase functions
├── sounds/ # Sound effects
│ ├── click.wav
│ ├── correct.wav
│ ├── wrong.wav
│ └── download.wav
├── README.md # Project documentation

---

## 🛠️ How to Run Locally

1. **Clone the repo:**

git clone https://github.com/YOUR_USERNAME/EconoQuest.git
cd EconoQuest
Open index.html in any browser to start the app locally.

🔐 Note: Firebase Authentication will not work unless you're serving from a domain authorized in your Firebase Console.

⚙️ Firebase Configuration
To make the app work with your own Firebase project:

Create a Firebase project at console.firebase.google.com

Enable Authentication → Google

Create a Realtime Database

Replace the Firebase config in:

index.html

quiz.html

result.html

script.js
with your own Firebase credentials.

🌐 Deployment Instructions

✅ Deploy on GitHub

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/EconoQuest.git
git push -u origin main

✅ Deploy on Netlify
Login at https://netlify.com

Click "New Site from Git"

Connect your GitHub repo

Set Publish Directory to . and leave Build Command empty

Deploy!

✅ Features
🔐 Google Sign-In with Firebase

⏱️ Timer-based multiple-choice questions

🎯 Score tracking and leaderboard (Firebase Realtime DB)

🏆 Dynamic certificate generator (Canvas)

🔁 Fully responsive layout using TailwindCSS

🔊 Sound effects for interaction

🧠 Author
Sameer Kumar
3rd Year B.Tech CSE Student
MERN Stack Developer

📄 License
This project is open-source and free to use under the MIT License.
