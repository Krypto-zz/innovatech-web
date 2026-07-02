import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { getProductIcon } from "../utils/icons"


function SearchBar({ search, setSearch, productsData }) {
    const suggestions = search.trim()
    ? productsData
        .filter((product) => product.stock > 0)
        .filter((product) => {
            const text = `${product.name} ${product.category} ${product.description}`.toLowerCase()
            return text.includes(search.toLowerCase())
        })
        .slice(0, 5)
    : []

    return (
    <div className="relative mb-6">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 text-xl" />

        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#071225]/90 border border-cyan-400 rounded-xl py-5 pl-14 pr-6 text-xl outline-none shadow-[0_0_25px_#00eaff33]"
        placeholder="Buscar mouse, teclado, audífonos..."
        />

        {suggestions.length > 0 && (
        <div className="absolute z-50 mt-3 w-full rounded-2xl border border-cyan-400/40 bg-[#071225] shadow-[0_0_30px_#00eaff44] overflow-hidden">
            {suggestions.map((product) => (
            <Link
                key={product.slug}
                to={`/producto/${product.slug}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-cyan-400/10 transition border-b border-white/10 last:border-b-0"
            >
                <div className="w-12 h-12 rounded-xl bg-[#0b1022] border border-cyan-900/40 flex items-center justify-center text-2xl text-cyan-300 overflow-hidden">
                {product.image ? (
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                    />
                ) : (
                    getProductIcon(product)
                )}
                </div>

                <div>
                <p className="font-black">{product.name}</p>
                <p className="text-sm text-zinc-400">{product.category}</p>
                </div>

                <p className="ml-auto text-cyan-300 font-black">
                {product.promo ? `${product.promo} Bs` : `${product.price} Bs`}
                </p>
            </Link>
            ))}
        </div>
        )}
    </div>
    )
}

export default SearchBar