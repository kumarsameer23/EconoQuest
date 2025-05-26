// ✅ script.js — Handles Quiz Logic, Questions, Leaderboard, and Certificate

// Preload sounds
const soundClick = new Audio("sounds/click.wav");
const soundCorrect = new Audio("sounds/correct.wav");
const soundWrong = new Audio("sounds/wrong.wav");
const soundDownload = new Audio("sounds/download.wav");

// Firebase Save Function
function saveScoreToFirebase(username, userId, score) {
  return new Promise((resolve) => {
    console.log("Saving to Firebase:", username, userId, score);
    const ref = firebase.database().ref("leaderboard");
    ref.push(
      {
        username,
        userId,
        score: parseInt(score),
        timestamp: Date.now(),
      },
      (error) => {
        if (error) {
          console.error("Firebase save failed:", error);
        } else {
          console.log("Score saved successfully!");
        }
        resolve(); // Proceeds even if Firebase fails
      }
    );
  });
}

// Questions
const questions = [
  {
    question: "What is the main purpose of a budget?",
    options: [
      "To track only income",
      "To avoid paying taxes",
      "To plan income and expenses",
      "To invest in stocks",
    ],
    answer: 2,
    hint: "Budgeting is about planning where your money goes.",
  },
  {
    question: "What does 'interest' mean when talking about savings?",
    options: [
      "Money charged by banks for maintenance",
      "A penalty on account balance",
      "Extra money earned on savings",
      "Service fee by bank",
    ],
    answer: 2,
    hint: "It’s the reward for keeping money in the bank.",
  },
  {
    question: "Which of the following is a fixed monthly expense?",
    options: ["Dining out", "Groceries", "Electric bill", "Home rent"],
    answer: 3,
    hint: "This payment stays the same every month.",
  },
  {
    question: "What does 'inflation' do to the value of money?",
    options: [
      "Increases it",
      "Keeps it stable",
      "Decreases it",
      "Eliminates it",
    ],
    answer: 2,
    hint: "Things get more expensive over time.",
  },
  {
    question: "What is a credit score?",
    options: [
      "A score in a board game",
      "A rating of your creditworthiness",
      "A type of tax document",
      "A bank account type",
    ],
    answer: 1,
    hint: "Lenders use it to decide if they can trust you.",
  },
  {
    question: "Which of these is an example of an asset?",
    options: ["A loan", "A mortgage", "A car you own", "A credit card bill"],
    answer: 2,
    hint: "Assets are things you own that have value.",
  },
  {
    question: "What is 'diversification' in investing?",
    options: [
      "Investing in one company",
      "Spreading investments across different areas",
      "Avoiding any investments",
      "Buying luxury goods",
    ],
    answer: 1,
    hint: "Don’t put all your eggs in one basket.",
  },
  {
    question: "What is the purpose of emergency savings?",
    options: [
      "For vacations",
      "For unplanned expenses",
      "For paying taxes",
      "For buying clothes",
    ],
    answer: 1,
    hint: "Useful when something unexpected happens.",
  },
  {
    question: "What does GDP stand for?",
    options: [
      "Gross Domestic Product",
      "Government Debt Percentage",
      "General Duty Pay",
      "Global Debt Policy",
    ],
    answer: 0,
    hint: "It measures the country's total economic output.",
  },
  {
    question: "What is liquidity in financial terms?",
    options: [
      "The number of loans available",
      "Ease of converting assets to cash",
      "Company profits",
      "A type of tax benefit",
    ],
    answer: 1,
    hint: "How quickly you can get cash from what you own.",
  },
  {
    question: "Why is it important to have a good credit score?",
    options: [
      "To get discounts in stores",
      "To qualify for better loans",
      "To avoid taxes",
      "To earn more interest",
    ],
    answer: 1,
    hint: "A higher score means better trust from banks.",
  },
  {
    question: "Which of these is a variable expense?",
    options: [
      "Netflix subscription",
      "Monthly rent",
      "Car insurance premium",
      "Grocery bill",
    ],
    answer: 3,
    hint: "This expense can change from month to month.",
  },
  {
    question: "What is compound interest?",
    options: [
      "Interest paid only on the initial deposit",
      "Interest paid annually",
      "Interest earned on both the principal and interest",
      "Interest paid by government",
    ],
    answer: 2,
    hint: "It’s interest on your interest.",
  },
  {
    question: "Which of the following is NOT a type of investment?",
    options: ["Stocks", "Mutual Funds", "Savings Account", "Credit Card"],
    answer: 3,
    hint: "One of these is a borrowing tool, not an investment.",
  },
  {
    question: "What does 'Net Worth' mean?",
    options: [
      "Total savings in cash",
      "All monthly earnings",
      "Assets minus liabilities",
      "Annual income",
    ],
    answer: 2,
    hint: "It’s what you truly own after subtracting debts.",
  },
  {
    question: "Which of these helps you build a credit history?",
    options: [
      "Using a debit card",
      "Paying with cash",
      "Paying a credit card on time",
      "Opening a savings account",
    ],
    answer: 2,
    hint: "Responsible borrowing builds your trust score.",
  },
  {
    question: "Which tax is automatically deducted from your salary?",
    options: ["Property tax", "Income tax", "Sales tax", "Excise tax"],
    answer: 1,
    hint: "It’s based on how much you earn.",
  },
  {
    question: "What is the safest type of investment?",
    options: [
      "Cryptocurrency",
      "Real estate",
      "Government bonds",
      "Stock market",
    ],
    answer: 2,
    hint: "Issued by the government, usually low risk.",
  },
  {
    question: "What is an example of a liability?",
    options: [
      "Cash in hand",
      "A loan to be paid",
      "Gold jewelry",
      "Investments",
    ],
    answer: 1,
    hint: "Something you owe, not something you own.",
  },
  {
    question: "What is financial planning?",
    options: [
      "Tracking phone usage",
      "Preparing a travel itinerary",
      "Managing money to meet goals",
      "Creating recipes for dinner",
    ],
    answer: 2,
    hint: "It helps you prepare for short and long-term goals.",
  },
  {
    question: "What is the purpose of insurance?",
    options: [
      "To earn profit",
      "To avoid paying taxes",
      "To protect against financial loss",
      "To get discounts at hospitals",
    ],
    answer: 2,
    hint: "It provides compensation in case of loss or accident.",
  },
  {
    question: "What does it mean to default on a loan?",
    options: [
      "Paying more than required",
      "Missing loan payments",
      "Closing the loan early",
      "Getting a higher interest rate",
    ],
    answer: 1,
    hint: "It negatively affects your credit score.",
  },
  {
    question: "Which is a long-term financial goal?",
    options: [
      "Buying groceries",
      "Paying phone bills",
      "Saving for retirement",
      "Monthly subscription payments",
    ],
    answer: 2,
    hint: "It takes years of consistent planning.",
  },
  {
    question: "Which one helps reduce financial risk?",
    options: [
      "Avoiding budgeting",
      "Overusing credit cards",
      "Diversification",
      "Investing all in one stock",
    ],
    answer: 2,
    hint: "Spreading money across different assets helps.",
  },
  {
    question: "What is a mutual fund?",
    options: [
      "A government fund for students",
      "A group of stocks managed by professionals",
      "An emergency fund",
      "A fixed deposit account",
    ],
    answer: 1,
    hint: "It pools money from many investors.",
  },
  {
    question: "What is a financial scam red flag?",
    options: [
      "Too-good-to-be-true returns",
      "Registered investment firm",
      "Bank notification",
      "Diversified portfolio",
    ],
    answer: 0,
    hint: "Promises of huge profits are often traps.",
  },
];
//quiz State
let current = 0;
let score = 0;
let selected = null;
let timeLeft = 20;
let timerInterval;

function showQuestion() {
  clearInterval(timerInterval);
  timeLeft = 20;
  document.getElementById("timer").textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      selected = null;
      nextQuestion();
    }
  }, 1000);
  console.log(`Showing question ${current + 1} of ${questions.length}`);

  const q = questions[current];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("hint").textContent = `Hint: ${q.hint}`;
  document.getElementById("progress-bar").style.width = `${
    ((current + 1) / questions.length) * 100
  }%`;

  const optionsList = document.getElementById("options-list");
  optionsList.innerHTML = "";
  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.className =
      "bg-white/20 rounded-md px-4 py-2 hover:bg-green-500 transition cursor-pointer";
    li.onclick = () => selectOption(li, i);
    optionsList.appendChild(li);
  });

  document.getElementById("next-btn").disabled = true;
}

function selectOption(el, index) {
  soundClick.play();
  const listItems = document.querySelectorAll("#options-list li");
  listItems.forEach((li) => li.classList.remove("bg-green-600", "selected"));
  el.classList.add("bg-green-600");
  selected = index;
  document.getElementById("next-btn").disabled = false;
}

async function nextQuestion() {
  if (selected !== null) {
    const correct = questions[current].answer === selected;
    if (correct) {
      score++;
      soundCorrect.play();
    } else {
      soundWrong.play();
    }
  }
  if (current < questions.length - 1) {
    current++;
    showQuestion(); // Load next question
  } else {
    // Only show "Saving..." on FINAL question (question 12)
    const nextBtn = document.getElementById("next-btn");
    nextBtn.disabled = true;
    nextBtn.textContent = "Saving...";

    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    localStorage.setItem("score", score);

    await saveScoreToFirebase(username, userId, score);
    location.href = "result.html";
  }
}
// Result Page Logic
if (document.getElementById("final-score")) {
  const username = localStorage.getItem("username") || "User";
  const userId = localStorage.getItem("userId") || "N/A";
  const score = localStorage.getItem("score") || 0;
  document.getElementById(
    "final-score"
  ).textContent = `🎯 ${username}, your score is ${score}/${questions.length}`;

  const list = document.getElementById("leaderboard-list");
  firebase
    .database()
    .ref("leaderboard")
    .orderByChild("score")
    .limitToLast(5)
    .once("value", (snapshot) => {
      const entries = [];
      snapshot.forEach((child) => entries.push(child.val()));
      entries.sort((a, b) => b.score - a.score);
      entries.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.username} (${entry.userId}) - ${entry.score}`;
        list.appendChild(li);
      });
    });
}

function generateCertificate() {
  const canvas = document.getElementById("certificate");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 700;
  canvas.classList.remove("hidden");

  const name = localStorage.getItem("username");
  const id = localStorage.getItem("userId");
  const score = localStorage.getItem("score");

  ctx.fillStyle = "#fff8e1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#6d4c41";
  ctx.lineWidth = 15;
  ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

  ctx.font = "bold 48px Georgia";
  ctx.fillStyle = "#3e2723";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Achievement", canvas.width / 2, 100);

  ctx.font = "20px Arial";
  ctx.fillText("This is proudly presented to", canvas.width / 2, 170);

  ctx.font = "36px 'Courier New'";
  ctx.fillStyle = "#2e7d32";
  ctx.fillText(name, canvas.width / 2, 230);

  ctx.font = "18px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText(`User ID: ${id}`, canvas.width / 2, 270);
  ctx.fillText(`Score: ${score}/12`, canvas.width / 2, 310);

  ctx.font = "20px Arial";
  ctx.fillText(
    "for successfully completing the EconoQuest Quiz",
    canvas.width / 2,
    360
  );

  ctx.font = "italic 18px Times New Roman";
  ctx.fillText("Presented by Hackonomics 2025", canvas.width / 2, 460);
  ctx.fillText(
    "Date: " + new Date().toLocaleDateString(),
    canvas.width / 2,
    500
  );

  ctx.beginPath();
  ctx.moveTo(700, 580);
  ctx.lineTo(900, 580);
  ctx.strokeStyle = "#3e2723";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("EconoQuest Coordinator", 800, 600);

  soundDownload.play();
  const link = document.createElement("a");
  link.download = `${name}_EconoQuest_Certificate.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// Quiz Start Hook
// Quiz Start Hook (keep this part as-is)
if (document.getElementById("question-text")) {
  document.getElementById("user-name").textContent = `👤 ${localStorage.getItem(
    "username"
  )}`;
  showQuestion();
}
