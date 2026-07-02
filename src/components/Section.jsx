function Section({ id, title, icon, children }) {
    return (
    <section 
        id={id}
        className="mb-8 scroll-mt-24"
    >
        <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-black flex items-center gap-3">
            {icon}
            {title}
        </h3>

        <p className="text-cyan-300 font-bold">Ver todos →</p>
        </div>

        {children}
    </section>
    )
}

export default Section  