import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./typehandler";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("Laptop");
  const [n, setN] = useState<number>(10);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchProducts();
  }, [category, n, minPrice, maxPrice, sortBy, sortOrder, page]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:3001/categories/${category}/products`,
        {
          params: { n, minPrice, maxPrice, sortBy, sortOrder, page },
        }
      );
      setProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching products:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      //   const filteredProducts = products.filter((product) =>
      //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
      //   );
      //   setProducts(filteredProducts);
      setCategory(searchTerm);
    } else {
      fetchProducts();
    }
  };
  console.log(products);
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl mx-auto p-4">
      <div className="mb-4 flex flex-col md:flex-row gap-4 justify-center items-center w-full">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Top Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center w-full">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-lg">${product.price}</p>
            <p className="text-lg">discount: {product.discount}%</p>
            <p className="text-lg">{product.rating}⭐</p>
            <p className="text-lg">availability: {product.availability}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
