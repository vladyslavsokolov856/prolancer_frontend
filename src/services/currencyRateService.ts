import axios from 'axios'

const API_URL = 'https://api.exchangerate-api.com/v4/latest/DKK'

export const fetchCurrencyRates = async () => {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((response) => {
      return response?.rates
    })
}
