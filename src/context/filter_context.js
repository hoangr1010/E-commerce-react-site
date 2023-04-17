import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'


const FilterContext = React.createContext()

const initialState = {
  all_products: [],
  filter_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  },
}

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)


  function setGridView() {
    dispatch({ type: SET_GRIDVIEW })
  }

  function setListView() {
    dispatch({ type: SET_LISTVIEW })
  }

  function updateSort(e) {
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payloads: value })
  }

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payloads: products})
  },[products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])  

  function updateFilters(e) {
    let name = e.target.name
    let value = e.target.value
  
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(e.target.value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payloads: { name, value }})
  }

  function clearFilters() {
    dispatch({ type: CLEAR_FILTERS })
  }


  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
