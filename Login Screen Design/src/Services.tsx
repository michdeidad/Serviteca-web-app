import { useState } from 'react'
import { CalendarDays, Search, Wrench } from 'lucide-react'
import { Card, Field, PageHead, Plate, PrimaryButton } from './ui'
import { SERVICE_TYPES, services, type Service } from './data'

const FILTERS = ['Todos', 'Cambio de Aceite', 'Sincronización', 'Alineación', 'Lavado']

export function ServiceCard({ s, showPlate = true }: { s: Service; showPlate?: boolean }) {
  return (
    <Card className="rise flex flex-wrap items-center gap-x-8 gap-y-4 p-5 transition hover:border-volt/50">
      <span className="grid size-12 place-items-center rounded-xl bg-volt/10 text-volt">
        <Wrench className="size-6" />
      </span>
      <div className="min-w-40 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-mute">Tipo de Servicio</p>
        <p className="mt-1 text-lg font-bold text-white">{s.tipo}</p>
      </div>
      {showPlate && (
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-mute">Placa / ID Vehículo</p>
          <Plate>{s.placa.slice(0, 3)}-{s.placa.slice(3)}</Plate>
        </div>
      )}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-mute">Fecha del Servicio</p>
        <p className="mt-1 flex items-center gap-2 font-mono text-sm text-white">
          <CalendarDays className="size-4 text-volt" />
          {s.fecha}
        </p>
      </div>
    </Card>
  )
}

export function ServiceQuery() {
  const [input, setInput] = useState('')
  const [plate, setPlate] = useState('ABC123')
  const [filter, setFilter] = useState('Todos')

  const search = () => {
    setPlate(input.replace(/[^a-z0-9]/gi, '').toUpperCase())
    setFilter('Todos')
  }
  const results = services.filter(
    (s) => s.placa === plate && (filter === 'Todos' || s.tipo.startsWith(filter)),
  )

  return (
    <>
      <PageHead kicker="Servicios" title="Consulta de Servicios Prestados por Vehículo" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          search()
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex-1">
          <Field
            label="Placa del carro"
            placeholder="Ingrese la Placa del Carro (Ej: ABC123)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            icon={<Search className="size-5" />}
            maxLength={7}
          />
        </div>
        <PrimaryButton type="submit">
          <Search className="size-4" strokeWidth={3} /> Buscar
        </PrimaryButton>
      </form>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              filter === f ? 'border-volt bg-volt text-black' : 'border-line bg-bubble text-slate-300 hover:border-volt/60'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mb-4 mt-8 font-mono text-xs uppercase tracking-widest text-mute">
        {results.length} resultado{results.length !== 1 && 's'} · placa {plate}
      </p>
      <div className="space-y-3">
        {results.map((s) => (
          <ServiceCard key={s.id} s={s} />
        ))}
        {!results.length && (
          <Card className="p-10 text-center text-sm text-mute">No hay servicios registrados con esos criterios.</Card>
        )}
      </div>
    </>
  )
}

export { SERVICE_TYPES }
