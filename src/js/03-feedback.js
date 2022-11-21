import throttle from "lodash.throttle";

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
  button: document.querySelector('button')

}
const LOCALSTORAGE_KEY = "feedback-form-state";
const formDate = {};

texteriaMessage(formDate);
refs.form.addEventListener('submit', onButtonClick);
refs.form.addEventListener('input', onInputClick);
refs.email.addEventListener('input', throttle(onEmail, 500));
refs.message.addEventListener('input', throttle(onMessage, 500));

function onButtonClick(e) {
e.preventDefault();
if (refs.email.value === "") {
  alert('всі поля повинні бути заповнені!');
} else if (refs.message.value  === "") {
  alert('всі поля повинні бути заповнені!');
} else {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  localStorage.removeItem('Email');
  console.log(formDate);
  e.currentTarget.reset();
};
};
function onInputClick(e) {
formDate[e.target.name] = e.target.value;
// console.log(formDate);
}

function onEmail(e) {
const email = JSON.stringify(formDate[e.target.name]);
localStorage.setItem('Email', email);

};

function onMessage(e) {
  const message = JSON.stringify(formDate[e.target.name]);
  localStorage.setItem(LOCALSTORAGE_KEY, message);
  // console.log(message)
};

function texteriaMessage() {
  
 const saveMessage = localStorage.getItem(LOCALSTORAGE_KEY);
 const saveEmail = localStorage.getItem('Email');

 if (saveMessage) {
 refs.message.value = JSON.parse(saveMessage);
 formDate.message = refs.message.value;
 }

 if (saveEmail) {
refs.email.value = JSON.parse(saveEmail);
formDate.email = refs.email.value;
 };
 
};

