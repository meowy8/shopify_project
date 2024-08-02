import React, { useEffect } from "react";
import styles from "./imageDisplay.module.scss";
import Image from "next/image";
import { ShopifyProduct } from "@/types/shopifyTypes";
import SmallImage from "./SmallImage";

const ImageDisplay = ({ product }: { product: ShopifyProduct }) => {
  const [mainImage, setMainImage] = React.useState({
    url: product.featuredImage.url,
    height: product.featuredImage.height,
    width: product.featuredImage.width,
    altText: product.featuredImage.altText,
  });
  const [sideImagesTransition, setSideImagesTransition] = React.useState({});

  const triggerSideImagesTransition = () => {
    setSideImagesTransition({ translate: 0, opacity: 1 });
  };

  return (
    <div className={styles.display}>
      <div className={styles.mainImage}>
        <Image
          src={mainImage.url}
          width={mainImage.width}
          height={mainImage.height}
          alt={mainImage.altText}
        />
      </div>
      <div
        onLoad={triggerSideImagesTransition}
        className={styles.sideContainer}
        style={sideImagesTransition}
      >
        {product?.images.edges.map((image) => (
          <SmallImage
            key={image.node.id}
            image={image.node}
            setMainImage={setMainImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
