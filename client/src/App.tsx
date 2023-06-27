import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from '~/assets/react.svg'
import Header from './components/Header'
import Home from './pages/home'
import Register from './pages/register'
import Share from './pages/share'
import { AppContextProvider } from './context/AppContext'

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Header />
        <main className='container mx-auto px-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='share' element={<Share />} />
          </Routes>
        </main>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
