import { useState } from "react"
import ProductImageInput from "./ProductImageInput"
import { uploadImagesToCloudinary } from "../services/cloudinary"

function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}


function ProductForm({
  onSave,
  onClose,
  editingProduct,
  productsData = [],
  categoriesData = [],
  setToast = () => {},
}) {
  const [images, setImages] = useState(editingProduct?.images || [])
  const [imageFiles, setImageFiles] = useState([])
  const [name, setName] = useState(editingProduct?.name || "")
  const [category, setCategory] = useState(editingProduct?.category || "")
  const [description, setDescription] = useState(editingProduct?.description || "")
  const [price, setPrice] = useState(editingProduct?.price || "")
  const [stock, setStock] = useState(editingProduct?.stock ?? "")
  const [colors, setColors] = useState(editingProduct?.colors?.join(", ") || "")
  const [features, setFeatures] = useState(editingProduct?.features?.join(", ") || "")
  const [hasPromo, setHasPromo] = useState(Boolean(editingProduct?.promo))
  const [promo, setPromo] = useState(editingProduct?.promo || "")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSaving) return

    const nameAlreadyExists = productsData?.some(
    (product) =>
        product.name.toLowerCase().trim() === name.toLowerCase().trim() &&
        product.slug !== editingProduct?.slug
    )

    if (nameAlreadyExists) {
setToast?.({
  show: true,
  message: "Ya existe un producto con ese nombre.",
  type: "error",
})

setTimeout(() => {
  setToast?.({
    show: false,
    message: "",
    type: "success",
  })
}, 2500)

return
    }
    if (Number(price) <= 0) {
setToast?.({
  show: true,
  message: "El precio debe ser mayor a 0.",
  type: "error",
})

setTimeout(() => {
  setToast?.({ show: false, message: "", type: "success" })
}, 2500)

return
    }

    if (Number(stock) < 0) {
setToast?.({
  show: true,
  message: "El stock no puede ser negativo.",
  type: "error",
})

setTimeout(() => {
  setToast?.({ show: false, message: "", type: "success" })
}, 2500)

return
    }

    if (hasPromo && Number(promo) >= Number(price)) {
setToast?.({
  show: true,
  message: "El precio de promoción debe ser menor al precio normal.",
  type: "error",
})

setTimeout(() => {
  setToast?.({ show: false, message: "", type: "success" })
}, 2500)

return
    }
    setIsSaving(true)

    const uploadedImageUrls =
      imageFiles.length > 0
        ? await uploadImagesToCloudinary(imageFiles)
        : []

    const finalImages = [
      ...images.filter((image) => image.startsWith("http")),
      ...uploadedImageUrls,
    ]

    const savedProduct = {
      ...editingProduct,
      name,
      slug: createSlug(name),
      category,
      description,
      price: Number(price),
      promo: hasPromo ? Number(promo) : null,
      stock: Number(stock),
      images: finalImages,
      image: finalImages[0] || "",
      colors: colors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      features: features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }

    try {
      await onSave(savedProduct)
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <ProductImageInput
          images={images}
          setImages={setImages}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
        <label className="text-sm text-zinc-400">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ej: Mouse AULA H512"
          className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
        >
          <option value="">Selecciona una categoría</option>

          {categoriesData.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-zinc-400">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Descripción del producto..."
          rows="4"
          className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-400">Precio</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
            type="number"
            placeholder="120"
            className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Stock</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
            type="number"
            placeholder="5"
            className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-zinc-400">Colores</label>
        <input
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          placeholder="Negro, RGB, Azul"
          className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="text-sm text-zinc-400">Características</label>
        <input
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Bluetooth, Portátil, Buen sonido"
          className="w-full mt-2 bg-[#040812] border border-cyan-900/50 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
        />
      </div>

      <div className="border border-fuchsia-500/30 rounded-2xl p-4 bg-fuchsia-500/5">
        <label className="flex items-center gap-3 font-bold">
          <input
            type="checkbox"
            checked={hasPromo}
            onChange={(e) => setHasPromo(e.target.checked)}
          />
          Activar promoción
        </label>

        {hasPromo && (
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            required
            min="1"
            type="number"
            placeholder="Precio promoción"
            className="w-full mt-4 bg-[#040812] border border-fuchsia-900/50 rounded-xl px-4 py-3 outline-none focus:border-fuchsia-400"
          />
        )}
      </div>

      <button
        disabled={isSaving}
        className={`w-full py-4 rounded-xl font-black shadow-[0_0_25px_#00eaff66] ${
          isSaving
            ? "bg-zinc-600 text-zinc-300 cursor-not-allowed"
            : "bg-cyan-400 text-black"
        }`}
      >
        {isSaving
          ? "Guardando..."
          : editingProduct
            ? "Guardar cambios"
            : "Guardar producto"}
      </button>
    </form>
  )
}

export default ProductForm