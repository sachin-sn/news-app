import {
  FETCH_NEWS_REQUESTED,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  SEARCH_INPUT_CHANGED,
  SEARCH_BASED_ON_KEYWORD,
  RESET,
} from "../actions";

export default function newsReducer(state = { isLoading: true }, action) {
  console.log("action:", action);
  switch (action.type) {
    case FETCH_NEWS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        newsArticles: action.newsArticles,
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: "OOPS something went wrong, please try again...",
      };
    case SEARCH_INPUT_CHANGED:
      return {
        ...state,
        keyword: action.keyword,
      };
    case SEARCH_BASED_ON_KEYWORD:
      return {
        ...state,
        searchingBasedOnKeyword: true,
      };
    case RESET:
      return {
        ...state,
        searchingBasedOnKeyword: false,
        keyword: "",
      };
    default:
      return { ...state };
  }
}
