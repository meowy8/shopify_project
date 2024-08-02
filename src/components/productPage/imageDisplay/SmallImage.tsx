import { ShopifyImage, ShopifyProduct } from "@/types/shopifyTypes";
import Image from "next/image";
import React from "react";
import styles from "./imageDisplay.module.scss";

const SmallImage = ({
  image,
  setMainImage,
}: {
  image: ShopifyImage;
  setMainImage: React.Dispatch<React.SetStateAction<ShopifyImage>>;
}) => {
  const changeMainImage = () => {
    setMainImage({
      url: image.url,
      height: image.height,
      width: image.width,
      altText: image.altText,
    });
  };

  return (
    <div className={styles.smallImage}>
      <button onClick={changeMainImage}>
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.altText}
        />
      </button>
    </div>
  );
};

export default SmallImage;
