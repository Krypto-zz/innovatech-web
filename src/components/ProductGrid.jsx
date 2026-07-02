import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import { getProductIcon } from "../utils/icons"

function ProductGrid({ products }) {
    return (
    <div className="grid md:grid-cols-4 gap-5">
        {products.map((p) => (
        <Link
            to={`/producto/${p.slug}`}
            key={p.name}
            className="bg-[#040812] border border-cyan-900/30 rounded-2xl p-4 hover:border-fuchsia-500 hover:shadow-[0_0_30px_#ff00cc55] transition"
        >
        <div className="h-48 rounded-2xl bg-[radial-gradient(circle,#00eaff18,transparent_45%),linear-gradient(135deg,#03050b,#0a0815,#020308)] flex items-center justify-center text-8xl text-cyan-300 overflow-hidden">
        {p.image ? (
            <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover"
            />
        ) : (
            getProductIcon(p)
        )}
        </div>

            {p.promo && (
            <span className="inline-block mt-4 bg-fuchsia-600 px-3 py-1 rounded-md text-xs font-black">
                EN PROMOCIÓN
            </span>
            )}

            <h4 className="font-black text-xl mt-4">{p.name}</h4>
            <p className="text-cyan-300">{p.category}</p>

            <div className="flex items-end gap-4 mt-3">
            {p.promo ? (
                <>
                <p className="text-zinc-500 line-through">{p.price} Bs</p>
                <p className="text-2xl font-black text-cyan-300">{p.promo} Bs</p>
                </>
            ) : (
                <p className="text-2xl font-black text-white">{p.price} Bs</p>
            )}
            </div>

            <div className="mt-4 w-full flex items-center justify-center gap-2 border border-cyan-400 text-cyan-300 py-3 rounded-lg font-black hover:bg-cyan-300 hover:text-black transition">
            <FaWhatsapp className="text-green-400" />
            Ver producto
            </div>
        </Link>
        ))}
    </div>
    )
}

export default ProductGrid