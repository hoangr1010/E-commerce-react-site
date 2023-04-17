import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const temptItem = state.cart.find(i => i.id === id + color)
    if (temptItem) {
      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id+color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      }) 

      return { ...state, cart: tempCart}
    } else {
      const newItem = {
        id: id+color,
        name: product.name,
        color, 
        amount,
        image:product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return { ...state, cart: [...state.cart, newItem]}
    }
  } else if ( action.type === REMOVE_CART_ITEM ) {
    const tempCart = state.cart.filter(cartItem => cartItem.id !== action.payload)
    return { ...state, cart: tempCart}
  } else if ( action.type === CLEAR_CART ) {
    return { ...state, cart: []}
  } else if ( action.type === TOGGLE_CART_ITEM_AMOUNT ) {
    const { id, form } = action.payload
    const tempCart = state.cart.map(cartItem => {
      if (cartItem.id === id) {
        if (form === 'inc') {
          if ( cartItem.amount === cartItem.max) {
            return { ...cartItem, amount: cartItem.max }
          }
          return { ...cartItem, amount: cartItem.amount+1 }
        } else if (form === 'dec') {
          if ( cartItem.amount === 0 ) {
            return { ...cartItem, amount: 0 }
          }
          return { ...cartItem, amount: cartItem.amount-1 }
        }
      } else {
        return {...cartItem}
      }
    })
    return { ...state, cart: tempCart }
  } else if ( action.type === COUNT_CART_TOTALS ) {
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem
      total.total_items += amount
      total.total_amount += (amount*price)
      return total
    }, 
    {
      total_items: 0,
      total_amount: 0
    })
    return { ...state, total_items, total_amount }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
