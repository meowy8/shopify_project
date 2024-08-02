import { NextRequest, NextResponse } from "next/server";

async function shopifyFetch({
  query,
  variables,
}: {
  query: string;
  variables?: Object;
}) {
  const endpoint = process.env.SHOPIFY_GRAPHQL_ENDPOINT;
  const key = process.env.SHOPIFY_API_ACCESS_TOKEN;

  if (!endpoint || !key) {
    console.error("Missing Shopify API credentials");
    throw new Error("Missing Shopify API credentials");
  }

  // console.log("Endpoint:", endpoint);
  // console.log("Query:", query);

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!result.ok) {
      const error = await result.json();
      throw new Error(JSON.stringify(error));
    }

    return await result.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getRelatedProducts(category: string) {
  const query = `
    {
      products(first: 3, query: "${category}") {
        edges {
          node {
            id
            title
            description
            handle
            productType
            priceRangeV2 {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              height
              width
              url
            }
            images(first: 4) {
              edges {
                node {
                  id
                  url
                  altText
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyFetch({ query });
}

// fetch all products
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");

  if (!category)
    return NextResponse.json({ error: "No category given" }, { status: 500 });

  try {
    const products = await getRelatedProducts(category);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
