import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Layout from './components/Layout'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Missing from './components/Missing'
import Unauthorized from './components/Unauthorized'
import Lounge from './components/Lounge'
import RequireAuth from './components/RequireAuth'
import LinkPage from './components/LinkPage'
import PersistLogin from './components/PersistLogin'
import { Routes, Route } from 'react-router-dom'

const ROLES = {
  User: 1001,
  Store: 2002,
  Admin: 3003,
  SuperAdmin: 4004,
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes*/}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Private routes /  we want to protect these routes  */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Store]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Store, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
