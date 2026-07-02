function AdminCard({ title, value }) {
    return (
    <div className="bg-[#071225] border border-cyan-500/20 rounded-2xl p-5">
        <p className="text-zinc-400">{title}</p>
        <h3 className="text-4xl font-black text-cyan-300 mt-2">{value}</h3>
    </div>
    )
}

export default AdminCard