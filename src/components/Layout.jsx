import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout({ children, storeConfig, productsData }) {
  return (
    <div className="min-h-screen bg-[#010204] text-white overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#00eaff22,transparent_35%),radial-gradient(circle_at_top_right,#ff00cc22,transparent_35%),radial-gradient(circle_at_bottom,#002bff22,transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Navbar storeConfig={storeConfig} productsData={productsData} />
        {children}
        <Footer storeConfig={storeConfig} productsData={productsData} />
      </div>
    </div>
  )
}

export default Layout