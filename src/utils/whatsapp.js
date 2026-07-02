export const WHATSAPP_NUMBER = "59175812261"

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/innovatech.lap",
  tiktok: "https://www.tiktok.com/@innovatech.lap",
  facebook: "https://www.facebook.com/innovatech.bol",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
}

function replaceWhatsappVariables(template, product = {}, color = "") {
  return template
    .replaceAll("{productName}", product.name || "")
    .replaceAll("{color}", color || "")
    .replaceAll("{price}", product.price || "")
    .replaceAll("{promo}", product.promo || "")
}

export function getWhatsappMessage(product, color, storeConfig) {
  const normalTemplate =
    storeConfig?.whatsappProductMessage ||
    `Hola, InnovaTech.

Estoy interesado en este producto:

{productName}

Color: {color}

Precio: {price} Bs

Me gustaría recibir más información y coordinar la entrega.`

  const promoTemplate =
    storeConfig?.whatsappPromoMessage ||
    `Hola, InnovaTech.

Estoy interesado en este producto en promoción:

{productName}

Color: {color}

Precio regular: {price} Bs
Precio promoción: {promo} Bs

Me gustaría recibir más información y coordinar la entrega.`

  const template = product.promo ? promoTemplate : normalTemplate

  return replaceWhatsappVariables(template, product, color)
}

export function openWhatsapp(product, color, storeConfig) {
  const number = storeConfig?.whatsapp || WHATSAPP_NUMBER
  const message = encodeURIComponent(
    getWhatsappMessage(product, color, storeConfig)
  )

  window.open(`https://wa.me/${number}?text=${message}`, "_blank")
}

export function openGeneralWhatsapp(storeConfig) {
  const number = storeConfig?.whatsapp || WHATSAPP_NUMBER

  const message = encodeURIComponent(
    storeConfig?.whatsappGeneralMessage ||
      `Hola, InnovaTech.

Tengo una consulta sobre sus productos.

Me gustaría recibir más información y ayuda para elegir el producto adecuado.`
  )

  window.open(`https://wa.me/${number}?text=${message}`, "_blank")
}