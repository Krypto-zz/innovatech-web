# InnovaTech Web

Una tienda online desarrollada con **React**, **Firebase** y **Cloudinary**, enfocada en la venta de accesorios gamer y productos tecnológicos.

El proyecto cuenta con un panel de administración privado para gestionar productos, categorías, promociones y configuración general de la tienda en tiempo real.

---

## Capturas

> <img width="1221" height="630" alt="Captura de pantalla 2026-07-02 013410" src="https://github.com/user-attachments/assets/a257bd2d-5f24-4759-8650-6cc2bb20f6e8" />
> <img width="1230" height="619" alt="image" src="https://github.com/user-attachments/assets/52d09f4c-eb3a-4b9c-8f02-0eb4746c4960" />
> <img width="1184" height="617" alt="image" src="https://github.com/user-attachments/assets/3658361f-e528-4a60-857d-c05362e1860b" />




---

## Demo

**Sitio web:** *https://innovatech-web-wine.vercel.app/*

---

## Características

### Tienda

- Catálogo dinámico de productos
- Buscador con sugerencias
- Categorías dinámicas
- Promociones
- Producto destacado
- Galería de imágenes
- Detalle individual de producto
- Integración con WhatsApp
- Redes sociales configurables
- Diseño responsive

### Panel de administración

- Login con Firebase Authentication
- CRUD de productos
- CRUD de categorías
- Gestión de promociones
- Configuración de la tienda
- Mensajes de WhatsApp configurables
- Subida de imágenes a Cloudinary
- Confirmación antes de eliminar registros
- Notificaciones (Toasts)

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- React Icons

### Backend

- Firebase Firestore
- Firebase Authentication
- Firebase Security Rules

### Almacenamiento

- Cloudinary

### Herramientas

- Git
- GitHub
- Vercel

---

## Base de datos

### Colección **products**

Cada producto almacena:

- Nombre
- Slug
- Categoría
- Descripción
- Precio
- Precio de promoción
- Stock
- Colores
- Características
- Imagen principal
- Galería de imágenes

### Colección **categories**

- Nombre
- Icono
- Color

### Colección **settings**

Configuración completa de la tienda:

- Hero principal
- Producto destacado
- Imagen destacada
- Dirección
- Horarios
- WhatsApp
- Instagram
- Facebook
- TikTok
- Mensajes de WhatsApp personalizados

---

## Seguridad

La aplicación utiliza Firebase Authentication para proteger el panel administrativo.

Las reglas de Firestore permiten:

- Lectura pública de la tienda.
- Escritura únicamente a administradores autenticados.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Krypto-zz/innovatech-web.git
```

Entrar al proyecto:

```bash
cd innovatech-web
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` con las variables de entorno correspondientes.

Ejecutar:

```bash
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

---

## Estado del proyecto

Finalizado

Actualmente el proyecto se encuentra funcional e integrado con Firebase y Cloudinary.

---

## Autor

**Miguel Sebastián Mendoza Choquehuanca**

- GitHub: https://github.com/Krypto-zz/
- LinkedIn: https://www.linkedin.com/in/miguel-mendoza-dev/
