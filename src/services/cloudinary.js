const CLOUD_NAME = "du3olccdr"
const UPLOAD_PRESET = "innovatech"

export async function uploadImageToCloudinary(file) {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  formData.append("folder", "innovatech/products")

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error("Error al subir imagen a Cloudinary")
  }

  const data = await response.json()

  return data.secure_url
}

export async function uploadImagesToCloudinary(files) {
  const uploads = files.map((file) => uploadImageToCloudinary(file))

  return Promise.all(uploads)
}