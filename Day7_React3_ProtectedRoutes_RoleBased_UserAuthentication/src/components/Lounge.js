import { Link } from "react-router-dom"


const Lounge = () => {
  return (
    <section>
      <h1>Lounge Sayfası</h1>
      <br />
      <p>Admin ve editorler buradalar</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Lounge