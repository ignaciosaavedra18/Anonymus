const CART_KEY = 'tecnoShopCart'

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(product) {
  const cart = getCart()
  const existing = cart.find((item) => Number(item.id) === Number(product.id))
  if (existing) {
    existing.cantidad += 1
  } else {
    cart.push({ ...product, cantidad: 1 })
  }
  saveCart(cart)
  return cart
}

export function changeQuantity(id, delta) {
  const cart = getCart()
  const item = cart.find((product) => Number(product.id) === Number(id))
  if (!item) return cart
  item.cantidad += delta
  const filtered = cart.filter((product) => product.cantidad > 0)
  saveCart(filtered)
  return filtered
}

export function removeFromCart(id) {
  const cart = getCart().filter((product) => Number(product.id) !== Number(id))
  saveCart(cart)
  return cart
}

export function clearCart() {
  localStorage.removeItem(CART_KEY)
}

export function cartTotal(cart = getCart()) {
  return cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
}

export function cartCount(cart = getCart()) {
  return cart.reduce((sum, item) => sum + item.cantidad, 0)
}
