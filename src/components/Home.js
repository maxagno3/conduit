import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

function Home() {
  const [articles, setArticles] = useState("");

  useEffect(() => {
    Axios.get(
      "https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&offset=0"
    ).then(({ data: { articles } }) => setArticles(articles));
  }, []);

  return (
    <>
      <div
        className="mobile-app-toggle articles-container"
        data-mobile-app-toggle
      >
        <button
          className="button is-active"
          //   onClick={() => this.handleFilter("myFeed")}
        >
          My Feed
        </button>
        <button
          className="button"
          //   onClick={() => this.handleFilter("globalFeed")}
        >
          Global Feed
        </button>
      </div>
      <div className="flex">
        {articles &&
          articles.map((article) => {
            return (
              <div className="articles-container flex-basis" key={uuid()}>
                <div className="card news-card">
                  <img
                    src={`https://source.unsplash.com/collection/{${Math.floor(
                      Math.random() * 100
                    )}/1600x900`}
                    alt={article.author.username}
                  />
                  <div className="card-section">
                    <div className="news-card-date">
                      {article.updatedAt.split("T")[0]}
                    </div>
                    <article className="news-card-article">
                      <h4 className="news-card-title">
                        <Link to={`articles/${article.slug}`}>{article.title}</Link>
                      </h4>
                      <p className="news-card-description">{article.description}</p>
                    </article>
                    {/* {article.favorited ? ( */}
                    <button
                      className="button button-like like-btn"
                      // onClick={this.handleLike}
                    >
                      <i className="fa fa-heart"></i>
                      <span> UnLike</span>
                    </button>
                    {/* ) : ( */}
                    <button
                      className="button button-like"
                      // onClick={this.handleLike}
                    >
                      <i className="fa fa-heart"></i>
                      <span> Like</span>
                    </button>
                    {/* )} */}

                    <div className="news-card-author">
                      <div className="news-card-author-image">
                        <img
                          src={article.author.image}
                          className="article-image"
                          alt="user"
                        />
                      </div>
                      <div className="news-card-author-name">
                        By
                         <Link to={`/profiles/${article.author.username}`}>
                          {article.author.username}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
