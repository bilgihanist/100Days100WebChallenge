import { Link } from "react-router-dom"


const LinkPage = () => {
  return (
    <section>
      <h1>Linkler</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <Link to ="/editor">Editor sayfası</Link>
      <Link to="/admin"> Admin sayfası</Link>
    </section>
  )
}

export default LinkPage