import { createProduct, deleteProduct, getProducts, getProductById, resetExtraProducts, updateProduct } from '../services/productService'

describe('ProductoService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    resetExtraProducts()
  })

  it('debe cargar el catálogo inicial', () => {
    expect(getProducts().length).toBeGreaterThan(0)
  })

  it('debe crear un producto nuevo', () => {
    const product = createProduct({ nombre: 'Producto de prueba', categoria: 'perifericos', precio: 10000 })
    expect(getProductById(product.id).nombre).toBe('Producto de prueba')
  })

  it('debe actualizar un producto creado', () => {
    const product = createProduct({ nombre: 'Producto de prueba', categoria: 'perifericos', precio: 10000 })
    updateProduct({ ...product, nombre: 'Producto actualizado', precio: 12000 })
    expect(getProductById(product.id).nombre).toBe('Producto actualizado')
    expect(getProductById(product.id).precio).toBe(12000)
  })

  it('debe eliminar un producto creado', () => {
    const product = createProduct({ nombre: 'Producto de prueba', categoria: 'perifericos', precio: 10000 })
    expect(deleteProduct(product.id)).toBeTrue()
    expect(getProductById(product.id)).toBeUndefined()
  })
})
