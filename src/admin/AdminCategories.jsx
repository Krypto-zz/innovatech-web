import { useState } from "react"
import { FaBoxOpen, FaMouse, FaKeyboard, FaHeadphones, FaLaptop } from "react-icons/fa"
import { MdSpeaker, MdLightbulbOutline } from "react-icons/md"
import DeleteCategoryModal from "./DeleteCategoryModal"

import {
  addCategory,
  updateCategory,
  deleteCategory as deleteCategoryFirebase,
} from "../firebase/categoriesService"

const ICON_OPTIONS = {
  Mouses: <FaMouse />,
  Teclados: <FaKeyboard />,
  Audífonos: <FaHeadphones />,
  Parlantes: <MdSpeaker />,
  Lámparas: <MdLightbulbOutline />,
  Accesorios: <FaLaptop />,
  Otros: <FaBoxOpen />,
}

function AdminCategories({ categoriesData, setCategoriesData, setToast }) {
  const [name, setName] = useState("")
  const [editingName, setEditingName] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  function showToast(message, type = "success") {
    setToast?.({ show: true, message, type })

    setTimeout(() => {
      setToast?.({ show: false, message: "", type: "success" })
    }, 2500)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const cleanName = name.trim()

    if (!cleanName) {
      showToast("El nombre de la categoría es obligatorio.", "error")
      return
    }

    const exists = categoriesData.some(
      (cat) =>
        cat.name.toLowerCase() === cleanName.toLowerCase() &&
        cat.name !== editingName
    )

    if (exists) {
      showToast("Ya existe una categoría con ese nombre.", "error")
      return
    }

    const newCategory = {
      name: cleanName,
      iconName: cleanName,
      color: "text-cyan-300",
    }

    if (editingName) {
      const categoryToEdit = categoriesData.find(
        (cat) => cat.name === editingName
      )

      if (categoryToEdit?.firebaseId) {
        await updateCategory(categoryToEdit.firebaseId, newCategory)
      } else {
        setCategoriesData(
          categoriesData.map((cat) =>
            cat.name === editingName ? newCategory : cat
          )
        )
      }

      showToast("Categoría actualizada correctamente.")
    } else {
      await addCategory(newCategory)
      showToast("Categoría creada correctamente.")
    }

    setName("")
    setEditingName(null)
  }

  function editCategory(category) {
    setName(category.name)
    setEditingName(category.name)
  }

    async function deleteCategory(category) {
      if (category.firebaseId) {
        await deleteCategoryFirebase(category.firebaseId)
      } else {
        setCategoriesData(
          categoriesData.filter((cat) => cat.name !== category.name)
        )
      }

      showToast("Categoría eliminada correctamente.")
      setDeleteModal(false)
      setCategoryToDelete(null)
    }
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black">Categorías</h2>
        <p className="text-zinc-400">
          Administra las categorías disponibles para tus productos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#040812] border border-cyan-900/30 rounded-2xl p-5 mb-6">
        <label className="text-sm text-zinc-400">Nombre de categoría</label>

        <div className="flex gap-3 mt-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Monitores"
            className="flex-1 bg-[#071225] border border-cyan-900/50 rounded-xl px-5 py-3 outline-none focus:border-cyan-400"
          />

          <button className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-black">
            {editingName ? "Guardar" : "+ Crear"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {categoriesData.map((category) => (
          <div
            key={category.name}
            className="bg-[#040812] border border-cyan-900/30 rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`text-4xl ${category.color}`}>
                {ICON_OPTIONS[category.iconName] || ICON_OPTIONS[category.name] || <FaBoxOpen />}
              </div>

              <div>
                <h3 className="font-black text-xl">{category.name}</h3>
                <p className="text-zinc-500">Categoría de productos</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editCategory(category)}
                className="border border-cyan-400 text-cyan-300 px-3 py-2 rounded-lg"
              >
                Editar
              </button>

              <button
                onClick={() => {
                    setCategoryToDelete(category)
                    setDeleteModal(true)
                  }}
                className="border border-red-500 text-red-400 px-3 py-2 rounded-lg"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
        {deleteModal && (
  <DeleteCategoryModal
    category={categoryToDelete}
    onCancel={() => {
      setDeleteModal(false)
      setCategoryToDelete(null)
    }}
    onDelete={() => deleteCategory(categoryToDelete)}
  />
)}
      </div>
    </div>
  )
}

export default AdminCategories