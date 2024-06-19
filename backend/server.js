const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3001;
const cors = require("cors");
// Load environment variables from .env file
// require('dotenv').config();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
const tokenType = "Bearer";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NzgzNTgwLCJpYXQiOjE3MTg3ODMyODAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjY5YTEyYjhjLWVlZjgtNGFjNy04NDIzLTk3YTY2ZDU1ZTU4ZSIsInN1YiI6IjIxMDMwNTEwNTA0MUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjY5YTEyYjhjLWVlZjgtNGFjNy04NDIzLTk3YTY2ZDU1ZTU4ZSIsImNsaWVudFNlY3JldCI6IlpjcXJpc1FmeHpBQnhDRXciLCJvd25lck5hbWUiOiJBcnNoIFF1YWRyaSIsIm93bmVyRW1haWwiOiIyMTAzMDUxMDUwNDFAcGFydWx1bml2ZXJzaXR5LmFjLmluIiwicm9sbE5vIjoiMjEwMzA1MTA1MDQxIn0.PIciCWWOFq4fzA30Ug4QzidwyEsbh-gpWEfZfoZAIto";

// API to get top n products in a category
app.get("/categories/:categoryname/products", async (req, res) => {
  const { categoryname } = req.params;
  const { n, minPrice, maxPrice, sortBy, sortOrder, page } = req.query;
  console.log(n, minPrice, maxPrice, sortBy, sortOrder, page, categoryname);

  // Define e-commerce companies
  const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  let products = [];

  // Fetch products from all companies
  for (const company of companies) {
    try {
      const response = await axios.get(
        `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`,
        {
          params: { top: n, minPrice, maxPrice },
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
          },
        }
      );
      products = products.concat(response.data);
    } catch (error) {
      console.error(`Error fetching products from ${company}:`, error.message);
    }
  }

  // Apply sorting if required
  if (sortBy) {
    products.sort((a, b) => {
      if (sortOrder === "desc") {
        return b[sortBy] - a[sortBy];
      } else {
        return a[sortBy] - b[sortBy];
      }
    });
  }

  // Paginate results
  const pageSize = Math.min(n, 10);
  const paginatedProducts = products.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Send response
  res.json(
    paginatedProducts.map((product, index) => ({
      ...product,
      id: `${categoryname}-${index}`,
    }))
  );
});

// API to get product details by ID
app.get("/categories/:categoryname/products/:productid", (req, res) => {
  const { categoryname, productid } = req.params;
  // Assuming products are stored in-memory for simplicity
  const product = products.find((p) => p.id === productid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
