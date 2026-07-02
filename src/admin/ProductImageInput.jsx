function ProductImageInput({ images, setImages, imageFiles, setImageFiles }) {
  function handleImageChange(e) {
    const files = Array.from(e.target.files)

    if (!files.length) return

    const previewImages = files.map((file) => URL.createObjectURL(file))

    setImages([...images, ...previewImages])
    setImageFiles([...imageFiles, ...files])
  }

  function removeImage(indexToRemove) {
    setImages(images.filter((_, index) => index !== indexToRemove))
    setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div>
      <label className="text-sm text-zinc-400">Imágenes del producto</label>

      <label className="mt-2 h-44 border border-dashed border-cyan-500/50 rounded-2xl bg-[#040812] flex items-center justify-center cursor-pointer overflow-hidden hover:border-cyan-400 transition">
        <div className="text-center">
          <p className="text-5xl mb-3">📷</p>
          <p className="font-bold text-cyan-300">Seleccionar imágenes</p>
          <p className="text-zinc-500 text-sm">
            Puedes subir varias imágenes
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-24 rounded-xl border border-cyan-500/30 overflow-hidden bg-[#040812]"
            >
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-lg"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageInput