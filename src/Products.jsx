import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Products.css"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchApi = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]); 
  };

  const filteredData = products
    .filter((p) => (category ? p.category === category : true))
    .filter((p) =>
      searchValue
        ? p.title.toLowerCase().includes(searchValue.toLowerCase())
        : true
    )
    .sort((a, b) =>
      price === "high-low" ? b.price - a.price : a.price - b.price
    );

  return (
    <>
      <header>
        <h2>Products</h2>
        <div>Cart: {cart.length} items</div>
      </header>

      <div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="high-low">High-Low</option>
          <option value="low-high">Low-High</option>
        </select>

        {error ? (
          <div>
            <h2>Error occured while fetching data</h2>
            <p>{error.message}</p>
          </div>
        ) : products.length === 0 ? (
          <h2>Loading.....</h2>
        ) : (
          <div className="filtered">
            {filteredData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
