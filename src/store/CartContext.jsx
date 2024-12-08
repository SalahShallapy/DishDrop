import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  ClearCart: () => {},
});

// function cartReducer(state, action) {
//   if (action.type === "ADD_ITEM") {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );

//     const updatedItems = [...state.items];

//     if (existingCartItemIndex > -1) {
//       const existingItem = state.items[existingCartItemIndex];
//       const updatedItem = {
//         ...existingItem,
//         quantity: existingItem.quantity + 1,
//       };
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems.push({ ...action.item, quantity: 1 });
//     }

//     return { ...state, items: updatedItems };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );

//     const existingaCartItem = state.items[existingCartItemIndex];
//     const updatedItems = [...state.items];

//     if (existingaCartItem) {
//       updatedItems.splice(existingCartItemIndex, 1);
//     } else {
//       const updatedItem = {
//         ...existingaCartItem,
//         quantity: existingaCartItem.quantity - 1,
//       };

//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

//     return { ...state, item: updatedItems };
//   }

//   return state;
// }

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Guard clause to handle invalid index
    if (existingCartItemIndex === -1) {
      console.warn(`Item with id ${action.id} not found.`);
      return state; // Return the unchanged state
    }

    const updatedItems = [...state.items];
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      // Remove the item if quantity is 1
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // Decrease quantity otherwise
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function ClearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartConext = {
    items: cart.items,
    addItem,
    removeItem,
    ClearCart,
  };

  console.log(cartConext);
  return (
    <CartContext.Provider value={cartConext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
