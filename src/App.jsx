import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailWebDev from './pages/ServiceDetailWebDev'
import ServiceContactPage from './pages/ServiceContact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/web-development" element={<ServiceDetailWebDev />} />
        <Route path="/services/consultation" element={<ServiceContactPage />} />
      </Routes>
    </>
  )
}
