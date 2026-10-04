import { useState } from 'react'
import Login, { type Role } from './Login'
import Admin from './Admin'
import ClientPortal from './Client'

export default function App() {
  const [role, setRole] = useState<Role | null>(null)
  const out = () => setRole(null)
  return (
    <div className="mx-auto min-h-screen w-full max-w-md overflow-x-clip border-x border-line bg-ink">
      {role === 'admin' ? <Admin onLogout={out} /> : role === 'cliente' ? <ClientPortal onLogout={out} /> : <Login onLogin={setRole} />}
    </div>
  )
}
