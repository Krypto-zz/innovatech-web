import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaArrowLeft, FaFire, FaWhatsapp } from "react-icons/fa"
import { getProductIcon } from "../utils/icons"

import Layout from "../components/Layout"
import { openWhatsapp } from "../utils/whatsapp"

function ProductDetail({ productsData, storeConfig }) {
    const { slug } = useParams()
    const product = productsData.find((p) => p.slug === slug)
    const productIcon = product ? getProductIcon(product) : null
    const productImages = product?.images?.length
  ? product.images
  : product?.image
    ? [product.image]
    : []

const [selectedImage, setSelectedImage] = useState(productImages[0] || "")

    const [selectedColor, setSelectedColor] = useState(
      product?.colors?.[0] || ""
    )
    
    if (!product) {
      return (
        <Layout>
          <div className="py-20">
            <h2 className="text-4xl font-black">Producto no encontrado</h2>
            <Link to="/" className="text-cyan-300 mt-5 inline-block">
              Volver al inicio
            </Link>
          </div>
        </Layout>
      )
    }
    
    if (product && product.stock <= 0) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h2 className="text-4xl font-black text-red-400">
            Producto agotado
          </h2>

          <p className="text-zinc-400 mt-4">
            Este producto ya no está disponible actualmente.
          </p>

          <Link to="/" className="text-cyan-300 mt-6 inline-block font-bold">
            Volver al catálogo
          </Link>
        </div>
      </Layout>
    )
  }
  
    return (
      <Layout>
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-300 font-bold mb-8">
          <FaArrowLeft />
          Volver al catálogo
        </Link>
  
        <section className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="rounded-3xl border border-fuchsia-500/40 bg-[#071225] p-6 shadow-[0_0_40px_#ff00cc33]">
            <div className="h-[420px] rounded-3xl bg-[radial-gradient(circle,#00eaff22,transparent_45%),linear-gradient(135deg,#08111f,#190d2e)] flex items-center justify-center text-[170px] text-cyan-300">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain rounded-3xl"
            />
          ) : (
            productIcon
          )}
            </div>
  
            <div className="flex gap-4 mt-5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-[#040812]">
{productImages.length > 0 ? (
  productImages.map((image, index) => (
    <button
      key={index}
      onClick={() => setSelectedImage(image)}
      className={`min-w-32 h-28 rounded-2xl border bg-[#0b1022] overflow-hidden transition ${
        selectedImage === image
          ? "border-cyan-400 shadow-[0_0_20px_#00eaff66]"
          : "border-cyan-400/30"
      }`}
    >
      <img
        src={image}
        alt={`${product.name} ${index + 1}`}
        className="w-full h-full object-contain"
      />
    </button>
  ))
) : (
  [1, 2, 3].map((item) => (
    <div
      key={item}
      className="min-w-32 h-28 rounded-2xl border border-cyan-400/30 bg-[#0b1022] flex items-center justify-center text-5xl text-cyan-300"
    >
      {productIcon}
    </div>
  ))
)}
            </div>
          </div>
  
          <div className="rounded-3xl border border-cyan-500/30 bg-[#071225]/80 p-8">
            {product.promo && (
              <span className="inline-flex items-center gap-2 bg-fuchsia-600 px-4 py-2 rounded-lg text-sm font-black mb-5">
                <FaFire />
                EN PROMOCIÓN
              </span>
            )}
  
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              {product.name}
            </h2>
  
            <p className="text-cyan-300 text-xl font-bold mb-6">
              {product.category}
            </p>
  
            <p className="text-zinc-300 text-lg leading-relaxed mb-7">
              {product.description}
            </p>
  
            <div className="mb-7">
              {product.promo ? (
                <>
                  <p className="text-zinc-500 line-through text-xl">
                    Precio regular: {product.price} Bs
                  </p>
                  <p className="text-5xl font-black text-cyan-300">
                    {product.promo} Bs
                  </p>
                </>
              ) : (
                <p className="text-5xl font-black text-cyan-300">
                  {product.price} Bs
                </p>
              )}
            </div>
  
            <div className="mb-7">
              <h3 className="font-black mb-3">Colores disponibles</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border transition ${
                      selectedColor === color
                        ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                        : "border-white/20 bg-white/5 text-zinc-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}  
              </div>
              </div>
  
            <div className="mb-8">
              <h3 className="font-black mb-3">Características</h3>
              <ul className="space-y-2 text-zinc-300">
                {product.features.map((feature) => (
                  <li key={feature}>✅ {feature}</li>
                ))}
              </ul>
            </div>
  
            <button
                onClick={() => openWhatsapp(product, selectedColor, storeConfig)}
                className="w-full flex items-center justify-center gap-3 bg-green-500 px-8 py-4 rounded-xl text-xl font-black shadow-[0_0_25px_#22c55e66]"
            >
                <FaWhatsapp />
                Pedir por WhatsApp
  </button>
          </div>
        </section>
      </Layout>
    )
}

export default ProductDetail