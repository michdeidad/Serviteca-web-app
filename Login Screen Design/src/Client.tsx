import { useState } from 'react'
import { ArrowRight, CarFront, CircleHelp, History, LogOut } from 'lucide-react'
import { Brand, Card, Plate } from './ui'
import { Ayuda } from './Admin'
import { ServiceCard } from './Services'
import { cars, services } from './data'

type Tab = 'inicio' | 'autos' | 'servicios' | 'ayuda'
const NAV = [
  { k: 'autos', l: 'Mis Autos', i: CarFront },
  { k: 'servicios', l: 'Mis Servicios', i: History },
  { k: 'ayuda', l: 'Ayuda', i: CircleHelp },
] as const

export default function ClientPortal({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('inicio')
  const myCars = cars.filter((c) => c.owner === 'Juan Pérez')
  const mine = services.filter((s) => s.owner === 'Juan Pérez')
  const btn = 'flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-[11px] font-bold transition'

  return (
    <div className="grain min-h-screen pb-32">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-md flex-col items-start gap-3 px-5 pb-4 pt-12">
          <button onClick={() => setTab('inicio')} aria-label="Ir al inicio"><Brand /></button>
          <p className="text-sm text-slate-300">
            Hola, <b className="text-white">Juan Pérez</b> <span className="mx-1 text-line">|</span>
            <span className="rounded-full bg-volt/15 px-2.5 py-0.5 text-xs font-bold text-volt">Cliente</span>
          </p>
        </div>
      </header>

        <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md gap-1 border-t border-line bg-bubble/95 px-3 pt-2 backdrop-blur safe-bottom">
          {NAV.map(({ k, l, i: I }) => (
            <button key={k} onClick={() => setTab(k)} className={`${btn} ${tab === k ? 'bg-volt text-black' : 'text-slate-300 hover:bg-white/5'}`}>
              <I className="size-5" /> <span className="whitespace-nowrap">{l}</span>
            </button>
          ))}
          <button onClick={onLogout} className={`${btn} text-slate-300 hover:bg-red-500/10 hover:text-red-300`}>
            <LogOut className="size-5" /> <span className="whitespace-nowrap">Cerrar Sesión</span>
          </button>
        </nav>

      <main key={tab} className="rise mx-auto max-w-md space-y-12 px-5 py-10">
        {tab === 'inicio' && (
          <>
            <section>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-volt">Portal del cliente</p>
              <h1 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none text-white">Bienvenido, Juan</h1>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Card className="p-5">
                  <CarFront className="size-5 text-volt" />
                  <p className="mt-4 font-display text-6xl font-black leading-none text-white">{myCars.length}</p>
                  <p className="mt-2 text-xs text-mute">Autos registrados</p>
                </Card>
                <Card className="p-5">
                  <History className="size-5 text-volt" />
                  <p className="mt-4 font-display text-6xl font-black leading-none text-white">{mine.length}</p>
                  <p className="mt-2 text-xs text-mute">Servicios recibidos</p>
                </Card>
              </div>
            </section>
            <section>
              <h2 className="mb-4 font-display text-3xl font-extrabold uppercase tracking-wide text-white">Mis Autos</h2>
              {myCars.map((c) => (
                <button key={c.id} onClick={() => setTab('autos')} className="w-full text-left">
                  <Card className="flex items-center gap-4 p-5 transition hover:border-volt/50">
                    <span className="grid size-12 place-items-center rounded-xl bg-volt/10 text-volt"><CarFront className="size-6" /></span>
                    <div className="flex-1">
                      <p className="font-bold text-white">{c.marca} {c.modelo}</p>
                      <p className="font-mono text-xs text-mute">{c.id}</p>
                    </div>
                    <Plate>{c.placa}</Plate>
                  </Card>
                </button>
              ))}
            </section>
            <section>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-white">Últimos servicios</h2>
                <button onClick={() => setTab('servicios')} className="flex items-center gap-1 text-sm font-bold text-volt">
                  Ver historial <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="space-y-3">
                {mine.slice(0, 2).map((s) => (
                  <ServiceCard key={s.id} s={s} />
                ))}
              </div>
            </section>
          </>
        )}
        {tab === 'autos' && (
          <section>
            <h2 className="mb-5 font-display text-3xl font-extrabold uppercase tracking-wide text-white">Mis Autos Registrados</h2>
            <div className="grid gap-4">
              {myCars.map((c) => (
                <Card key={c.id} className="relative overflow-hidden p-6">
                  <CarFront aria-hidden className="absolute -right-6 -top-4 size-36 text-white/[0.04]" />
                  <p className="font-mono text-xs text-volt">{c.id}</p>
                  <p className="mt-3 font-display text-4xl font-black uppercase leading-none text-white">{c.marca}</p>
                  <p className="mt-1 text-slate-300">{c.modelo}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-mute">Placa</span>
                    <Plate>{c.placa}</Plate>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
        {(tab === 'autos' || tab === 'servicios') && (
          <section>
            <h2 className="mb-5 font-display text-3xl font-extrabold uppercase tracking-wide text-white">Historial de Servicios Recibidos</h2>
            <div className="space-y-3">
              {mine.map((s) => (
                <ServiceCard key={s.id} s={s} />
              ))}
            </div>
          </section>
        )}
        {tab === 'ayuda' && <Ayuda />}
      </main>
    </div>
  )
}
