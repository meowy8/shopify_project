"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./relatedProducts.module.scss";
import { ShopifyProduct } from "@/types/shopifyTypes";
import Image from "next/image";
import Link from "next/link";
import { getProductId } from "@/utils";

const RelatedProducts = ({ product }: { product: ShopifyProduct }) => {
  const [relatedProductsTransition, setRelatedProductsTransition] = useState(
    {}
  );
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);

  const triggerRelatedProducts = () => {
    return setTimeout(
      () => setRelatedProductsTransition({ translate: 0, opacity: 1 }),
      1000
    );
  };

  const fetchRelatedProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/shopify/relatedProducts?category=${product.productType}`
      );
      const result = await response.json();

      const relatedProductsArray = result.data.products.edges
        .filter(
          (item: { node: ShopifyProduct }) =>
            item.node.id !== product.id && item.node.featuredImage?.url
        )
        .map((item: { node: ShopifyProduct }) => item.node);

      setRelatedProducts(relatedProductsArray);
    } catch (error) {
      console.error(error);
    }
  }, [product]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  useEffect(() => console.log(relatedProducts), [relatedProducts]);

  return (
    <aside className={styles.relatedProductsContainer}>
      {relatedProducts.length > 0 && (
        <div
          className={styles.relatedProducts}
          onLoad={triggerRelatedProducts}
          style={relatedProductsTransition}
        >
          <div className={styles.header}>
            <h3>You might like these...</h3>
          </div>
          {relatedProducts.map((relatedProduct) => {
            const id = getProductId(relatedProduct);
            return (
              <Link
                key={id}
                href={`/product/${id}`}
                className={styles.relatedProductsCard}
              >
                <Image
                  src={relatedProduct.featuredImage?.url}
                  width={relatedProduct.featuredImage?.width}
                  height={relatedProduct.featuredImage?.height}
                  alt={
                    relatedProduct.featuredImage?.altText ||
                    "Related product image"
                  }
                />
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default RelatedProducts;
