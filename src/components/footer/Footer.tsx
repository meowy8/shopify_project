import React from "react";
import styles from "./footer.module.scss";
import LinkedInIcon from "../icons/LinkedInIcon";
import Link from "next/link";
import GitHubIcon from "../icons/GitHubIcon";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <p>
            Created by <span className={styles.name}>Micheal Hoey</span>
          </p>
          <ul>
            <li>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/micheal-hoey-271a50232/"
              >
                <span>
                  <LinkedInIcon />
                </span>
              </Link>
            </li>
            <li>
              {" "}
              <Link target="_blank" href="https://github.com/meowy8">
                <span>
                  <GitHubIcon />
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.shopTitleContainer}>
          <h2>The Cache</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
