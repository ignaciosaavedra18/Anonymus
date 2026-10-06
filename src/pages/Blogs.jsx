import { Link } from 'react-router-dom'

const blogs = [
  { id: 1, title: 'Cómo elegir un mouse gamer', text: 'Aspectos básicos para escoger un mouse según el uso.', image: '/images/Logitech.jpg' },
  { id: 2, title: 'Monitor para jugar', text: 'Revisa frecuencia, resolución y tiempo de respuesta.', image: '/images/Monitor LG 27 pulgadas, Panel IPS, 144Hz 1ms.jpg' },
  { id: 3, title: 'Procesadores para tu PC', text: 'Una guía sencilla para comparar distintas alternativas.', image: '/images/RTX.png' }
]

function Blogs() {
  return (
    <section className="blogs-page">
      <div className="section-title-bar" style={{ borderColor: 'var(--border-color)' }}><h2>Blogs</h2></div>
      <div className="d-grid gap-4">
        {blogs.map((blog) => (
          <article className="product-card blog-card" key={blog.id}>
            <div><span className="product-category">TecnoShop</span><h3>{blog.title}</h3><p>{blog.text}</p><Link to={`/blogs/${blog.id}`} className="btn btn-outline-primary">Leer más</Link></div>
            <div className="blog-img-box"><img src={blog.image} alt={blog.title} /></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Blogs
