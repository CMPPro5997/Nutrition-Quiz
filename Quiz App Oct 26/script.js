/* =========================
   DOM Element References
========================= */

const feedbackText = document.getElementById("feedback");
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
let feedbackShowing = false;

/* =========================
   Quiz Questions
========================= */

const questions = [
    {
        question: "What nutrient is the body's main source of energy?",
        options: ["Protein", "Carbohydrates", "Vitamins", "Minerals"],
        answer: 1,
        feedback: "Carbohydrates are the body's main source of energy."
    },
    {
        question: "Which nutrient is important for building and repairing muscles?",
        options: ["Carbohydrates", "Protein", "Vitamins", "Water"],
        answer: 1,
        feedback: "Protein helps the body build and repair muscle tissue."
    },
    {
        question: "Which vitamin is produced when the skin is exposed to sunlight?",
        options: ["Vitamin K", "Vitamin B12", "Vitamin E", "Vitamin D"],
        answer: 3,
        feedback: "The body can produce Vitamin D when skin is exposed to sunlight."
    },
    {
        question: "What mineral is essential for strong bones and teeth?",
        options: ["Iron", "Calcium", "Potassium", "Zinc"],
        answer: 1,
        feedback: "Calcium helps maintain strong bones and teeth."
    },
    {
        question: "Which nutrient helps the body fight infections?",
        options: ["Vitamin C", "Fat", "Sugar", "Salt"],
        answer: 0,
        feedback: "Vitamin C supports the normal function of the immune system."
    },
    {
        question: "Which food is highest in protein?",
        options: ["Chicken", "Apple", "Rice", "Broccoli"],
        answer: 0,
        feedback: "Of these options, chicken contains the most protein."
    },
    {
        question: "How many glasses of water are commonly recommended per day?",
        options: ["2", "4", "8", "12"],
        answer: 2,
        feedback: "Eight glasses is a commonly used general guideline in quizzes."
    },
    {
        question: "Which food group provides healthy fats?",
        options: ["Avocados", "Candy", "Soft Drinks", "White Bread"],
        answer: 0,
        feedback: "Avocados contain mostly unsaturated fats."
    },
    {
        question: "Which mineral helps carry oxygen in the blood?",
        options: ["Calcium", "Iron", "Magnesium", "Potassium"],
        answer: 1,
        feedback: "Iron is needed to make haemoglobin, which carries oxygen in the blood."
    },
    {
        question: "Which nutrient helps maintain healthy digestion?",
        options: ["Sugar", "Fibre", "Salt", "Cholesterol"],
        answer: 1,
        feedback: "Fibre supports healthy digestion."
    },
    {
        question: "Which fruit is especially rich in Vitamin C?",
        options: ["Orange", "Banana", "Pear", "Grapes"],
        answer: 0,
        feedback: "Of these options, oranges are especially rich in Vitamin C."
    },
    {
        question: "Which food is considered a whole grain?",
        options: ["White Rice", "Brown Rice", "Candy", "Butter"],
        answer: 1,
        feedback: "Brown rice contains all parts of the grain."
    },
    {
        question: "Which nutrient provides the most energy per gram?",
        options: ["Protein", "Carbohydrates", "Fat", "Water"],
        answer: 2,
        feedback: "Fat provides more energy per gram than protein or carbohydrates."
    },
    {
        question: "Which vitamin is important for healthy vision?",
        options: ["Vitamin A", "Vitamin D", "Vitamin B12", "Vitamin K"],
        answer: 0,
        feedback: "Vitamin A helps support normal vision."
    },
    {
        question: "Which beverage is the healthiest choice?",
        options: ["Soft Drink", "Energy Drink", "Water", "Sports Drink"],
        answer: 2,
        feedback: "Water hydrates the body without added sugar."
    },
    {
        question: "Which mineral is important for healthy muscles and nerves?",
        options: ["Potassium", "Sugar", "Fat", "Cholesterol"],
        answer: 0,
        feedback: "Potassium supports normal muscle and nerve function."
    },
    {
        question: "What is the main function of carbohydrates?",
        options: [
            "Build muscles",
            "Provide energy",
            "Build bones",
            "Fight infections"
        ],
        answer: 1,
        feedback: "The main function of carbohydrates is to provide energy."
    },
    {
        question: "Which food contains the most calcium?",
        options: ["Milk", "Apple", "Rice", "Chicken"],
        answer: 0,
        feedback: "Of these options, milk contains the most calcium."
    },
    {
        question: "Why is breakfast important?",
        options: [
            "Provides energy for the day",
            "Makes you taller",
            "Prevents sleep",
            "Replaces water"
        ],
        answer: 0,
        feedback: "Breakfast can provide energy and nutrients at the beginning of the day."
    },
    {
        question: "Which is the healthiest snack option?",
        options: [
            "Potato Chips",
            "Chocolate Bar",
            "Fresh Fruit",
            "Candy"
        ],
        answer: 2,
        feedback: "Fresh fruit provides vitamins, minerals and fibre."
    }
];

/* =========================
   Shuffle Questions
========================= */

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

/* =========================
   Start Quiz
========================= */

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    shuffleQuestions();

    instructions.style.display = "none";
    resultsContainer.style.display = "none";
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

    questionText.textContent =
        `Question ${index + 1} of ${questions.length}: ${current.question}`;

    feedbackText.textContent = "";
    feedbackShowing = false;

    displayOptions(index);

    previousBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = false;

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next";
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
        optionsContainer.appendChild(document.createElement("br"));
    });
}

/* =========================
   Save User Answer
========================= */

function saveAnswer() {
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selectedAnswer) {
        return false;
    }

    userAnswers[currentQuestion] = Number(selectedAnswer.value);

    return true;
}

/* =========================
   Show Feedback
========================= */

function showFeedback() {
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selectedAnswer) {
        feedbackText.textContent = "Please select an answer.";
        feedbackText.style.color = "darkorange";
        return false;
    }

    const selected = Number(selectedAnswer.value);
    const current = questions[currentQuestion];
    const correctAnswer = current.options[current.answer];

    if (selected === current.answer) {
        feedbackText.textContent =
            `✅ Correct! ${current.feedback}`;

        feedbackText.style.color = "green";
    } else {
        feedbackText.textContent =
            `❌ Incorrect. The correct answer is ${correctAnswer}. ${current.feedback}`;

        feedbackText.style.color = "red";
    }

    return true;
}

/* =========================
   Next Question
========================= */

nextBtn.addEventListener("click", () => {
    if (feedbackShowing) {
        return;
    }

    if (!saveAnswer() || !showFeedback()) {
        return;
    }

    feedbackShowing = true;
    nextBtn.disabled = true;
    previousBtn.disabled = true;

    const radioButtons = document.querySelectorAll(
        'input[name="answer"]'
    );

    radioButtons.forEach((radio) => {
        radio.disabled = true;
    });

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    }, 2000);
});

/* =========================
   Previous Question
========================= */

previousBtn.addEventListener("click", () => {
    if (feedbackShowing) {
        return;
    }

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

    feedbackShowing = false;
    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";

    scoreText.textContent =
        `You scored ${score} out of ${questions.length}.`;
}

/* =========================
   Restart Quiz
========================= */

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
    shuffleQuestions();

    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    feedbackShowing = false;

    resultsContainer.style.display = "none";
    quizContainer.style.display = "block";

    showQuestion(currentQuestion);
}