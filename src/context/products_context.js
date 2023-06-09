import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
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

const initialState = {
  isSidebarOpen: false,
  product_error: false,
  product_loading: false,
  products: [],
  featured_products: [],

  single_product_error: false,
  single_product_loading: false,
  single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function openSidebar() {
    dispatch({ type: SIDEBAR_OPEN })
  }

  function closeSidebar() {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  async function fetchData(url) {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await fetch(url)
      const products = await response.json()
      dispatch({ type: GET_PRODUCTS_SUCCESS, payloads: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [])

  async function fetchSingleProduct(url) {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await fetch(url)
      const product = await response.json()
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product })
    } catch (err) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  return (
    <ProductsContext.Provider 
      value={{
        ...state, 
        openSidebar,
        closeSidebar, 
        fetchSingleProduct
      }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
