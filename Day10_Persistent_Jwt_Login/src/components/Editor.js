import { Link } from 'react-router-dom'


const Editor = () => {
  return (
    <section>
      <h1>Editor Sayfası</h1>
      <br />
      <p> Editor Rolündesin aga</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Editor