import { FaWhatsapp } from "react-icons/fa"

import { openGeneralWhatsapp } from "../utils/whatsapp"

function WhatsappBanner({ storeConfig }) {
  return (
    <section className="my-8 rounded-3xl border border-fuchsia-500 bg-[linear-gradient(90deg,#1a0635,#071225,#1a0635)] p-7 flex flex-col md:flex-row justify-between items-center shadow-[0_0_35px_#ff00cc66]">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center shadow-[0_0_30px_#22c55e]">
          <FaWhatsapp className="text-green-400 text-5xl" />
        </div>

        <div>
          <h3 className="text-2xl font-black">
            ¿Tienes dudas o necesitas ayuda con tu compra?
          </h3>

          <p className="text-zinc-300">
            {storeConfig?.schedule || "Escríbenos por WhatsApp, estamos para ayudarte."}
          </p>
        </div>
      </div>

            <button
        onClick={() => openGeneralWhatsapp(storeConfig)}
        className="
            group
            mt-5 md:mt-0
            flex items-center gap-3
            bg-green-500
            px-10 py-4
            rounded-xl
            text-xl
            font-black
            shadow-[0_0_25px_#22c55e66]
            transition-all
            duration-300
            hover:scale-105
            hover:-translate-y-1
            hover:shadow-[0_0_45px_#22c55ecc]
            active:scale-95
        "
        >
        <FaWhatsapp className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
        <span className="transition-all duration-300">
            Chatear ahora
        </span>
        </button>
    </section>
  )
}

export default WhatsappBanner