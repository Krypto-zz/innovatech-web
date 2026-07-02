import { useState } from "react"
import ProductDrawer from "./ProductDrawer"
import { Link } from "react-router-dom"
import { getProductIcon } from "../utils/icons"
import AdminPromotions from "./AdminPromotions"
import AdminCategories from "./AdminCategories"
import { logoutAdmin } from "../firebase/authService"

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../firebase/productsService"

import AdminSettings from "./AdminSettings"
import AdminCard from "./AdminCard"
import ProductStatus from "./ProductStatus"
import DeleteProductModal from "./DeleteProductModal"

function AdminPanel({
  productsData,
  setProductsData,
  categoriesData,
  setCategoriesData,
  storeConfig,
  setStoreConfig,
  setToast,
  adminUser,
}) {
  const [activeTab, setActiveTab] = useState("productos")
  const [adminSearch, setAdminSearch] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [productDrawer, setProductDrawer] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const outOfStock = productsData.filter((p) => p.stock === 0).length

  const adminFilteredProducts = productsData.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(adminSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#010204] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-5 border-b border-white/10 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-cyan-300">
              Panel Admin
            </h1>

            <p className="text-zinc-400">
              Aqui vas a gestionar nuestros productos weeey, promociones y categorías de InnovaTech.
            </p>

            <p className="text-zinc-500 text-sm mt-2">
              Conectado como:{" "}
              <span className="text-cyan-300 font-bold">
                {adminUser?.email}
              </span>
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={logoutAdmin}
              className="border border-red-500 text-red-400 px-5 py-3 rounded-xl hover:bg-red-500/10 transition"
            >
              Cerrar sesión
            </button>

            <Link
              to="/"
              className="border border-cyan-400 px-5 py-3 rounded-xl text-cyan-300 hover:bg-cyan-400/10 transition"
            >
              Ver tienda
            </Link>
          </div>
        </header>

        <section className="grid md:grid-cols-4 gap-5 mb-8">
          <AdminCard title="Productos" value={productsData.length} />
          <AdminCard
            title="Promociones"
            value={productsData.filter((p) => p.promo).length}
          />
          <AdminCard title="Categorías" value={categoriesData.length} />
          <AdminCard title="Sin stock" value={outOfStock} />
        </section>

        <section className="grid md:grid-cols-[260px_1fr] gap-6">
          <aside className="bg-[#071225] border border-white/10 rounded-2xl p-5 h-fit">
            <button
              onClick={() => setActiveTab("productos")}
              className={`w-full text-left p-3 rounded-xl font-bold mb-3 ${
                activeTab === "productos"
                  ? "bg-cyan-400 text-black"
                  : "hover:bg-white/10"
              }`}
            >
              📦 Productos
            </button>

            <button
              onClick={() => setActiveTab("promociones")}
              className={`w-full text-left p-3 rounded-xl mb-3 ${
                activeTab === "promociones"
                  ? "bg-cyan-400 text-black font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              🔥 Promociones
            </button>

            <button
              onClick={() => setActiveTab("categorias")}
              className={`w-full text-left p-3 rounded-xl mb-3 ${
                activeTab === "categorias"
                  ? "bg-cyan-400 text-black font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              📂 Categorías
            </button>

            <button
              onClick={() => setActiveTab("configuracion")}
              className={`w-full text-left p-3 rounded-xl ${
                activeTab === "configuracion"
                  ? "bg-cyan-400 text-black font-bold"
                  : "hover:bg-white/10"
              }`}
            >
              ⚙️ Configuración
            </button>
          </aside>

          <main className="bg-[#071225] border border-white/10 rounded-2xl p-6">
            {activeTab === "productos" && (
              <>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-black">Productos</h2>
                    <p className="text-zinc-400">
                      Administra el catálogo visible en la tienda.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingProduct(null)
                      setProductDrawer(true)
                    }}
                    className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-black"
                  >
                    + Agregar producto
                  </button>
                </div>

                <input
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Buscar producto..."
                  className="w-full mb-5 bg-[#040812] border border-cyan-900/50 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead className="text-zinc-400 text-sm">
                      <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th className="text-right">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {adminFilteredProducts.map((product) => (
                        <tr key={product.firebaseId || product.slug} className="bg-[#040812]">
                          <td className="p-4 rounded-l-xl">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-[#0b1022] border border-cyan-900/40 flex items-center justify-center text-3xl text-cyan-300 overflow-hidden">
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
                                <p className="text-sm text-zinc-500">
                                  /producto/{product.slug}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 text-zinc-300">
                            {product.category}
                          </td>

                          <td className="p-4">
                            <span className="font-black">{product.stock}</span>
                          </td>

                          <td className="p-4">
                            {product.promo ? (
                              <div>
                                <p className="text-zinc-500 line-through text-sm">
                                  {product.price} Bs
                                </p>
                                <p className="text-cyan-300 font-black">
                                  {product.promo} Bs
                                </p>
                              </div>
                            ) : (
                              <p className="font-black">{product.price} Bs</p>
                            )}
                          </td>

                          <td className="p-4">
                            <ProductStatus stock={product.stock} />
                          </td>

                          <td className="p-4 rounded-r-xl">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product)
                                  setProductDrawer(true)
                                }}
                                className="border border-cyan-400 text-cyan-300 px-3 py-2 rounded-lg"
                              >
                                Editar
                              </button>

                              <button
                                onClick={() => {
                                  setProductToDelete(product)
                                  setDeleteModal(true)
                                }}
                                className="border border-red-500 text-red-400 px-3 py-2 rounded-lg"
                              >
                                Borrar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === "promociones" && (
              <AdminPromotions
                productsData={productsData}
                setProductsData={setProductsData}
                setToast={setToast}
              />
            )}

            {activeTab === "categorias" && (
              <AdminCategories
                categoriesData={categoriesData}
                setCategoriesData={setCategoriesData}
                setToast={setToast}
              />
            )}

            {activeTab === "configuracion" && (
              <AdminSettings
                storeConfig={storeConfig}
                setStoreConfig={setStoreConfig}
                setToast={setToast}
              />
            )}
          </main>
        </section>

        {deleteModal && (
          <DeleteProductModal
            product={productToDelete}
            onCancel={() => {
              setDeleteModal(false)
              setProductToDelete(null)
            }}
            onDelete={async () => {
              if (productToDelete.firebaseId) {
                await deleteProduct(productToDelete.firebaseId)
              } else {
                setProductsData(
                  productsData.filter(
                    (p) => p.slug !== productToDelete.slug
                  )
                )
              }

              setToast?.({
                show: true,
                message: "Producto eliminado correctamente.",
                type: "success",
              })

              setTimeout(() => {
                setToast?.({ show: false, message: "", type: "success" })
              }, 2500)

              setDeleteModal(false)
              setProductToDelete(null)
            }}
          />
        )}

        <ProductDrawer
          isOpen={productDrawer}
          onClose={() => {
            setProductDrawer(false)
            setEditingProduct(null)
          }}
          editingProduct={editingProduct}
          productsData={productsData}
          categoriesData={categoriesData}
          setToast={setToast}
          onSave={async (savedProduct) => {
            if (editingProduct) {
              if (editingProduct.firebaseId) {
                await updateProduct(editingProduct.firebaseId, savedProduct)
              } else {
                setProductsData(
                  productsData.map((p) =>
                    p.slug === editingProduct.slug ? savedProduct : p
                  )
                )
              }

              setToast?.({
                show: true,
                message: "Producto actualizado correctamente.",
                type: "success",
              })
            } else {
              await addProduct(savedProduct)

              setToast?.({
                show: true,
                message: "Producto agregado correctamente.",
                type: "success",
              })
            }

            setTimeout(() => {
              setToast?.({ show: false, message: "", type: "success" })
            }, 2500)

            setEditingProduct(null)
          }}
        />
      </div>
    </div>
  )
}

export default AdminPanel