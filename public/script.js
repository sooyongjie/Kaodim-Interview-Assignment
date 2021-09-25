const form = {
  title: "This is a title for the form Header",
  questions: [
    {
      id: 2447,
      question_type: "TextQuestion",
      prompt: "What is your first answer?",
      is_required: false,
      min_char_length: 2,
    },
    {
      id: 2448,
      question_type: "TextQuestion",
      prompt: "What is your second answer?",
      is_required: true,
      min_char_length: 2,
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
const requirementTxt = document.querySelector("#requirements")
const quesNum = document.querySelector("#question-num");
const element = document.querySelector("#elID");
const userInput = ['', '', ''];


let currQues = 0;
let numOfQues;
let charLen = formInput.value.length;
let min_char_length = 0;
let is_required = false;


window.onload = () => {
  loadQuestions(form.questions[currQues]);
  numOfQues = form.questions.length - 1;
};

const enableButton = (x) => {
  x ? nextBtn.disabled = false : nextBtn.disabled = true
}

const checkCharLength = () => {
  if (!is_required && charLen == 0) {
    enableButton(true)
  }
  else if (!is_required && charLen >= min_char_length) {
    enableButton(true)
  }
  else if (is_required && charLen < min_char_length) {
    enableButton(false)
  }
  else if (is_required && charLen >= min_char_length) {
    enableButton(true)
  }
  else {
    enableButton(false)
  }
}

formInput.oninput = () => {
  charLen = formInput.value.length;
  checkCharLength()
};

const checkInput = () => {
  charLen = formInput.value.length;
  checkCharLength()
}


const loadQuestions = (arr) => {
  let { id, question_type, prompt } = arr;
  min_char_length = arr.min_char_length
  is_required = arr.is_required

  formInput.value = "";
  formQues.textContent = prompt;
  quesNum.textContent = `${currQues + 1}. `;
  formInput.value = userInput[currQues]
  is_required == true ? requirementTxt.textContent = "Field is required" : requirementTxt.textContent = "Optional";
  min_char_length > 1 ? requirementTxt.textContent += `, ${min_char_length} characters are required.` : requirementTxt.textContent += `, ${min_char_length} character is required.`;
  checkInput()
};

nextBtn.onclick = () => {
  if (currQues < numOfQues) {
    userInput[currQues] = formInput.value;
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
