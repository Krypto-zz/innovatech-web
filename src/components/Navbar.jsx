import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"

import { goToSection } from "../utils/navigation"
import { openGeneralWhatsapp } from "../utils/whatsapp"

function Navbar({ storeConfig, productsData = [] }) {
  const promotionsEnabled = productsData.some(
    (product) => product.promo && product.stock > 0
  )

  return (
    <header className="border-b border-white/10 pb-4 mb-8">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-cyan-400/40 shadow-[0_0_25px_#00eaff66]">
            <img
              src="/logo.jpg"
              alt="InnovaTech"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <nav className="hidden md:flex gap-10 font-semibold mr-auto ml-12">
          <button
            onClick={() => goToSection("inicio")}
            className="text-cyan-300 hover:text-cyan-200 transition underline underline-offset-8"
          >
            Inicio
          </button>

          <button onClick={() => goToSection("categorias")} className="hover:text-cyan-300 transition">
            Categorías
          </button>

          {promotionsEnabled && (
            <button onClick={() => goToSection("promociones")} className="hover:text-cyan-300 transition">
              Promociones
            </button>
          )}

          <button onClick={() => goToSection("productos")} className="hover:text-cyan-300 transition">
            Productos
          </button>
        </nav>

        <button
          onClick={() => openGeneralWhatsapp(storeConfig)}
          className="group flex items-center gap-2 sm:gap-3 border border-cyan-400 bg-[#071225] px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-[0_0_20px_#00eaff44] transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-green-400 hover:shadow-[0_0_35px_#22c55e88] active:scale-95"
        >
          <FaWhatsapp className="text-green-400 text-lg sm:text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

          <span className="text-sm sm:text-base font-semibold transition-colors duration-300 group-hover:text-green-400">
            WhatsApp
          </span>
        </button>
      </div>

      <nav className="md:hidden mt-4 grid grid-cols-2 gap-3 text-sm font-semibold">
        <button
          onClick={() => goToSection("inicio")}
          className="rounded-xl border border-cyan-400/30 bg-[#071225] px-4 py-3 text-cyan-300"
        >
          Inicio
        </button>

        <button
          onClick={() => goToSection("categorias")}
          className="rounded-xl border border-white/10 bg-[#071225] px-4 py-3 hover:text-cyan-300"
        >
          Categorías
        </button>

        {promotionsEnabled && (
          <button
            onClick={() => goToSection("promociones")}
            className="rounded-xl border border-fuchsia-400/30 bg-[#071225] px-4 py-3 hover:text-fuchsia-300"
          >
            Promociones
          </button>
        )}

        <button
          onClick={() => goToSection("productos")}
          className="rounded-xl border border-white/10 bg-[#071225] px-4 py-3 hover:text-cyan-300"
        >
          Productos
        </button>
      </nav>
    </header>
  )
}

export default Navbar