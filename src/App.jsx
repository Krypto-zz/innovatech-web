import { listenCategories } from "./firebase/categoriesService"
import { listenSettings } from "./firebase/settingsService"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { listenProducts } from "./firebase/productsService"
import Toast from "./components/Toast"
import AdminLogin from "./admin/AdminLogin"
import { listenAuth } from "./firebase/authService"


import Home from "./pages/Home.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import AdminPanel from "./admin/AdminPanel.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"

import { SOCIAL_LINKS, WHATSAPP_NUMBER } from "./utils/whatsapp.js"

function App() {
  const [productsData, setProductsData] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [adminUser, setAdminUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const [storeConfig, setStoreConfig] = useState({
    storeName: "InnovaTech",
    heroBadge: "TECNOLOGÍA GAMER EN BOLIVIA",
    heroTitle: "Mejora tu setup con estilo",
    heroText:
      "Mouses, teclados, lámparas, parlantes y accesorios tecnológicos para tu espacio gamer o de estudio.",
    featuredTitle: "Setup gamer RGB",
    featuredText: "Accesorios con estilo neón y entrega en La Paz.",
    featuredImage: "",
    whatsapp: WHATSAPP_NUMBER,
    instagram: SOCIAL_LINKS.instagram,
    tiktok: SOCIAL_LINKS.tiktok,
    facebook: SOCIAL_LINKS.facebook,
    address: "La Paz - Bolivia",
    schedule: "Atención por WhatsApp",
    whatsappGeneralMessage:
      "Hola, InnovaTech.\n\nTengo una consulta sobre sus productos.\n\nMe gustaría recibir más información y ayuda para elegir el producto adecuado.",
      
    whatsappProductMessage:
      "Hola, InnovaTech.\n\nEstoy interesado en este producto:\n\n{productName}\n\nColor: {color}\n\nPrecio: {price} Bs\n\nMe gustaría recibir más información y coordinar la entrega.",
      
    whatsappPromoMessage:
      "Hola, InnovaTech.\n\nEstoy interesado en este producto en promoción:\n\n{productName}\n\nColor: {color}\n\nPrecio regular: {price} Bs\nPrecio promoción: {promo} Bs\n\nMe gustaría recibir más información y coordinar la entrega.",
  })

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  })

    useEffect(() => {
      const unsubscribe = listenProducts((firebaseProducts) => {
        setProductsData(firebaseProducts)
      })

      return () => unsubscribe()
    }, [])

    useEffect(() => {
      const unsubscribe = listenCategories((firebaseCategories) => {
        setCategoriesData(firebaseCategories)
      })

      return () => unsubscribe()
    }, [])
    useEffect(() => {
      const unsubscribe = listenAuth((user) => {
        setAdminUser(user)
        setAuthLoading(false)
      })

      return () => unsubscribe()
    }, [])
    useEffect(() => {
      const unsubscribe = listenSettings((firebaseSettings) => {
        setStoreConfig((prev) => ({
          ...prev,
          ...firebaseSettings,
        }))
      })

      return () => unsubscribe()
    }, [])
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home
          productsData={productsData}
          categoriesData={categoriesData}
          storeConfig={storeConfig}
        />} />

        <Route
          path="/producto/:slug"
          element={
            <ProductDetail
              productsData={productsData}
              storeConfig={storeConfig}
            />
          }
        />

        <Route
          path="/admin"
          element={
            authLoading ? (
              <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
                Cargando...
              </div>
            ) : adminUser ? (
              <AdminPanel
                productsData={productsData}
                setProductsData={setProductsData}
                categoriesData={categoriesData}
                setCategoriesData={setCategoriesData}
                storeConfig={storeConfig}
                setStoreConfig={setStoreConfig}
                setToast={setToast}
                adminUser={adminUser}
              />
            ) : (
              <AdminLogin setToast={setToast} />
            )
          }
        />
      </Routes>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />
    </BrowserRouter>
  )
}

export default App