import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa"

import Social from "./Social"
import { goToSection } from "../utils/navigation"
import { SOCIAL_LINKS, openGeneralWhatsapp } from "../utils/whatsapp"

const promotionsEnabled = productsData.some(
  (product) => product.promo && product.stock > 0
)

function Footer({ storeConfig, productsData = [] }) {
  return (
    <footer className="border-t border-white/10 py-8 grid md:grid-cols-4 gap-8">
      <div>
        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-cyan-400/40 shadow-[0_0_20px_#00eaff66] mb-4">
          <img
            src="/logo.jpg"
            alt="InnovaTech"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-zinc-300">
          Productos gamer y tecnológicos al mejor precio.
        </p>

        <p className="text-zinc-400 mt-3">
          📍 {storeConfig?.address || "La Paz - Bolivia"}
        </p>
      </div>

      <div>
        <h4 className="font-black mb-3">Enlaces rápidos</h4>

        <div className="space-y-2 text-zinc-300">
          <button onClick={() => goToSection("inicio")} className="block hover:text-cyan-300 transition">
            Inicio
          </button>

          <button onClick={() => goToSection("categorias")} className="block hover:text-cyan-300 transition">
            Categorías
          </button>

          {promotionsEnabled && (
            <button onClick={() => goToSection("promociones")} className="block hover:text-cyan-300 transition">
              Promociones
            </button>
          )}

          <button onClick={() => goToSection("productos")} className="block hover:text-cyan-300 transition">
            Productos
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-black mb-3">Información</h4>

        <div className="space-y-2 text-zinc-300">
          <p>Sobre nosotros</p>
          <p>Preguntas frecuentes</p>
          <p>Políticas de envío</p>
          <p>Términos y condiciones</p>
        </div>
      </div>

      <div>
        <h4 className="font-black mb-4">
          ⚡ Síguenos para nuevas promociones
        </h4>

        <div className="flex gap-4 flex-wrap">
          <Social
            href={storeConfig?.instagram || SOCIAL_LINKS.instagram}
            icon={<FaInstagram />}
            color="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600"
            label="Instagram"
          />

          <Social
            href={storeConfig?.tiktok || SOCIAL_LINKS.tiktok}
            icon={<FaTiktok />}
            color="bg-black"
            label="TikTok"
          />

          <Social
            href={storeConfig?.facebook || SOCIAL_LINKS.facebook}
            icon={<FaFacebookF />}
            color="bg-blue-600"
            label="Facebook"
          />

            <Social
            onClick={() => openGeneralWhatsapp(storeConfig)}
            icon={<FaWhatsapp />}
            color="bg-green-500"
            label="WhatsApp"
            />
        </div>
      </div>

      <p className="md:col-span-4 text-center text-zinc-500 border-t border-white/10 pt-5">
        © 2026 InnovaTech. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer