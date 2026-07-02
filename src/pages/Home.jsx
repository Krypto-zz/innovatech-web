import { useState } from "react"
import { FaFire, FaShoppingCart } from "react-icons/fa"

import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Benefits from "../components/Benefits"
import SearchBar from "../components/SearchBar"
import Categories from "../components/Categories"
import Section from "../components/Section"
import ProductGrid from "../components/ProductGrid"
import WhatsappBanner from "../components/WhatsappBanner"


function Home({ productsData, categoriesData, storeConfig }) {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("Todos")

    const availableProducts = productsData.filter((product) => product.stock > 0)

    const filteredProducts = availableProducts.filter((product) => {
        const matchesSearch = `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(search.toLowerCase())

        const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const filteredPromos = filteredProducts.filter((p) => p.promo)

    return (
        <Layout storeConfig={storeConfig} productsData={productsData}>
        <Hero storeConfig={storeConfig} productsData={productsData} />
        <Benefits />

            <SearchBar
    search={search}
    setSearch={setSearch}
    productsData={productsData}
    />

    <Categories
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
    categoriesData={categoriesData}
    />

        {filteredPromos.length > 0 && (
            <Section id="promociones" title="Promociones por tiempo limitado" icon={<FaFire className="text-orange-400" />}>
            <ProductGrid products={filteredPromos} />
            </Section>
        )}

        <Section
            id="productos"
            title={
            selectedCategory === "Todos"
                ? "Todos los productos"
                : `${selectedCategory}`
            }
            icon={
            selectedCategory === "Todos"
                ? <FaShoppingCart className="text-cyan-300" />
                : categoriesData.find(c => c.name === selectedCategory)?.icon || <FaShoppingCart className="text-cyan-300" />
            }
        >
            <ProductGrid products={filteredProducts} />
        </Section>

        <WhatsappBanner storeConfig={storeConfig} />
        </Layout>
    )
}

export default Home
