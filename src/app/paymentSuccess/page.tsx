"use client";
import React, { useEffect } from "react";
import styles from "./paymentSuccess.module.scss";
import PaymentSuccessIcon from "@/components/icons/PaymentSuccessIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";

const PaymentSuccess = () => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [iconTransition, setIconTransition] = React.useState({
    opacity: 0,
    transform: "translateY(20px)",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      return setShowSuccess(true);
    }, 2000);

    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    if (showSuccess)
      setIconTransition({ opacity: 1, transform: "translateY(0)" });
  }, [showSuccess]);

  return (
    <section className={styles.mainPage}>
      {showSuccess ? (
        <div className={styles.content}>
          <h1>Payment Successful</h1>
          <div
            className={styles.paymentSuccessIconContainer}
            style={iconTransition}
          >
            <PaymentSuccessIcon />
          </div>
        </div>
      ) : (
        <div className={styles.fulfilling}>
          <h1>Fulfilling Purchase</h1>
          <LoadingIcon />
        </div>
      )}
    </section>
  );
};

export default PaymentSuccess;
