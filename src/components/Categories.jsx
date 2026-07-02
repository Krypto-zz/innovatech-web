import { FaShoppingCart } from "react-icons/fa"
import { getCategoryIcon, getCategoryColor } from "../utils/icons"
import { scrollToSection } from "../utils/navigation"

function Categories({ selectedCategory, setSelectedCategory, categoriesData }) {
    const allCategories = [
    { name: "Todos", icon: <FaShoppingCart />, color: "text-cyan-300" },
    ...categoriesData,
    ]
        const categoryOrder = [
    "Mouses",
    "Teclados",
    "Audífonos",
    "Parlantes",
    "Lámparas",
    "Accesorios",
    "Otros",
    ]

    allCategories.splice(
    1,
    allCategories.length - 1,
    ...categoriesData.sort(
        (a, b) =>
        categoryOrder.indexOf(a.name) -
        categoryOrder.indexOf(b.name)
    )
    )

    return (
    <section id="categorias" className="mb-8 scroll-mt-24">
        <h3 className="text-3xl font-black mb-4">Categorías</h3>

        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
        {allCategories.map((cat) => (
            <button
            key={cat.name}
            onClick={() => {
                setSelectedCategory(cat.name)
                scrollToSection("productos")
            }}
            className={`border rounded-xl p-6 text-center transition ${
                selectedCategory === cat.name
                ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_25px_#00eaff55]"
                : "border-white/20 bg-[#0b1022] hover:border-cyan-400 hover:shadow-[0_0_25px_#00eaff55]"
            }`}
            >
            <div
            className={`text-5xl mx-auto mb-4 ${
                cat.name === "Todos"
                ? "text-cyan-300"
                : getCategoryColor(cat.iconName || cat.name)
            }`}
            >
            {cat.name === "Todos"
                ? cat.icon
                : getCategoryIcon(cat.iconName || cat.name)}
            </div>

            <p className="font-semibold">{cat.name}</p>
            </button>
        ))}
        </div>
    </section>
    )  
}

export default Categories