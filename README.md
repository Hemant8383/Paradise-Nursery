# Paradise Nursery

Paradise Nursery is a simple, responsive online plant shop built with React, Redux Toolkit, and React Router.

## Features
- Landing page with a company introduction and Get Started button
- About Us page
- Plant catalog with 3 categories and 6 plants in each category
- Add-to-cart buttons that become disabled after adding
- Dynamic cart item count
- Cart quantity controls, item removal, and automatic total calculation
- Checkout button with a "Coming Soon" message

## Run locally
1. Install [Node.js](https://nodejs.org/).
2. Extract this project ZIP.
3. Open a terminal in the `Paradise-Nursery` folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown in the terminal.

## Main project files
- `src/App.jsx` – routes and application layout
- `src/components/AboutUs.jsx` – company information
- `src/features/CartSlice.jsx` – Redux cart state and reducers
- `src/components/ProductList.jsx` – plant catalog
- `src/components/CartItem.jsx` – shopping cart page
- `src/App.css` – application styling
