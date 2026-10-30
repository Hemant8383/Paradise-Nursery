import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/CartSlice";

function ProductList({ plants }) {
  const dispatch = useDispatch();

  return (
    <div className="product-list">
      {plants.map((plant) => (
        <div className="product-card" key={plant.id}>
          <img src={plant.image} alt={plant.name} />
          <h3>{plant.name}</h3>
          <p>{plant.description}</p>
          <p>Price: ${plant.price}</p>

          <button onClick={() => dispatch(addToCart(plant))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
