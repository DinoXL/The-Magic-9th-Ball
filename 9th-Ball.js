// Get DOM elements
const askButton = document.getElementById("askButton");
const resetButton = document.getElementById("resetButton");
const answerDiv = document.getElementById("answer");
const questionInput = document.getElementById("question");
const expDisplay = document.getElementById("expDisplay");
const applyThemeButton = document.getElementById("applyTheme");
const magicSound = document.getElementById("magicSound");
const notificationDiv = document.getElementById("notification");
const magic8ball = document.getElementById("magic8ball"); // Magic 8-Ball element

// Responses for the Magic 8-Ball
const responses = [
  // Affirmative Responses
  "Yes",
  "Definitely",
  "Without a doubt",
  "Certainly",
  "For sure!",
  "You bet!",
  "Absolutely, without question!",
  "Count me in!",
  "100%, go for it!",
  "Yep, no question about it!",
  "Positive!",
  "Fuck Yeah!",
  "For the bitches, yeah",
  "For the boys, yeah",

  // Negative Responses
  "No",
  "I don't think so",
  "Unlikely",
  "Nope",
  "Hell to the no",
  "Absolutely not",
  "Not in a million years",
  "Not happening, idiot",
  "Impossible",
  "The universe says no",
  "Better luck next time",
  "Don't hold your breath",
  "Fuck off, go run along",
  "Shut up and stop bothering me",
  "Go fuck yourself",
  "I'm not gonna play fetch you asshole",
  "Why don't you fuck off and try again",
  "Hell no, you clueless moron",
  "Fuck you and your question",
  "Are you fucking serious",

  // Maybe Responses
  "Maybe",
  "Perchance",
  "Ask again later",
  "Possibly",
  "Maybe in an alternate universe",
  "There's a chance!",
  "Could go either way!",
  "Hard to say, but maybe!",
  "Could happen!",
  "Not sure, but maybe!",
  "Ask again tomorrow!",
  "Who knows?",
  "It's possible!",
  "I don't fucking know",
  "I'm not your bitch, ask someone else",
  "Did you not recognize that I don't give a shit about you.",
  "Didn't you ask that already",
  "Stop being such a persistent prick",
  "Focus and try again",
  "I'm not sure about that",
  "That's beyond my knowledge",
  "It's a secret",
  "Who cares?",
  "I wouldn't bet on it",

  // Dismissive/Playful Responses
  "No answer my question, Are you still a virgin",
  "Someone left their brain",
  "Yass",
  "Aww, I ran out of fucks to give",
  "That's a hard pass from me",
  "You wish",
  "That's a big no-no",
  "Ask your mom",
  "Get lost",
  "Not in your wildest dreams",
  "Try again tomorrow",
  "What a dumbass idea",
  "Just fuck off already",

  // Sarcastic/Offensive Responses
  "Not in your wildest dreams",
  "What a dumbass idea",
  "You're full of shit",
  "You really think that's gonna work?",
  "Did you really think that was a good question?",
  "You really need to stop asking me questions.",
  "You're not even worth my time.",
];

// EXP system variables
let exp = parseInt(localStorage.getItem("exp")) || 0; // Retrieve EXP or default to 0
let unlockedThemes = parseInt(localStorage.getItem("unlockedThemes")) || 0; // Retrieve unlocked themes or default to 0

// EXP milestones to unlock new themes
const expMilestones = [10, 25, 50, 100, 200, 300, 400, 500];

// Background themes
const backgrounds = [
  "linear-gradient(to right, #ff7e5f, #feb47b)", // Theme 1
  "linear-gradient(to right, #4facfe, #00f2fe)", // Theme 2
  "linear-gradient(to right, #43e97b, #38f9d7)", // Theme 3
  "linear-gradient(to right, #ff9a9e, #fad0c4)", // Theme 4
  "linear-gradient(to right, #ffb6b9, #fae3d9)", // Theme 5
  "linear-gradient(to right, #f5c6e5, #d4a5a5)", // Theme 6
  "linear-gradient(to right, #8e9eab, #eef2f3)", // Theme 7
  "linear-gradient(to right, #fbc2eb, #a6c1ee)", // Theme 8
];

// Update the EXP display from localStorage
expDisplay.textContent = `EXP: ${exp}`;
console.log("Initial EXP from localStorage:", exp); // Debugging log

// Apply the saved theme (if any) from localStorage when the page loads
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.style.background = savedTheme; // Apply the saved background theme
  } else {
    document.body.style.background = backgrounds[0]; // Default to the first theme
  }
};

// Ask button event listener
askButton.addEventListener("click", () => {
  const question = questionInput.value.trim();
  if (question) {
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    answerDiv.textContent = randomResponse;
    magicSound.play(); // Play sound
    questionInput.value = ""; // Clear input after asking

    // Add EXP on each question asked
    exp += 5; // Adjust EXP value if needed
    checkForUnlock();
    expDisplay.textContent = `EXP: ${exp}`;

    // Save updated EXP and unlockedThemes to localStorage
    console.log("Updated EXP:", exp); // Debugging log
    localStorage.setItem("exp", exp);
    localStorage.setItem("unlockedThemes", unlockedThemes);

    // Trigger the shake effect on the magic ball
    magic8ball.classList.add("shake");
    setTimeout(() => {
      magic8ball.classList.remove("shake");
    }, 500); // Remove the shake after animation duration
  } else {
    answerDiv.textContent = "Please ask a question!";
  }
});

// Reset button event listener
resetButton.addEventListener("click", () => {
  // Reset all themes and EXP progress
  exp = 0;
  unlockedThemes = 0;
  expDisplay.textContent = `EXP: ${exp}`;
  applyThemeButton.style.display = "none";
  document.body.style.background = backgrounds[0];

  // Save reset values to localStorage
  console.log("Resetting EXP to:", exp); // Debugging log
  localStorage.setItem("exp", exp);
  localStorage.setItem("unlockedThemes", unlockedThemes);
  localStorage.setItem("theme", backgrounds[0]); // Reset theme to default
});

// Check if a new theme is unlocked
function checkForUnlock() {
  for (let i = 0; i < expMilestones.length; i++) {
    if (exp >= expMilestones[i] && unlockedThemes <= i) {
      unlockedThemes = i + 1;
      showNewThemeNotification(i + 1);
    }
  }
}

// Show a notification when a new theme is unlocked
function showNewThemeNotification(themeNumber) {
  notificationDiv.textContent = `New theme unlocked! Theme ${themeNumber}`;
  notificationDiv.classList.add("show");
  setTimeout(() => {
    notificationDiv.classList.remove("show");
  }, 3000);

  // Apply the new theme after unlocking
  if (unlockedThemes <= backgrounds.length) {
    document.body.style.background = backgrounds[unlockedThemes - 1];
    localStorage.setItem("theme", backgrounds[unlockedThemes - 1]);
  }
}
