import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: 
      const prices = action.payloads.map(product => product.price)
      const maxPrice = Math.max(...prices)
      return { ...state, 
                all_products: [...action.payloads], 
                filter_products: [...action.payloads],
                filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
              }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    case UPDATE_SORT:
      return { ...state, sort: action.payloads }
    case SORT_PRODUCTS:
      const { filter_products, sort } = state
      let tempProducts = []
      switch (sort) {
        case ('price-lowest'):
          tempProducts = filter_products.sort((a, b) => a.price - b.price)
          break
        case ('price-highest'):
          tempProducts = filter_products.sort((a, b) => b.price - a.price)
          break
        case ('name-a'):
          tempProducts = filter_products.sort((a, b) => a.name.localeCompare(b.name))
          break
        case ('name-z'):
          tempProducts = filter_products.sort((a, b) => b.name.localeCompare(b.name))
          break
      }
      return { ...state, filter_products: tempProducts }
    case UPDATE_FILTERS:
      const { name, value } = action.payloads
      return { ...state, filters: { ...state.filters, [name]: value }}
    case FILTER_PRODUCTS:
      const { all_products } = state
      const { text, category, company, color, price, shipping } = state.filters
      
      let filterTempProducts = [...all_products]

      if (text) {
        filterTempProducts = filterTempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }

      if (category !== 'all') {
        filterTempProducts = filterTempProducts.filter((product) => {
          return product.category === category
        })
      }

      if (company !== 'all') {
        filterTempProducts = filterTempProducts.filter((product) => {
          return product.company === company
        })
      }

      if (color !== 'all') {
        filterTempProducts = filterTempProducts.filter((product) => {
          return product.colors.includes(color)
        })
      }

      if (price !== state.filters.max_price) {
        filterTempProducts = filterTempProducts.filter((product) => {
          return product.price > state.filters.min_price && product.price < price
        })
      }

      if (shipping) {
        filterTempProducts = filterTempProducts.filter((product) => {
          return product.shipping === true
        })
      }

      return { ...state, filter_products: filterTempProducts }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false
        }
      }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
