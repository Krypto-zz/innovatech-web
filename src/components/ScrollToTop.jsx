import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToTop() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
    if (hash) {
        setTimeout(() => {
        const section = document.getElementById(hash.replace("#", ""))

        if (section) {
            section.scrollIntoView({
            behavior: "smooth",
            block: "start",
            })
        }
        }, 100)

        return
    }

    window.scrollTo(0, 0)
    }, [pathname, hash])

    return null
}

export default ScrollToTop