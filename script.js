/* =========================
   DOM Element References
========================= */

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const restartBtn = document.getElementById("restart-btn");

const instructions = document.getElementById("instructions");
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");

const scoreText = document.getElementById("score");

/* =========================
   Global Variables
========================= */

let currentQuestion = 0;
let userAnswers = [];
let score = 0;

/* =========================
   Quiz Questions
========================= */

const questions = [
    {
        question: "What nutrient is the body's main source of energy?",
        options: ["Protein", "Carbohydrates", "Vitamins", "Minerals"],
        answer: 1
    },
    {
        question: "Which nutrient is important for building and repairing muscles?",
        options: ["Carbohydrates", "Protein", "Vitamins", "Water"],
        answer: 1
    },
    {
        question: "Which vitamin is produced when the skin is exposed to sunlight?",
        options: ["Vitamin K", "Vitamin B12", "Vitamin E", "Vitamin D"],
        answer: 3
    },
    {
        question: "What mineral is essential for strong bones and teeth?",
        options: ["Iron", "Calcium", "Potassium", "Zinc"],
        answer: 1
    },
    {
        question: "Which nutrient helps the body fight infections?",
        options: ["Vitamin C", "Fat", "Sugar", "Salt"],
        answer: 0
    },
    {
        question: "Which food is highest in protein?",
        options: ["Chicken", "Apple", "Rice", "Broccoli"],
        answer: 0
    },
    {
        question: "How many glasses of water are commonly recommended per day?",
        options: ["2", "4", "8", "12"],
        answer: 2
    },
    {
        question: "Which food group provides healthy fats?",
        options: ["Avocados", "Candy", "Soft Drinks", "White Bread"],
        answer: 0
    },
    {
        question: "Which mineral helps carry oxygen in the blood?",
        options: ["Calcium", "Iron", "Magnesium", "Potassium"],
        answer: 1
    },
    {
        question: "Which nutrient helps maintain healthy digestion?",
        options: ["Sugar", "Fiber", "Salt", "Cholesterol"],
        answer: 1
    },
    {
        question: "Which fruit is especially rich in Vitamin C?",
        options: ["Orange", "Banana", "Pear", "Grapes"],
        answer: 0
    },
    {
        question: "Which food is considered a whole grain?",
        options: ["White Rice", "Brown Rice", "Candy", "Butter"],
        answer: 1
    },
 {
question: "Which nutrient provides the most energy per gram?",
options: ["Protein", "Carbohydrates", "Fat", "Water"],
answer: 2
},
    {
        question: "Which vitamin is important for healthy vision?",
        options: ["Vitamin A", "Vitamin D", "Vitamin B12", "Vitamin K"],
        answer: 0
    },
    {
        question: "Which beverage is the healthiest choice?",
        options: ["Soft Drink", "Energy Drink", "Water", "Sports Drink"],
        answer: 2
    },
    {
        question: "Which mineral is important for healthy muscles and nerves?",
        options: ["Potassium", "Sugar", "Fat", "Cholesterol"],
        answer: 0
    },
    {
        question: "What is the main function of carbohydrates?",
        options: [
            "Build muscles",
            "Provide energy",
            "Build bones",
            "Fight infections"
        ],
        answer: 1
    },
    {
        question: "Which food contains the most calcium?",
        options: ["Milk", "Apple", "Rice", "Chicken"],
        answer: 0
    },
    {
        question: "Why is breakfast important?",
        options: [
            "Provides energy for the day",
            "Makes you taller",
            "Prevents sleep",
            "Replaces water"
        ],
        answer: 0
    },
    {
        question: "Which is the healthiest snack option?",
        options: [
            "Potato Chips",
            "Chocolate Bar",
            "Fresh Fruit",
            "Candy"
        ],
        answer: 2
    }
];

/* =========================
2
Shuffle Questions
3
========================= */
4
 
5
function shuffleQuestions() {
6
questions.sort(() => Math.random() - 0.5);
7
}

/* =========================
   Start Quiz Button
========================= */

if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
}
/* =========================
   Start Quiz
========================= */

function startQuiz() {

    shuffleQuestions();

    instructions.style.display = "none";
    quizContainer.style.display = "block";

    currentQuestion = 0;
    userAnswers = [];
    score = 0;

    showQuestion(currentQuestion);
}

/* =========================
   Display Current Question
========================= */

function showQuestion(index) {

    const current = questions[index];

    questionText.textContent = current.question;

    displayOptions(index);

    previousBtn.disabled = currentQuestion === 0;
}

/* =========================
   Display Answer Options
========================= */

function displayOptions(index) {

    const current = questions[index];

    optionsContainer.innerHTML = "";

    current.options.forEach((option, optionIndex) => {

        const label = document.createElement("label");

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "answer";
        radio.value = optionIndex;

        if (userAnswers[index] === optionIndex) {
            radio.checked = true;
        }

        label.appendChild(radio);
        label.append(` ${option}`);

        optionsContainer.appendChild(label);
        optionsContainer.appendChild(
            document.createElement("br")
        );
    });
}

/* =========================
   Save User Answer
========================= */

function saveAnswer() {

    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (selectedAnswer) {

        userAnswers[currentQuestion] =
            Number(selectedAnswer.value);
    }
}

/* =========================
   Next Question
========================= */

nextBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion(currentQuestion);

    } else {

        showResults();

    }
});

/* =========================
   Previous Question
========================= */

previousBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion(currentQuestion);

    }
});

/* =========================
   Calculate Score
========================= */

function calculateScore() {

    score = 0;

    questions.forEach((question, index) => {

        if (userAnswers[index] === question.answer) {

            score++;

        }
    });
}

/* =========================
   Display Results
========================= */

function showResults() {

    calculateScore();

    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";

    scoreText.textContent =
        `You scored ${score} out of ${questions.length}`;
}

/* =========================
   Restart Quiz
========================= */

if (restartBtn) {

    restartBtn.addEventListener("click", restartQuiz);

}

function restartQuiz() {

    currentQuestion = 0;
    userAnswers = [];
    score = 0;

    resultsContainer.style.display = "none";
    quizContainer.style.display = "block";

    showQuestion(currentQuestion);
}