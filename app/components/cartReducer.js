


const cartReducer = (state, action) => {

switch (action.type) {
    case "ADD_QUANTITY":
        // console.log(action.payload[0])
        console.log("in reducer")
        return {total: 0,
                cartItemList: [action.payload]
        }
    case "SUBTRACT_QUANTITY":
        console.log("in reducer subtract")
        return state
    case "NEW_CART_ITEM_LIST":
        console.log("in reducer subtract")
        return {total: 0,
            cartItemList: [action.payload]
    }
    case "DELETE_CART_ITEM":
        console.log("in reducer delete")
        return state
    default:
        return state
}

}

export default cartReducer