export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  priceRangeV2: {
    minVariantPrice: {
      amount: number;
    };
  };
  featuredImage: {
    altText: string;
    width: number;
    height: number;
    url: string;
  };
  images: ShopifyImageEdge;
}

export type ShopifyImageEdge = {
  edges: { node: ShopifyImage }[];
};

export type ShopifyImage = {
  altText: string;
  width: number;
  height: number;
  url: string;
  id?: string;
};

export type ListOfProducts = ShopifyProduct[];
