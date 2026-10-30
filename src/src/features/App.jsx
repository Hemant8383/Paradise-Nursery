import React, { useMemo } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from "./src/features/CartSlice";
import ProductList from "./src/features/src/components/ProductList";
import AboutUs from "./components/AboutUs";
import "./App.css";

const store = configureStore({ reducer: { cart: cartReducer } });

const plants = [
  { id: 1, name: "Snake Plant", category: "Air Purifying", price: 18, description: "A hardy indoor plant that adds a modern touch.", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Peace Lily", category: "Air Purifying", price: 22, description: "Elegant green leaves and beautiful white blooms.", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Aloe Vera", category: "Succulents", price: 12, description: "A low-maintenance succulent for sunny spaces.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Jade Plant", category: "Succulents", price: 15, description: "A compact succulent with glossy rounded leaves.", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Monstera", category: "Decorative", price: 28, description: "A statement plant with distinctive split leaves.", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Rubber Plant", category: "Decorative", price: 25, description: "Deep green foliage that brightens any room.", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80" }
];

function Header() {
  const count = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return <header className="site-header">
    <Link className="brand" to="/">Paradise Nursery</Link>
    <nav className="nav-links"><Link to="/">Home</Link><Link to="/about">About Us</Link><Link className="cart-link" to="/cart">Cart ({count})</Link></nav>
  </header>;
}

function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const grouped = useMemo(() => ["Air Purifying", "Succulents", "Decorative"].map(category => ({
    category, items: plants.filter(plant => plant.category === category)
  })), []);
  return <>
    <section className="hero"><div className="hero-content">
      <p className="eyebrow">WELCOME TO PARADISE NURSERY</p>
      <h1>Bring the beauty of nature home.</h1>
      <p>Discover plants that make your space feel fresh, calm, and alive.</p>
      <a className="primary-button" href="#plants">Explore Plants</a>
    </div></section>
    <main id="plants" className="section-wrap">
      <div className="section-heading"><h2>Find your perfect plant</h2><p>A little greenery makes a big difference.</p></div>
      {grouped.map(group => <section key={group.category}>
        <h2>{group.category}</h2>
        <ProductList plants={group.items.map(plant => ({
          ...plant,
          inCart: cartItems.some(item => item.id === plant.id),
          addToCart: () => dispatch(addToCart(plant))
        }))} />
      </section>)}
    </main>
  </>;
}

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <main className="cart-page">
    <h1>Your Shopping Cart</h1>
    {items.length === 0 ? <div className="empty-cart"><h2>Your cart is empty</h2><p>Find a plant you love and add it to your cart.</p><Link className="primary-button" to="/">Continue Shopping</Link></div> : <>
      {items.map(item => <div className="cart-item" key={item.id}>
        <img src={item.image} alt={item.name} />
        <div><h3>{item.name}</h3><p>\${item.price.toFixed(2)} each</p></div>
        <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
        <strong>{item.quantity}</strong>
        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
        <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        <strong>\${(item.price * item.quantity).toFixed(2)}</strong>
      </div>)}
      <p className="cart-total">Total: \${total.toFixed(2)}</p>
      <div style={{textAlign:"right"}}><button className="checkout-button" onClick={() => window.alert("Checkout coming soon!")}>Checkout</button></div>
    </>}
  </main>;
}

function AppLayout() {
  return <BrowserRouter><Header /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/cart" element={<Cart />} />
  </Routes><footer className="site-footer">© {new Date().getFullYear()} Paradise Nursery. Grow a greener tomorrow.</footer></BrowserRouter>;
}

export default function App() {
  return <Provider store={store}><AppLayout /></Provider>;
}
