import Cart from "./components/Carts/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals/Meals";
import Checkout from "./components/Checkout";

import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
