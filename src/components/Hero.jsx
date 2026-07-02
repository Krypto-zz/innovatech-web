import { FaFire } from "react-icons/fa"

import { scrollToSection } from "../utils/navigation"



function Hero({ storeConfig, productsData = [] }) {
    const promotionsEnabled = productsData.some(
    (product) => product.promo && product.stock > 0
    )
    return (
    <section 
        id="inicio"
        className="grid md:grid-cols-2 gap-10 items-center mb-7">
        <div>
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-fuchsia-400 text-cyan-300 bg-fuchsia-500/10 font-semibold">
            <FaFire className="text-orange-400" />
            {storeConfig.heroBadge}
        </span>

        <h2 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
            {storeConfig.heroTitle}
        </h2>

        <p className="text-zinc-300 text-xl mt-6 max-w-xl">
            {storeConfig.heroText}
        </p>

        <div className="flex gap-5 mt-8">
            <button
            onClick={() => scrollToSection("productos")}
            className="bg-cyan-300 text-black px-7 py-4 rounded-xl font-black shadow-[0_0_25px_#00eaff88]"
            >
            Ver productos
            </button>

            {promotionsEnabled && (
            <button
                onClick={() => scrollToSection("promociones")}
                className="flex items-center gap-2 border border-fuchsia-400 px-7 py-4 rounded-xl font-black shadow-[0_0_25px_#ff00cc55]"
            >
                <FaFire className="text-orange-400" />
                Promociones
            </button>
            )}
        </div>
        </div>

        <div className="relative rounded-[2rem] border border-fuchsia-500/70 bg-[#071225] p-6 shadow-[0_0_45px_#ff00cc44] overflow-visible">
        <div className="h-80 rounded-3xl bg-[radial-gradient(circle_at_center,#00eaff33,transparent_35%),linear-gradient(135deg,#071225,#1b1038,#020617)] flex items-center justify-center">
            {storeConfig.featuredImage ? (
            <img
                src={storeConfig.featuredImage}
                alt={storeConfig.featuredTitle}
                className="w-full h-full object-contain"
            />
            ) : (
            <div className="grid grid-cols-3 gap-4">
                <div className="w-20 h-20 rounded-2xl bg-cyan-400/70 shadow-[0_0_25px_#00eaff]" />
                <div className="w-20 h-20 rounded-2xl bg-fuchsia-500/80 shadow-[0_0_25px_#ff00cc]" />
                <div className="w-20 h-20 rounded-2xl bg-purple-500/80 shadow-[0_0_25px_#a855f7]" />
            </div>
            )}
        </div>

        <div className="absolute bottom-[-85px] right-1 border border-cyan-400/40 bg-[#071225]/90 backdrop-blur-md rounded-2xl p-5 w-72 shadow-[0_0_25px_#00eaff22]">
            <p className="text-cyan-300 font-bold text-sm">Producto destacado</p>
            <h3 className="text-2xl font-black">
            {storeConfig.featuredTitle}
            </h3>

            <p className="text-zinc-300">
            {storeConfig.featuredText}
            </p>
        </div>
            </div>
    </section>
    )
}

export default Hero