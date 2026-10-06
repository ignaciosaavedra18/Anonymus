import { productosIniciales } from '../data/productos'

const CATALOGO_KEY = 'Catalago'

function readExtraProducts() {
  try {
    return JSON.parse(localStorage.getItem(CATALOGO_KEY)) || []
  } catch {
    return []
  }
}

function writeExtraProducts(products) {
  localStorage.setItem(CATALOGO_KEY, JSON.stringify(products))
}

export function getProducts() {
  return [...productosIniciales, ...readExtraProducts()]
}

export function getProductById(id) {
  return getProducts().find((product) => Number(product.id) === Number(id))
}

export function createProduct(product) {
  const extra = readExtraProducts()
  const nextId = Math.max(0, ...getProducts().map((item) => Number(item.id) || 0)) + 1
  const newProduct = {
    id: nextId,
    nombre: product.nombre,
    categoria: product.categoria,
    precio: Number(product.precio),
    img: product.img || '/images/LogoTienda.jpg',
    oferta: Boolean(product.oferta),
    precioAnterior: product.oferta ? Number(product.precioAnterior || product.precio) : undefined
  }
  extra.push(newProduct)
  writeExtraProducts(extra)
  return newProduct
}

export function updateProduct(updatedProduct) {
  const extra = readExtraProducts()
  const index = extra.findIndex((product) => Number(product.id) === Number(updatedProduct.id))
  if (index === -1) return null

  const cleanProduct = {
    ...extra[index],
    ...updatedProduct,
    precio: Number(updatedProduct.precio)
  }
  extra[index] = cleanProduct
  writeExtraProducts(extra)
  return cleanProduct
}

export function deleteProduct(id) {
  const extra = readExtraProducts()
  const filtered = extra.filter((product) => Number(product.id) !== Number(id))
  writeExtraProducts(filtered)
  return filtered.length !== extra.length
}

export function resetExtraProducts() {
  localStorage.removeItem(CATALOGO_KEY)
}
