import { ShopifyProduct } from "./types/shopifyTypes";

export const getProductId = (product: ShopifyProduct) => {
  const idSplit = product.id.split("/");
  const id = idSplit[idSplit.length - 1];

  return id;
};
