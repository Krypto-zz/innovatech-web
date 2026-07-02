import { useState } from "react"
import { saveSettings } from "../firebase/settingsService"
import { uploadImageToCloudinary } from "../services/cloudinary"

function AdminSettings({ storeConfig, setStoreConfig, setToast }) {
  const [form, setForm] = useState(storeConfig)

  function showToast(message, type = "success") {
    setToast?.({ show: true, message, type })

    setTimeout(() => {
      setToast?.({ show: false, message: "", type: "success" })
    }, 2500)
  }

  function handleChange(e) {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  async function handleFeaturedImage(e) {
  const file = e.target.files[0]

  if (!file) return

  const previewUrl = URL.createObjectURL(file)

  setForm((prev) => ({
    ...prev,
    featuredImage: previewUrl,
  }))

  try {
    const imageUrl = await uploadImageToCloudinary(file)

    setForm((prev) => ({
      ...prev,
      featuredImage: imageUrl,
    }))

    showToast("Imagen destacada subida correctamente.")
  } catch {
    setToast?.({
      show: true,
      message: "Error al subir imagen destacada.",
      type: "error",
    })
  }
}

  async function handleSubmit(e) {
    e.preventDefault()

    await saveSettings(form)
    setStoreConfig(form)
    showToast("Configuración guardada correctamente.")
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black">Configuración</h2>
        <p className="text-zinc-400">
          Personaliza la información principal de la tienda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-[#040812] border border-cyan-900/30 rounded-2xl p-5">
          <h3 className="text-xl font-black mb-4 text-cyan-300">
            Información general
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nombre de la tienda"
              name="storeName"
              value={form.storeName}
              onChange={handleChange}
            />

            <Input
              label="Dirección"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <Input
              label="Horario / atención"
              name="schedule"
              value={form.schedule}
              onChange={handleChange}
            />

            <Input
              label="WhatsApp"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="bg-[#040812] border border-fuchsia-900/30 rounded-2xl p-5">
          <h3 className="text-xl font-black mb-4 text-fuchsia-300">
            Hero principal
          </h3>

          <div className="space-y-4">
            <Input
              label="Texto pequeño superior"
              name="heroBadge"
              value={form.heroBadge}
              onChange={handleChange}
            />

            <Input
              label="Título principal"
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
            />

            <Textarea
              label="Descripción principal"
              name="heroText"
              value={form.heroText}
              onChange={handleChange}
            />

            <Input
              label="Título producto destacado"
              name="featuredTitle"
              value={form.featuredTitle}
              onChange={handleChange}
            />

            <Textarea
              label="Texto producto destacado"
              name="featuredText"
              value={form.featuredText}
              onChange={handleChange}
            />

            <div>
              <label className="text-sm text-zinc-400">
                Imagen producto destacado
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFeaturedImage}
                className="w-full mt-2 bg-[#071225] border border-fuchsia-900/50 rounded-xl px-5 py-3 outline-none focus:border-fuchsia-400"
              />

              {form.featuredImage && (
                <img
                  src={form.featuredImage}
                  alt="Producto destacado"
                  className="mt-4 h-40 w-full object-contain rounded-xl border border-fuchsia-500/30 bg-[#071225]"
                />
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#040812] border border-cyan-900/30 rounded-2xl p-5">
          <h3 className="text-xl font-black mb-4 text-cyan-300">
            Redes sociales
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Instagram"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
            />

            <Input
              label="TikTok"
              name="tiktok"
              value={form.tiktok}
              onChange={handleChange}
            />

            <Input
              label="Facebook"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
            />
            <Textarea
              label="Mensaje WhatsApp general"
              name="whatsappGeneralMessage"
              value={form.whatsappGeneralMessage}
              onChange={handleChange}
            />

            <Textarea
              label="Mensaje WhatsApp producto normal"
              name="whatsappProductMessage"
              value={form.whatsappProductMessage}
              onChange={handleChange}
            />

            <Textarea
              label="Mensaje WhatsApp producto en promoción"
              name="whatsappPromoMessage"
              value={form.whatsappPromoMessage}
              onChange={handleChange}
            />
          </div>
        </section>

        <button className="bg-cyan-400 text-black px-7 py-4 rounded-xl font-black shadow-[0_0_25px_#00eaff66]">
          Guardar configuración
        </button>
      </form>
    </div>
  )
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>

      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full mt-2 bg-[#071225] border border-cyan-900/50 rounded-xl px-5 py-3 outline-none focus:border-cyan-400"
      />
    </div>
  )
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>

      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        rows="4"
        className="w-full mt-2 bg-[#071225] border border-cyan-900/50 rounded-xl px-5 py-3 outline-none focus:border-cyan-400"
      />
    </div>
  )
}

export default AdminSettings