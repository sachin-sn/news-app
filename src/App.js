import React from "react";
import { connect } from "react-redux";
import {
  getNewsWithKeyword,
  getUKHeadlines,
  RESET,
  SEARCH_BASED_ON_KEYWORD,
  SEARCH_INPUT_CHANGED,
} from "./actions";
import "./App.scss";

class App extends React.Component {
  componentDidMount() {
    this.props.getLatestNews();
  }
  render() {
    return (
      <div className="App">
        {this.props.isLoading ? (
          <>
            <div class="loader"></div> loading...
          </>
        ) : (
          <div>
            <button
              className="refresh"
              onClick={() => {
                this.props.getLatestNews(true);
              }}
            >
              {this.props.searchingBasedOnKeyword ? "BACK" : "REFRESH"}
            </button>
            {SearchInput(
              this.props.searchInputChanged,
              this.props.searchBasedOnKeyword,
              this.props.keyword
            )}
            {NewsArticles(this.props.newsArticles)}
          </div>
        )}
      </div>
    );
  }
}
const SearchInput = (onChange, onClick, keyword, onReset) => {
  return (
    <div className="input-form">
      <input
        type="text"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={keyword || ""}
        placeholder="keyword search e.g., vogue.."
      />
      <button
        className="search"
        onClick={() => {
          onClick(keyword);
        }}
      >
        SEARCH
      </button>
    </div>
  );
};

const NewsArticles = (newsArticles) => {
  return newsArticles.map((newsArticle, index) => (
    <div className="news-article" key={index}>
      <div className="news-article-title">{newsArticle.title}</div>
      <div className="news-article-content">
        <div className="left">
          <div className="news-article-image">
            <img
              src={
                newsArticle.urlToImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADPzrYm_hQg2XMNc_9KTr9Axmn35s0DbsIQ&usqp=CAU"
              }
              alt="img"
            />
          </div>
        </div>
        <div className="right">
          <div className="news-article-description">
            {newsArticle.description} &nbsp;
            <a
              href={newsArticle.url}
              target="_blank"
              title="click here to take you the article"
              rel="noopener noreferrer"
            >
              readmore
            </a>
          </div>
          <div className="news-article-author">
            - <i>{newsArticle.author}</i>
          </div>
          <div className="news-article-published">
            <i>{getDate(newsArticle.publishedAt)}</i>
          </div>
          <div className="news-article-source">
            Source: <i>{newsArticle.source.name}</i>
          </div>
        </div>
      </div>
    </div>
  ));
};

const getDate = (date) => {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let d = new Date(date);
  return d.toLocaleDateString("en-US", options);
};

const mapStateToProps = (state) => {
  let { newsReducer } = state;
  return {
    ...newsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getLatestNews: (isRefreshClicked) => {
    if (isRefreshClicked) {
      dispatch({ type: RESET });
    }
    getUKHeadlines(dispatch);
  },
  searchInputChanged: (value) => {
    dispatch({ type: SEARCH_INPUT_CHANGED, keyword: value });
  },
  searchBasedOnKeyword: (keyword) => {
    dispatch({ type: SEARCH_BASED_ON_KEYWORD });
    getNewsWithKeyword(dispatch, keyword);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
