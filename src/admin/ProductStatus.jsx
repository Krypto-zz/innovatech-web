function ProductStatus({ stock }) {
    if (stock === 0) {
    return (
        <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-sm font-bold">
        Agotado
        </span>
    )
    }

    if (stock <= 3) {
    return (
        <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-sm font-bold">
        Poco stock
        </span>
    )
    }

    return (
    <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-sm font-bold">
        Disponible
    </span>
    )
}

export default ProductStatus