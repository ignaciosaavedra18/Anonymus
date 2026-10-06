import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  return (
    <div className="productos-grid">
      {products.length === 0 ? (
        <div className="alert alert-secondary">No se encontraron productos con esos filtros.</div>
      ) : products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductGrid
