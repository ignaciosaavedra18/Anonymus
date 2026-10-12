import { addToCart, cartCount, cartTotal, changeQuantity, clearCart, getCart, removeFromCart } from '../services/cartService'

describe('cartService', () => {
  let memoria
  const teclado = { id: 1, nombre: 'Teclado', precio: 10000 }
  const mouse = { id: 2, nombre: 'Mouse', precio: 5000 }

  beforeEach(() => {
    memoria = {}
    spyOn(localStorage,'getItem').and.callFake((clave) => (clave in memoria ? memoria[clave] : null))
    spyOn(localStorage,'setItem').and.callFake((clave,valor) => { memoria[clave] = String(valor) })
    spyOn(localStorage,'removeItem').and.callFake((clave) => { delete memoria[clave] })
  })

  it('debe devolver un carrito vacío si no hay nada guardado', () => {
    expect(getCart()).toEqual([])
  })

  it('debe agregar un producto nuevo con cantidad 1', () => {
    addToCart(teclado)
    expect(getCart().length).toBe(1)
    expect(getCart()[0].cantidad).toBe(1)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('debe aumentar la cantidad si el producto ya estaba en el carrito', () => {
    addToCart(teclado)
    addToCart(teclado)
    expect(getCart().length).toBe(1)
    expect(getCart()[0].cantidad).toBe(2)
  })

  it('debe calcular el total sumando precio por cantidad', () => {
    addToCart(teclado)
    addToCart(teclado)
    addToCart(mouse)
    expect(cartTotal()).toBe(25000)
    expect(cartCount()).toBe(3)
  })

  it('debe quitar el producto cuando la cantidad llega a cero', () => {
    addToCart(mouse)
    changeQuantity(2, -1)
    expect(getCart().length).toBe(0)
  })

  it('debe eliminar un producto y limpiar el carrito', () => {
    addToCart(teclado)
    addToCart(mouse)
    removeFromCart(1)
    expect(getCart().length).toBe(1)
    clearCart()
    expect(getCart()).toEqual([])
  })
})