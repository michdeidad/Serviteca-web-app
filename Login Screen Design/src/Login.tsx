import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { Brand, Card, Field, PrimaryButton } from './ui'

export type Role = 'admin' | 'cliente'

const ACCOUNTS: Record<string, { pass: string; role: Role }> = {
  admin: { pass: 'admin', role: 'admin' },
  cliente: { pass: 'cliente', role: 'cliente' },
}

export default function Login({ onLogin }: { onLogin: (r: Role) => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const acc = ACCOUNTS[user.trim().toLowerCase()]
    if (!acc || acc.pass !== pass) return setError('Usuario o contraseña incorrectos.')
    onLogin(acc.role)
  }

  const fill = (u: string) => {
    setUser(u)
    setPass(ACCOUNTS[u].pass)
    setError('')
  }

  return (
    <main className="grain relative grid min-h-screen place-items-center overflow-hidden safe-top safe-bottom px-5">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-4 select-none font-display text-[7rem] font-black uppercase leading-none text-white/[0.025]"
      >
        ADSO
      </span>
      <Card className="pop relative w-full max-w-md p-8">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Brand size="lg" />
          <p className="text-sm text-mute">Bienvenido al Sistema de Gestión</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Field
            label="Usuario"
            placeholder="Ingresa tu usuario"
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            icon={<User className="size-5" />}
            required
          />
          <Field
            label="Contraseña"
            placeholder="••••••••"
            autoComplete="current-password"
            type={show ? 'text' : 'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            icon={<Lock className="size-5" />}
            required
            right={
              <button
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="grid size-9 place-items-center rounded-lg text-mute transition hover:bg-white/5 hover:text-white"
              >
                {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            }
          />
          {error && (
            <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
          <PrimaryButton type="submit" className="w-full py-4 text-base">
            Iniciar Sesión
          </PrimaryButton>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-mute">
          <span>Demo:</span>
          <button onClick={() => fill('admin')} className="rounded-full border border-line px-3 py-1 transition hover:border-volt hover:text-volt">
            Administrador
          </button>
          <button onClick={() => fill('cliente')} className="rounded-full border border-line px-3 py-1 transition hover:border-volt hover:text-volt">
            Cliente
          </button>
        </div>
        <p className="mt-6 border-t border-line pt-5 text-center text-xs text-slate-400">
          Acceso exclusivo para Administradores y Clientes afiliados
        </p>
      </Card>
    </main>
  )
}
