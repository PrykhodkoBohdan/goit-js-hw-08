import throttle from "lodash.throttle";

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
  button: document.querySelector('button')
};
const LOCALSTORAGE_KEY = "feedback-form-state";
const formDate = {};

texteriaMessage(formDate);
refs.form.addEventListener('submit', onButtonClick);
refs.form.addEventListener('input', onInputClick);
refs.email.addEventListener('input', throttle(onEmail, 500));
refs.message.addEventListener('input', throttle(onMessage, 500));

function onButtonClick(even) {
even.preventDefault();

if (refs.email.value === "" || refs.message.value  === "") {
  alert('All fields must be filled!');
} else {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  localStorage.removeItem('Email');
  even.currentTarget.reset();
  console.log(formDate);
}
};

function onInputClick(even) {
formDate[even.target.name] = even.target.value;

}

function onEmail(even) {
const email = JSON.stringify(formDate[even.target.name]);
localStorage.setItem('Email', email);

};

function onMessage(even) {
  const message = JSON.stringify(formDate[even.target.name]);
  localStorage.setItem(LOCALSTORAGE_KEY, message);
 
};

function texteriaMessage() {
  
 const saveMessage = localStorage.getItem(LOCALSTORAGE_KEY);
 const saveEmail = localStorage.getItem('Email');

 if (saveMessage) {
 refs.message.value = JSON.parse(saveMessage);
 formDate.message = refs.message.value;
 console.log(saveMessage,"message");
 }

 if (saveEmail) {
refs.email.value = JSON.parse(saveEmail);
formDate.email = refs.email.value;
console.log(saveEmail,"email");
 }
 
}