import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setPopup(product);
    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <div className="relative">
      {popup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
          <span>{popup.title.slice(0, 20)}... added to cart!</span>
          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-green-600 px-3 py-1 rounded-md hover:bg-gray-200"
          >
            Check it
          </button>
        </div>
      )}

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-2xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
          >
            <div className="h-48 flex items-center justify-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 h-10">
              {product.title}
            </h3>
            <p className="text-lg font-bold text-plum-600 mt-2">
              ${product.price.toFixed(2)}
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-plum-600 text-white py-2 rounded-lg hover:bg-plum-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;

