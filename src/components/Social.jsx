function Social({ icon, color, label, href, onClick }) {
  const commonClass =
    "text-center group cursor-pointer"

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={commonClass}
      >
        <div
          className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-3xl shadow-[0_0_20px_#00eaff44] group-hover:scale-110 transition`}
        >
          {icon}
        </div>

        <p className="text-sm mt-2 group-hover:text-cyan-300 transition">
          {label}
        </p>
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={commonClass}
    >
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-3xl shadow-[0_0_20px_#00eaff44] group-hover:scale-110 transition`}
      >
        {icon}
      </div>

      <p className="text-sm mt-2 group-hover:text-cyan-300 transition">
        {label}
      </p>
    </a>
  )
}

export default Social