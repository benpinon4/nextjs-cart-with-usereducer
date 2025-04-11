const cartReducer = (state, action) => {
  function totalCartItemPrices(action) {
    let total = action.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return total;
  }

  switch (action.type) {
    case "ADD_QUANTITY":
      return { 
        action: "ADD_QUANTITY",
        total: totalCartItemPrices(action.payload),
        cartItemList: [...action.payload],
      };
    case "SUBTRACT_QUANTITY":
      return {
        action: "SUBTRACT_QUANTITY",
        total: totalCartItemPrices(action.payload),
        cartItemList: [...action.payload],
      };
    case "NEW_CART_ITEM_LIST":
      return {
        action: "NEW_CART_ITEM_LIST",
        total: totalCartItemPrices(action.payload),
        cartItemList: [...action.payload],
      };
    case "DELETE_CART_ITEM":
      const updatedList = state.cartItemList.filter(item => item.id !== action.payload)
      return {
        action: "DELETE_CART_ITEM",
        total: totalCartItemPrices(updatedList),
        cartItemList: [...updatedList],};
    default:
      return state;
  }
};

export default cartReducer;
