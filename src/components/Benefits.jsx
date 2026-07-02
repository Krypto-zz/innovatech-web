import { FaTruck, FaBolt, FaFire, FaWhatsapp } from "react-icons/fa"

function Benefits() {
    const items = [
        [<FaTruck />, "Entregas en La Paz y envíos a nivel nacional", "Coordinamos la entrega contigo."],
        [<FaBolt />, "Productos seleccionados", "Tecnología y accesorios de calidad."],
        [<FaFire />, "Promociones constantes", "Ofertas y descuentos especiales."],
        [<FaWhatsapp />, "Compra por WhatsApp", "Habla directamente con nosotros."],
    ]
        return (
    <section className="grid md:grid-cols-4 gap-5 mb-6">
        {items.map((item, index) => (
        <div key={index} className="border border-cyan-500/30 bg-[#071225]/80 rounded-2xl p-6">
            <div className="text-5xl text-cyan-300 mb-4 drop-shadow-[0_0_12px_#00eaff]">{item[0]}</div>
            <h4 className="font-black">{item[1]}</h4>
            <p className="text-zinc-400 mt-2">{item[2]}</p>
        </div>
        ))}
    </section>
    )
}


export default Benefits