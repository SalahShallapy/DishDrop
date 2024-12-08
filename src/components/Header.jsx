import { useContext } from "react";

import Logo from "../assets/logo.jpg";
import Button from "../UI/Button";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="FOOD ORDER LOGO IMAGE" />
        <h1>Dish Drop</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
