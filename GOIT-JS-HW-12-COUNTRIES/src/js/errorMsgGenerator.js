const errorBox = document.querySelector(".form__error-box");
import { error } from "@pnotify/core";
import getRefs from "./getRefs.js";
const refs = getRefs();

// кидаю ошибку на страницу, если ее еще на странице нет
function errorMsgMarkUp() {
  const errorMsg = document.querySelector(".pnotify");
  if (!errorMsg) {
    refs.countriesList.innerHTML = "";
    error(`Too many matches found. \n
    Please enter a more specific query!`);
  }
}

// удаляю ошибку при создании элемента страны
function hideError() {
  const errorMsg = document.querySelector(".pnotify");
  if (errorMsg) {
    errorMsg.classList.add("hidden");
  }
}

export default { errorMsgMarkUp, hideError };
