function DeleteCategoryModal({ category, onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-5">
      <div className="w-full max-w-md bg-[#071225] border border-red-500/40 rounded-3xl p-8 shadow-[0_0_45px_#ff000033]">
        <div className="w-20 h-20 rounded-full bg-red-500/10 mx-auto flex items-center justify-center text-5xl mb-6">
          🗂️
        </div>

        <h2 className="text-3xl font-black text-center">
          Eliminar categoría
        </h2>

        <p className="text-zinc-400 text-center mt-4 leading-relaxed">
          ¿Seguro que deseas eliminar
          <br />

          <span className="text-cyan-300 font-bold">
            {category?.name}
          </span>

          ?
          <br />
          <br />

          Esta acción no se podrá deshacer.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 border border-white/20 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 py-3 rounded-xl font-black hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteCategoryModal