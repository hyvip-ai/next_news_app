import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/feed.module.css";
import Toolbar from "../../components/Tool-bar";
function Feed(props) {
  const router = useRouter();
  //   console.log(props.articles, props.pageNumber);
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        {props.articles.map((item, index) => {
          return (
            <div key={index} className={styles.post}>
              <h1
                onClick={() => {
                  window.location.href = item.url;
                }}
              >
                {item.title}
              </h1>
              <p>{item.description}</p>
              {item.urlToImage ? (
                <img src={item.urlToImage} alt={item.title} />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className={styles.paginator}>
        <div
          className={props.pageNumber === 1 ? styles.disabled : styles.active}
          onClick={() => {
            router.push(`/feed/${props.pageNumber - 1}`);
          }}
        >
          Previous Page
        </div>
        <div>#{props.pageNumber}</div>
        <div
          className={props.pageNumber === 5 ? styles.disabled : styles.active}
          onClick={() => {
            router.push(`/feed/${props.pageNumber + 1}`);
          }}
        >
          Next Page
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const pageNumber = context.query.pageNumber;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        pageNumber: 1,
        articles: [],
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );
  const articles = await apiResponse.json();
  return {
    props: {
      pageNumber: Number.parseInt(pageNumber),
      articles: articles.articles,
    },
  };
}

export default Feed;
