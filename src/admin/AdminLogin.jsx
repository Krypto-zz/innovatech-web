import { useState } from "react"
import { FaLock } from "react-icons/fa"

import { loginAdmin } from "../firebase/authService"

function AdminLogin({ setToast }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await loginAdmin(email, password)
    } catch {
      setToast?.({
        show: true,
        message: "Correo o contraseña incorrectos.",
        type: "error",
      })

      setTimeout(() => {
        setToast?.({ show: false, message: "", type: "success" })
      }, 2500)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#071225] border border-cyan-500/30 rounded-3xl p-8 shadow-[0_0_45px_#00eaff33]"
      >
        <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-cyan-400/40 shadow-[0_0_25px_#00eaff66]">
            <img
            src="/logo.jpg"
            alt="InnovaTech"
            className="w-full h-full object-cover"
            />
        </div>

        <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-cyan-400 text-black flex items-center justify-center border-4 border-[#071225] shadow-[0_0_18px_#00eaffaa]">
            <FaLock className="text-sm" />
        </div>
        </div>

        <h1 className="text-4xl font-black text-center">
          Administradores InnovaTech
        </h1>

        <p className="text-zinc-400 text-center mt-3 mb-8">
          Ingresa con tu cuenta autorizada OJOOOO.
        </p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 bg-[#040812] border border-cyan-900/50 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 bg-[#040812] border border-cyan-900/50 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <button
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-black ${
            isLoading
              ? "bg-zinc-600 text-zinc-300"
              : "bg-cyan-400 text-black shadow-[0_0_25px_#00eaff66]"
          }`}
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin