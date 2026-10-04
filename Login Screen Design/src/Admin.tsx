import { useState, type FormEvent } from 'react'
import {
  CarFront, ChevronDown, CircleCheck, CircleHelp, LogOut, Menu, Plus, Search, UserRound, Users, Wrench, X, ListChecks,
} from 'lucide-react'
import { Brand, Card, Field, PageHead, Plate, PrimaryButton, Select } from './ui'
import { ServiceQuery } from './Services'
import { SERVICE_TYPES, cars, clients, services } from './data'

type Group = 'clientes' | 'carros' | 'servicios'
type View = 'home' | 'ayuda' | `${Group}/${'agregar' | 'consultar' | 'listar'}`

const MENU: { key: Group; label: string; icon: typeof Users }[] = [
  { key: 'clientes', label: 'Clientes', icon: Users },
  { key: 'carros', label: 'Carros', icon: CarFront },
  { key: 'servicios', label: 'Servicios', icon: Wrench },
]
const SUB = [
  { key: 'agregar', label: 'Agregar' },
  { key: 'consultar', label: 'Consultar' },
  { key: 'listar', label: 'Listar' },
] as const

function genCreds(nombres: string, apellidos: string) {
  const first = nombres.trim().split(' ')[0] || 'Cliente'
  const last = apellidos.trim().charAt(0).toUpperCase() || 'X'
  const n = Math.floor(100 + Math.random() * 900)
  return { user: `${first}${last}${n}`, pass: `${Math.floor(10000 + Math.random() * 90000)}#${first}` }
}

function AddClient({ onDone }: { onDone: (m: { user: string; pass: string }) => void }) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    onDone(genCreds(String(f.get('n')), String(f.get('a'))))
    e.currentTarget.reset()
  }
  return (
    <>
      <PageHead kicker="Clientes" title="Agregar Cliente" sub="Registra los datos personales. El sistema generará las credenciales de acceso automáticamente." />
      <Card className="max-w-3xl p-6">
        <form onSubmit={submit} className="grid gap-5">
          <Select label="Tipo de Identificación" options={['CC', 'CE', 'NIT', 'Pasaporte']} name="t" />
          <Field label="Número de Identificación" name="d" placeholder="1023456789" inputMode="numeric" required />
          <Field label="Nombres" name="n" placeholder="Carlos" required />
          <Field label="Apellidos" name="a" placeholder="Pineda" required />
          <Field label="Correo Electrónico" name="c" type="email" placeholder="carlos@correo.co" required />
          <Field label="Celular" name="p" type="tel" placeholder="310 555 0100" required />
          <div className="mt-2">
            <PrimaryButton type="submit" className="w-full">
              <Plus className="size-4" strokeWidth={3} /> Guardar Cliente
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </>
  )
}

function AddGeneric({ kind }: { kind: 'carros' | 'servicios' }) {
  const [ok, setOk] = useState(false)
  const car = kind === 'carros'
  return (
    <>
      <PageHead kicker={car ? 'Carros' : 'Servicios'} title={car ? 'Agregar Carro' : 'Registrar Servicio'} />
      <Card className="max-w-3xl p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setOk(true)
            e.currentTarget.reset()
            setTimeout(() => setOk(false), 3000)
          }}
          className="grid gap-5"
        >
          <Field label="Placa" placeholder="ABC123" maxLength={7} required />
          {car ? (
            <>
              <Field label="Marca" placeholder="Toyota" required />
              <Field label="Modelo" placeholder="Corolla 2022" required />
              <Select label="Propietario" options={clients.map((c) => c.nombre)} />
            </>
          ) : (
            <>
              <Select label="Tipo de Servicio" options={SERVICE_TYPES} />
              <Field label="Fecha del Servicio" type="date" required />
            </>
          )}
          <div className="mt-2 flex items-center gap-4">
            <PrimaryButton type="submit">{car ? 'Guardar Carro' : 'Guardar Servicio'}</PrimaryButton>
            {ok && <span className="pop flex items-center gap-2 text-sm text-ok"><CircleCheck className="size-4" /> Registro guardado</span>}
          </div>
        </form>
      </Card>
    </>
  )
}

type Row = (string | React.ReactNode)[]
function Table({ head, rows }: { head: string[]; rows: Row[] }) {
  return (
    <Card className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wider text-mute">
            {head.map((h) => <th key={h} className="px-5 py-4 font-bold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line/60 transition last:border-0 hover:bg-white/[0.03]">
              {r.map((c, j) => <td key={j} className={`px-5 py-4 ${j === 0 ? 'font-mono text-volt' : 'text-slate-200'}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

function List({ group, q }: { group: Group; q?: string }) {
  const m = (s: string) => !q || s.toLowerCase().includes(q.toLowerCase())
  if (group === 'clientes')
    return <Table head={['ID', 'Identificación', 'Nombre', 'Correo', 'Celular']} rows={clients.filter((c) => m(c.doc + c.nombre + c.id)).map((c) => [c.id, `${c.tipo} ${c.doc}`, c.nombre, c.correo, c.celular])} />
  if (group === 'carros')
    return <Table head={['ID', 'Placa', 'Marca', 'Modelo', 'Propietario']} rows={cars.filter((c) => m(c.placa + c.id + c.marca)).map((c) => [c.id, <Plate key={c.id}>{c.placa}</Plate>, c.marca, c.modelo, c.owner])} />
  return <Table head={['ID', 'Placa', 'Servicio', 'Fecha', 'Cliente']} rows={services.filter((s) => m(s.placa + s.tipo + s.id)).map((s) => [s.id, s.placa, s.tipo, s.fecha, s.owner])} />
}

const TITLES = { clientes: 'Clientes', carros: 'Carros', servicios: 'Servicios' }
const SINGULAR = { clientes: 'Cliente', carros: 'Carro', servicios: 'Servicio' }
const HINT = { clientes: 'Buscar por nombre o identificación', carros: 'Buscar por placa, marca o ID', servicios: 'Buscar por placa o tipo de servicio' }

function Consult({ group }: { group: Group }) {
  const [q, setQ] = useState('')
  return (
    <>
      <PageHead kicker={`Menú ${TITLES[group]}`} title={`Consultar ${SINGULAR[group]}`} />
      <div className="mb-5 max-w-xl">
        <Field label="Búsqueda" placeholder={HINT[group]} value={q} onChange={(e) => setQ(e.target.value)} icon={<Search className="size-5" />} />
      </div>
      <List group={group} q={q} />
    </>
  )
}

function Home({ go }: { go: (v: View) => void }) {
  const stats = [
    { n: clients.length, l: 'Clientes activos', icon: Users },
    { n: cars.length, l: 'Carros registrados', icon: CarFront },
    { n: services.length, l: 'Servicios este mes', icon: ListChecks },
  ]
  return (
    <>
      <PageHead kicker="Panel de control" title="Buen día, Administrador" sub="Centro de mando para la gestión total de la serviteca." />
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ n, l, icon: I }) => (
          <Card key={l} className="p-4">
            <I className="size-5 text-volt" />
            <p className="mt-4 font-display text-5xl font-black leading-none text-white">{n}</p>
            <p className="mt-2 text-xs text-mute">{l}</p>
          </Card>
        ))}
      </div>
      <p className="mb-4 mt-10 font-mono text-xs uppercase tracking-widest text-mute">Secciones</p>
      <div className="grid grid-cols-2 gap-3">
        {([
          ['Clientes', 'clientes/listar', Users],
          ['Carros', 'carros/listar', CarFront],
          ['Servicios', 'servicios/listar', Wrench],
          ['Ayuda', 'ayuda', CircleHelp],
        ] as const).map(([l, v, I]) => (
          <button key={l} onClick={() => go(v)} className="rounded-2xl border border-line bg-bubble p-5 text-left transition hover:border-volt/60">
            <I className="size-6 text-volt" />
            <p className="mt-6 font-display text-2xl font-extrabold uppercase leading-none text-white">{l}</p>
          </button>
        ))}
      </div>
      <p className="mb-4 mt-10 font-mono text-xs uppercase tracking-widest text-mute">Accesos rápidos</p>
      <div className="grid gap-4">
        {[
          ['Agregar Cliente', 'clientes/agregar'],
          ['Agregar Carro', 'carros/agregar'],
          ['Registrar Servicio', 'servicios/agregar'],
        ].map(([l, v]) => (
          <button key={v} onClick={() => go(v as View)} className="group flex items-center justify-between rounded-2xl border border-volt/30 bg-volt/[0.06] p-5 text-left font-bold text-white transition hover:bg-volt hover:text-black">
            {l}
            <Plus className="size-5 text-volt transition group-hover:rotate-90 group-hover:text-black" />
          </button>
        ))}
      </div>
    </>
  )
}

export default function Admin({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<View>('home')
  const [open, setOpen] = useState<Group | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [toast, setToast] = useState<{ user: string; pass: string } | null>(null)

  const go = (v: View) => {
    setView(v)
    setDrawer(false)
    if (v.includes('/')) setOpen(v.split('/')[0] as Group)
  }

  const [g, act] = view.split('/') as [Group, string?]
  const content = () => {
    if (view === 'home') return <Home go={go} />
    if (view === 'ayuda') return <Ayuda />
    if (view === 'servicios/consultar') return <ServiceQuery />
    if (act === 'agregar') return g === 'clientes' ? <AddClient onDone={setToast} /> : <AddGeneric kind={g as 'carros' | 'servicios'} />
    if (act === 'consultar') return <Consult group={g} />
    return (
      <>
        <PageHead kicker={`Menú ${TITLES[g]}`} title={`Listar ${TITLES[g]}`} />
        <List group={g} />
      </>
    )
  }

  const navBtn = (active: boolean) =>
    `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? 'bg-volt text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`

  return (
    <div className="grain min-h-screen">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-ink/90 px-5 pb-3 pt-12 backdrop-blur">
        <Brand />
        <button aria-label="Menú" onClick={() => setDrawer(!drawer)} className="grid size-10 place-items-center rounded-xl bg-bubble">
          {drawer ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside className={`${drawer ? 'block' : 'hidden'} fixed inset-x-0 bottom-0 top-[100px] z-20 mx-auto max-w-md overflow-y-auto bg-ink p-4 pb-[max(34px,env(safe-area-inset-bottom))]`}>
        <div className="flex min-h-full flex-col rounded-3xl border border-line bg-bubble p-4">
          <div className="hidden px-2 pb-6 pt-3"><Brand /></div>
          <nav className="flex-1 space-y-1">
            <button onClick={() => go('home')} className={navBtn(view === 'home')}><UserRound className="size-5" /> Panel</button>
            {MENU.map(({ key, label, icon: I }) => (
              <div key={key}>
                <button onClick={() => setOpen(open === key ? null : key)} className={navBtn(false) + (g === key && view !== 'home' ? ' !text-volt' : '')} aria-expanded={open === key}>
                  <I className="size-5" /> {label}
                  <ChevronDown className={`ml-auto size-4 transition ${open === key ? 'rotate-180' : ''}`} />
                </button>
                {open === key && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-line pl-3">
                    {SUB.map((s) => {
                      const v = `${key}/${s.key}` as View
                      return (
                        <button key={v} onClick={() => go(v)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${view === v ? 'bg-volt font-bold text-black' : 'text-mute hover:text-white'}`}>
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => go('ayuda')} className={navBtn(view === 'ayuda')}><CircleHelp className="size-5" /> Ayuda</button>
          </nav>
          <button onClick={onLogout} className="mt-4 flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-red-400/50 hover:text-red-300">
            <LogOut className="size-5" /> Salir
          </button>
        </div>
      </aside>

      <main className="safe-bottom relative px-5 pt-8">
        <div key={view} className="rise ">{content()}</div>
      </main>

      {toast && (
        <div role="status" className="pop fixed inset-x-4 top-14 z-50 mx-auto max-w-[26rem] rounded-2xl border border-ok/40 bg-[#0f2a1a] p-5 shadow-2xl shadow-ok/10">
          <div className="flex gap-3">
            <CircleCheck className="mt-0.5 size-6 shrink-0 text-ok" />
            <div className="flex-1 text-sm">
              <p className="font-bold text-ok">Cliente Registrado con éxito</p>
              <p className="mt-1 text-slate-300">Credenciales generadas:</p>
              <p className="mt-2 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-white">
                Usuario: {toast.user} | Contraseña: {toast.pass}
              </p>
            </div>
            <button aria-label="Cerrar" onClick={() => setToast(null)} className="text-mute hover:text-white"><X className="size-4" /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Ayuda() {
  return (
    <>
      <PageHead kicker="Ayuda" title="Centro de Ayuda" />
      <Card className="max-w-2xl divide-y divide-line">
        {[
          ['¿Cómo registro un cliente?', 'Ve a Clientes → Agregar, completa el formulario y guarda. Se generan usuario y contraseña automáticamente.'],
          ['¿Cómo consulto los servicios de un carro?', 'En Servicios → Consultar, ingresa la placa y filtra por tipo de servicio.'],
          ['¿Necesitas soporte?', 'Escríbenos a soporte@serviteca-adso.co o llama al 601 555 0100.'],
        ].map(([q, a]) => (
          <div key={q} className="p-6">
            <p className="font-bold text-white">{q}</p>
            <p className="mt-2 text-sm text-mute">{a}</p>
          </div>
        ))}
      </Card>
    </>
  )
}
