const form = {
  title: "This is a title for the form Header",
  questions: [
    {
      id: 2447,
      question_type: "TextQuestion",
      prompt: "What is your first answer?",
      is_required: false,
      min_char_length: 15,
    },
    {
      id: 2448,
      question_type: "TextQuestion",
      prompt: "What is your second answer?",
      is_required: true,
      min_char_length: 100,
    },
    {
      id: 2500,
      question_type: "TextQuestion",
      prompt: "What is your third answer?",
      is_required: true,
      min_char_length: 1,
    },
  ],
};

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const formTitle = document.querySelector("#form-title");
const formQues = document.querySelector("#form-question");
const formInput = document.querySelector("#form-input");
const quesNum = document.querySelector("#question-num");
const element = document.querySelector("#elID");
const userInput = [];
let currQues = 0;
let requiredInput = false;
let numOfQues;

window.onload = () => {
  loadQuestions(form.questions[currQues]);
  numOfQues = form.questions.length - 1;
};

const loadQuestions = (arr) => {
  const { id, question_type, prompt, is_required, min_char_length } = arr;
  formQues.textContent = prompt;
  quesNum.textContent = `${currQues + 1}. `;
};

nextBtn.onclick = () => {
  if (!requiredInput && currQues < numOfQues) {
    
    ++currQues;
    loadQuestions(form.questions[currQues]);
  }
};

prevBtn.onclick = () => {
  if (currQues >= 1) {
    --currQues;
    loadQuestions(form.questions[currQues]);
  }
};
