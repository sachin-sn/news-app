export const FETCH_NEWS_REQUESTED = "FETCH_NEWS_REQUESTED";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";
export const SEARCH_INPUT_CHANGED = "SEARCH_INPUT_CHANGED";
export const SEARCH_BASED_ON_KEYWORD = "SEARCH_BASED_ON_KEYWORD";
export const RESET = "RESET";

const Axios = require("axios");
const API_KEY = "e22d8c7667464e09a22ccd2b4f01af9c";

export function getUKHeadlines(dispatch) {
  dispatch({ type: FETCH_NEWS_REQUESTED });
  Axios.get(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=${API_KEY}`)
    .then((response) => {
      dispatch({
        type: FETCH_NEWS_SUCCESS,
        newsArticles: response.data.articles,
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_NEWS_FAILURE });
    });
}

export function getNewsWithKeyword(dispatch, keyWord) {
  dispatch({ type: FETCH_NEWS_REQUESTED });
  Axios.get(`https://newsapi.org/v2/everything?q=${keyWord}&apiKey=${API_KEY}`)
    .then((response) => {
      dispatch({
        type: FETCH_NEWS_SUCCESS,
        newsArticles: response.data.articles,
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_NEWS_FAILURE });
    });
}
