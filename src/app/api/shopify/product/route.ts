import { NextResponse, NextRequest } from "next/server";

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

export async function getProduct(id: string) {
  console.log(id);
  const query = `
    {
      product(id: "gid://shopify/Product/${id}") {
        title
      }
    }
  `;

  return shopifyFetch({ query });
}

// fetch all products
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "No id given" }, { status: 500 });

  try {
    const product = await getProduct(id);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}