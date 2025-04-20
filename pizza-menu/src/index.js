import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Aj Pizzas</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length > 0 && (
        <ul className="pizzas">
          {pizzaData.map((pizza, index) => (
            <Pizza key={index} pizza={pizza} />
          ))}
        </ul>
      )}
    </main>
  );
}

function Pizza({ pizza }) {
  return (
    <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
      <img src={pizza.photoName} alt={pizza.name} />
      <div className="pizza-info">
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hours = new Date().getHours();
  const openingTime = 8;
  const closingTime = 13;
  const isOpen = hours >= openingTime && hours <= closingTime;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openingTime={openingTime} closingTime={closingTime} />
      ) : (
        <Closed openingTime={openingTime} />
      )}
    </footer>
  );
}

function Order({ openingTime, closingTime }) {
  return (
    <div className="order">
      <p>
        We are open from {openingTime} to {closingTime}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

function Closed({ openingTime }) {
  return (
    <div className="order">
      <p>We are closed till {openingTime}</p>
      <button  className="btn disablebtn" disabled>
        Order
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
