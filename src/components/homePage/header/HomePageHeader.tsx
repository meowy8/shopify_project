import React, { useEffect } from "react";
import styles from "./homePageHeader.module.scss";
import { transform } from "next/dist/build/swc";
import HeaderBackground from "./HeaderBackground";

const HomePageHeader = () => {
  const [titleTransition, setTitleTransition] = React.useState({});
  const [topLineTransition, setTopLineTransition] = React.useState({
    transform: "translateY(-500px)",
  });
  const [middleLineTransition, setMiddleLineTransition] = React.useState({
    opacity: 0,
  });
  const [bottomLineTransition, setBottomLineTransition] = React.useState({
    transform: "translateY(200px)",
    opacity: 0,
  });
  const [backgroundTransition, setBackgroundTransition] = React.useState({
    border: "none",
    boxShadow: "none",
    transform: "translateY(10px) translateX(10px)",
  });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const titleTimeout = setTimeout(
      () => setTitleTransition({ opacity: 1 }),
      2000
    );
    timeouts.push(titleTimeout);

    const topLineTimeout = setTimeout(
      () => setTopLineTransition({ transform: "translateY(0)" }),
      1000
    );
    timeouts.push(topLineTimeout);

    const middleLineTimeout = setTimeout(
      () => setMiddleLineTransition({ opacity: 1 }),
      3500
    );
    timeouts.push(middleLineTimeout);

    const bottomLineTimeout = setTimeout(
      () => setBottomLineTransition({ transform: "translateY(0)", opacity: 1 }),
      6000
    );
    timeouts.push(bottomLineTimeout);

    const backgroundTimeout = setTimeout(
      () =>
        setBackgroundTransition({
          border: "1px solid antiquewhite",
          boxShadow: "5px 5px rgba(250, 235, 215, 0.9)",
          transform: "translate(0)",
        }),
      5000
    );
    timeouts.push(backgroundTimeout);

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const triggerScroll = () => {
    const element = document.getElementById("productList");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={styles.homePageHeader} style={backgroundTransition}>
      {/* <div className={styles.backgroundTexture}>
        <HeaderBackground />
      </div> */}
      <div>
        <p className={styles.topLine} style={topLineTransition}>
          Welcome{" "}
          <span className={styles.title} style={titleTransition}>
            <span>to</span> The Cache.
          </span>
        </p>
        <p className={styles.middleLine} style={middleLineTransition}>
          Discover your next great find...
        </p>
        <div className={styles.bottomLine} style={bottomLineTransition}>
          <button onClick={triggerScroll}>
            <p>Explore the collection</p>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomePageHeader;
