function Toast({ show, message, type = "success" }) {
  if (!show) return null

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] px-6 py-4 rounded-2xl shadow-2xl text-white font-bold transition-all
      ${
        type === "success"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {message}
    </div>
  )
}

export default Toast