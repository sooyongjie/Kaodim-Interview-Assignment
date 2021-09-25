const formObject = {
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
const form = document.querySelector('.form-details')
const formQues = document.querySelector("#form-question");
const formInput = document.querySelector("#form-input");
const requirementTxt = document.querySelector("#requirements")
const quesNum = document.querySelector("#question-num");
const element = document.querySelector("#elID");
let userInput = ['', '', ''];
let showSummary = false;

const summary = document.querySelector('.summary')

let currQues = 0;
let numOfQues;
let charLen = formInput.value.length;
let min_char_length = 0;
let is_required = false;


let generateSummary = () => {
  for (let i = 0; i < numOfQues + 1; i++) {
    let pNode = document.createElement("p")
    console.log(userInput[1]);
    pNode.textContent = userInput[i]
    let h3Node = document.createElement("h3")
    h3Node.textContent = formObject.questions[i].prompt
    summary.appendChild(h3Node)
    summary.appendChild(pNode)
    formTitle.textContent = "Summary"
  }
}

window.onload = () => {
  loadQuestions(formObject.questions[currQues]);
  numOfQues = formObject.questions.length - 1;
};

const enableButton = (x) => {
  if (x) {
    formInput.classList.remove("error")
    nextBtn.disabled = false
    nextBtn.classList.remove("disabled")
  }
  else {
    formInput.classList.add("error")
    nextBtn.disabled = true
    nextBtn.classList.add("disabled")
  }
}

// enable or disable button
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
  formInput.focus()
}

// check if input meets min requirements
formInput.oninput = () => {
  charLen = formInput.value.length;
  checkCharLength()
};

// used when loading question
const checkInput = () => {
  charLen = formInput.value.length;
  checkCharLength()
}


const loadQuestions = (arr) => {
  let { id, question_type, prompt } = arr;
  min_char_length = arr.min_char_length
  is_required = arr.is_required

  formInput.value = "";
  formTitle.textContent = formObject.title
  formQues.textContent = prompt;
  quesNum.textContent = `${currQues + 1}. `;
  formInput.value = userInput[currQues]
  is_required == true ? requirementTxt.textContent = "Field is required" : requirementTxt.textContent = "Optional";
  min_char_length > 1 ? requirementTxt.textContent += `, ${min_char_length} characters are required.` : requirementTxt.textContent += `, ${min_char_length} character is required.`;
  checkInput()
};

// next question
nextBtn.onclick = () => {
  if (currQues < numOfQues) {
    userInput[currQues] = formInput.value;
    ++currQues;
    loadQuestions(formObject.questions[currQues]);
  }
  else if (currQues == numOfQues) {
    userInput[currQues] = formInput.value;
    form.style.display = "none";
    summary.style.display = "block"
    nextBtn.style.display = "none"
    showSummary = true;
    generateSummary()
  }
};

// prev question
prevBtn.onclick = () => {
  console.log(showSummary);
  if (showSummary) {
    showSummary = false;
    summary.innerHTML = ""
    nextBtn.style.display = "block"
    form.style.display = "block";
    summary.style.display = "none"
    console.log('currQues: ', currQues);
    loadQuestions(formObject.questions[currQues]);
  }
  else if (currQues >= 1) {
    userInput[currQues] = formInput.value;
    --currQues;
    loadQuestions(formObject.questions[currQues]);
  }

};
