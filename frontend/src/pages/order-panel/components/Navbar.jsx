import Cart from "../../../img/cart.png";
import "./Navbar.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { items } from "./Data";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContex.jsx";
import AppTitle from "../../../util/AppTitle.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [mobileNav, setMobileNav] = useState(false);

  const cartSize = () => {
    let size = 0;
    for (let i = 1; i < items + 1; i++) {
      if (cartItems[i] !== 0) {
        size += 1;
      }
    }
    return size;
  };

  return (
    <>
      <div className={`mobile-nav ${mobileNav ? "open-flex" : "closed-flex"}`}>
        <div
          className="btn-close-mobile-nav"
          onClick={() => setMobileNav(!mobileNav)}
        />
        <div className="mobile-links">
          <Button
            buttonContent="Categories"
            clickEffect={() => {
              navigate("/products", { state: 1 });
              window.scrollTo(0, 0);
              setMobileNav(!mobileNav);
            }}
          />
          <Button
            buttonContent="Categories"
            clickEffect={() => {
              navigate("/categories" );
              window.scrollTo(0, 0);
              setMobileNav(!mobileNav);
            }}
          />
          <Button
            buttonContent="Products"
            clickEffect={() => {
              navigate("/products", { state: 1 });
              window.scrollTo(0, 0);
              setMobileNav(!mobileNav);
            }}
          />
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="nav-container">
            <AppTitle />
            <div className="nav-links">
              <img
                src={Cart}
                alt="cart"
                className="cart-img"
                onClick={() => {
                  document.querySelector(".cart").classList.add("active");
                }}
              />
              <div className="cart-items-counter">{cartSize()}</div>
            </div>

            <div className="hamburger-menu">
              <img
                src={Cart}
                alt="cart"
                className="cart-img"
                onClick={() => {
                  document.querySelector(".cart").classList.add("active");
                }}
              />
              <div className="cart-items-counter-mobile-nav">{cartSize()}</div>
              <Button
                buttonContent="menu-icon-img"
                clickEffect={() => setMobileNav(!mobileNav)}
              />
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;