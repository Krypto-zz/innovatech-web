export function scrollToSection(id) {
const section = document.getElementById(id)

if (section) {
    section.scrollIntoView({
    behavior: "smooth",
    block: "start",
    })
}
}

export function goToSection(id) {
if (window.location.pathname !== "/") {
    window.location.href = `/#${id}`
    return
}

scrollToSection(id)
}