import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true}
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false}
    //----------------------------------------------------------------
    case GET_PRODUCTS_BEGIN:
      return { ...state, product_loading: true}
    case GET_PRODUCTS_SUCCESS:
      const products = action.payloads
      const featureProducts = products.filter(product => product.featured === true)
      return { ...state, 
               product_loading: false, 
               products: products, 
               featured_products: featureProducts 
              }
    case GET_PRODUCTS_ERROR:
      return { ...state, product_error: true, product_loading: false }
    //----------------------------------------------------------------
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, single_product_loading: true }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, single_product_loading: false, single_product: action.payload }
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, single_product_loading: false, single_product_error: true }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
