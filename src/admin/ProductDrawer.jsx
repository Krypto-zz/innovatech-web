import ProductForm from "./ProductForm"

function ProductDrawer({
  isOpen,
  onClose,
  onSave,
  editingProduct,
  productsData,
  categoriesData,
  setToast,
}) {
  if (!isOpen) return null

  const isEditing = Boolean(editingProduct)

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl h-full bg-[#071225] border-l border-cyan-500/30 p-6 overflow-y-auto shadow-[0_0_45px_#00eaff33]">
        <div className="flex justify-between items-center border-b border-white/10 pb-5 mb-6">
          <div>
            <h2 className="text-3xl font-black text-cyan-300">
              {isEditing ? "Editar producto" : "Nuevo producto"}
            </h2>
            <p className="text-zinc-400">
              {isEditing
                ? "Actualiza la información del producto."
                : "Agrega un nuevo producto al catálogo."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10"
          >
            Cerrar
          </button>
        </div>

        <ProductForm
            onSave={onSave}
            onClose={onClose}
            editingProduct={editingProduct}
            categoriesData={categoriesData}
            productsData={productsData}
            setToast={setToast}
        />
      </div>
    </div>
  )
}

export default ProductDrawer