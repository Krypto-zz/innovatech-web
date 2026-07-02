import { updateProduct } from "../firebase/productsService"

function AdminPromotions({ productsData, setProductsData, setToast }) {
  const promoProducts = productsData.filter((product) => product.promo)

async function removePromo(product) {
  const updatedProduct = {
    ...product,
    promo: null,
  }

  if (product.firebaseId) {
    await updateProduct(product.firebaseId, updatedProduct)
  } else {
    setProductsData(
      productsData.map((item) =>
        item.slug === product.slug ? updatedProduct : item
      )
    )
  }

  setToast?.({
    show: true,
    message: "Promoción desactivada correctamente.",
    type: "success",
  })

  setTimeout(() => {
    setToast?.({ show: false, message: "", type: "success" })
  }, 2500)
}

  if (promoProducts.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-center">
        <div>
          <h2 className="text-3xl font-black text-cyan-300">
            Sin promociones activas
          </h2>
          <p className="text-zinc-400 mt-2">
            Activa promociones desde la edición de un producto.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black">Promociones</h2>
        <p className="text-zinc-400">
          Productos que actualmente tienen precio promocional.
        </p>
      </div>

      <div className="space-y-4">
        {promoProducts.map((product) => (
          <div
            key={product.slug}
            className="bg-[#040812] border border-fuchsia-500/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div>
              <span className="inline-block bg-fuchsia-600 px-3 py-1 rounded-md text-xs font-black mb-3">
                EN PROMOCIÓN
              </span>

              <h3 className="text-xl font-black">{product.name}</h3>
              <p className="text-zinc-400">{product.category}</p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-zinc-500 line-through">
                  {product.price} Bs
                </p>
                <p className="text-2xl font-black text-cyan-300">
                  {product.promo} Bs
                </p>
              </div>

              <button
                onClick={() => removePromo(product)}
                className="border border-red-500 text-red-400 px-4 py-3 rounded-xl hover:bg-red-500/10 transition"
              >
                Desactivar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPromotions