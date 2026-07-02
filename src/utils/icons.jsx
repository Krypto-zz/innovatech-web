import {
  FaBoxOpen,
  FaMouse,
  FaKeyboard,
  FaHeadphones,
  FaLaptop,
} from "react-icons/fa"

import { MdSpeaker, MdLightbulbOutline } from "react-icons/md"

export function getCategoryIcon(categoryName) {
  const icons = {
    Mouses: <FaMouse />,
    Teclados: <FaKeyboard />,
    Audífonos: <FaHeadphones />,
    Parlantes: <MdSpeaker />,
    Lámparas: <MdLightbulbOutline />,
    Accesorios: <FaLaptop />,
    Otros: <FaBoxOpen />,
  }

  return icons[categoryName] || <FaBoxOpen />
}
export function getCategoryColor(categoryName) {
  const colors = {
    Mouses: "text-sky-400",
    Teclados: "text-fuchsia-400",
    Audífonos: "text-purple-400",
    Parlantes: "text-blue-400",
    Lámparas: "text-yellow-400",
    Accesorios: "text-cyan-400",
    Otros: "text-amber-400",
  }

  return colors[categoryName] || "text-cyan-300"
}

export function getProductIcon(product) {
  return getCategoryIcon(product.category)
}

// incorporar temporizador para cada producto de promocion donde se vvea en usuario el tiempo de promo