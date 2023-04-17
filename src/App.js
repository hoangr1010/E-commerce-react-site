import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { Home, SingleProduct, Cart, Checkout, Error, About, Products, PrivateRoute, AuthWrapper } from './pages';


function App() {
  return (
  <AuthWrapper>
    <Navbar/> 
    <Sidebar/>
    <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='about' element={ <About />} />
          <Route path='cart' element={ <Cart /> } />
          <Route path='products' element={ <Products /> } />
          <Route path='products/:id' element={ <SingleProduct /> } />
          <Route path='checkout' element={ <PrivateRoute /> } >
            <Route path = '' element={ <Checkout /> } />
          </Route>
          <Route path='*' element={ <Error /> } />
        </Routes>
    <Footer/>
  </AuthWrapper>
  )
}

export default App
