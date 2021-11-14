import Head from "next/head";
import Image from "next/image";
import Toolbar from "../components/Tool-bar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Next.js News App</h1>
        <h3>Your One Stop Shop for the latest articles</h3>
      </div>
    </div>
  );
}
