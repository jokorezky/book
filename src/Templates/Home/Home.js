import React, { Component } from "react";
import App from "../App";
import styles from "./Home.css";
class Home extends Component {
  render() {
    return (
      <div className={styles.pageWraper}>
        <div className={styles.hide}>
        <div className={styles.accountHead}>
          <div className={styles.logo}>
            <img
              src="http://educhamp.themetrades.com/demo/assets/images/logo-white-2.png"
              alt=""
            />
          </div>
          <div className={styles.bgColor}></div>
        </div>
        </div>
        <App />
      </div>
    );
  }
}
export default Home;
