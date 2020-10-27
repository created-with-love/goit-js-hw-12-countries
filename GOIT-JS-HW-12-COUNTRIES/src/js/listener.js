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
    .catch(onFetchError)
    .finally(() => refs.form.reset());
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
    const markup = countriesListTml(countries);
    refs.countriesList.innerHTML = markup;
  }

  if (countries.length === 1) {
    err.hideError();
    const markup = countryCardTmpl(countries[0]);
    refs.countriesList.innerHTML = markup;
  }
}
