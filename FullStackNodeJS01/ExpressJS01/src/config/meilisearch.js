import { MeiliSearch } from "meilisearch";
import dotenv from "dotenv";

dotenv.config();

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_API_KEY || "",
});

const PRODUCTS_INDEX = "products";

const initProductsIndex = async () => {
  try {
    const index = client.index(PRODUCTS_INDEX);

    await index.updateSearchableAttributes(["name", "description", "category"]);

    await index.updateFilterableAttributes(["category", "price", "id"]);

    await index.updateSortableAttributes(["price", "createdAt"]);

    await index.updateTypoTolerance({
      enabled: true,
      minWordSizeForTypos: {
        oneTypo: 4, // Allow 1 typo for words/numbers with 4+ characters
        twoTypos: 7, // Allow 2 typos for words/numbers with 7+ characters
      },
      disableOnWords: [],
      disableOnAttributes: [],
    });

    console.log("MeiliSearch products index initialized successfully");
  } catch (error) {
    console.error("Error initializing MeiliSearch index:", error);
  }
};

export const syncProductToMeili = async (product) => {
  try {
    const index = client.index(PRODUCTS_INDEX);
    await index.addDocuments([
      {
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        category: product.category,
        image: product.image,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    ]);
    console.log(`Product ${product.id} synced to MeiliSearch`);
  } catch (error) {
    console.error("Error syncing product to MeiliSearch:", error);
  }
};

export const deleteProductFromMeili = async (productId) => {
  try {
    const index = client.index(PRODUCTS_INDEX);
    await index.deleteDocument(productId);
    console.log(`Product ${productId} deleted from MeiliSearch`);
  } catch (error) {
    console.error("Error deleting product from MeiliSearch:", error);
  }
};

export const searchProductsInMeili = async (
  search = "",
  category = "",
  minPrice = null,
  maxPrice = null,
  page = 1,
  limit = 10
) => {
  try {
    const index = client.index(PRODUCTS_INDEX);
    const offset = (page - 1) * limit;

    // Build filter
    const filters = [];
    if (category) {
      filters.push(`category = "${category}"`);
    }
    if (minPrice !== null && minPrice !== undefined && minPrice !== "") {
      filters.push(`price >= ${parseFloat(minPrice)}`);
    }
    if (maxPrice !== null && maxPrice !== undefined && maxPrice !== "") {
      filters.push(`price <= ${parseFloat(maxPrice)}`);
    }

    const filterString = filters.length > 0 ? filters.join(" AND ") : undefined;

    const searchResults = await index.search(search, {
      filter: filterString,
      limit,
      offset,
      matchingStrategy: "last",
      rankingScoreThreshold: 0.3,
    });

    return {
      products: searchResults.hits,
      total: searchResults.estimatedTotalHits,
      page,
      totalPages: Math.ceil(searchResults.estimatedTotalHits / limit),
    };
  } catch (error) {
    console.error("Error searching products in MeiliSearch:", error);
    return null;
  }
};

// Sync all products from database to MeiliSearch
export const syncAllProductsToMeili = async (products) => {
  try {
    const index = client.index(PRODUCTS_INDEX);
    const documents = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    await index.addDocuments(documents);
    console.log(`${products.length} products synced to MeiliSearch`);
  } catch (error) {
    console.error("Error syncing all products to MeiliSearch:", error);
  }
};

// Initialize index on startup
initProductsIndex();

export default client;
