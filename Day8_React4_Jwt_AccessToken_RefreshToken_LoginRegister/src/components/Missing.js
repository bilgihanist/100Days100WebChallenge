import { Link } from "react-router-dom"


const Missing = () => {
  return (
    <article>
      <h1>Ooops</h1>
      <p>404 - Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit our page</Link>
         </div>
    </article>
  )
}

export default Missing