import debounce from "lodash.debounce";
import API from "./fetchCountries.js";
import { alert } from "@pnotify/core";
import getRefs from "./getRefs.js";
import countryCardTmpl from "../templates/country-card.hbs";
import countriesListTml from "../templates/countries-list.hbs";
import err from "./errorMsgGenerator.js";

const refs = getRefs();

refs.inputField.addEventListener("input", debounce(onInputFieldFIll, 500));

function onInputFieldFIll(e) {
  e.preventDefault();
  const searchQuery = refs.inputField.value;

  API.fetchCountries(searchQuery)
    .then((countries) => {
      renderCountryCard(countries);
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  alert(error);
}

function renderCountryCard(countries) {
  if (countries.length >= 10) {
    return err.errorMsgMarkUp();
  }
  if (countries.length < 10 && countries.length > 1) {
    err.hideError();
    refs.countriesList.innerHTML = countriesListTml(countries);
  }

  if (countries.length === 1) {
    err.hideError();
    refs.countriesList.innerHTML = countryCardTmpl(countries[0]);
  }
}
