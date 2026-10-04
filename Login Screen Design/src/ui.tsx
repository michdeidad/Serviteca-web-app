import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { Wrench } from 'lucide-react'

export function Brand({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const lg = size === 'lg'
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid place-items-center rounded-xl bg-volt text-black ${lg ? 'size-14' : 'size-10'} -rotate-6`}
      >
        <Wrench className={lg ? 'size-7' : 'size-5'} strokeWidth={2.6} />
      </span>
      <span className={`font-display font-black uppercase leading-none tracking-wide text-white ${lg ? 'text-4xl' : 'text-2xl'}`}>
        Serviteca <span className="text-volt">ADSO</span>
      </span>
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-bubble shadow-[0_18px_50px_-18px_rgb(0_0_0/0.8)] ${className}`}>
      {children}
    </div>
  )
}

export function PageHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <header className="mb-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-volt">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none tracking-wide text-white">
        {title}
      </h1>
      {sub && <p className="mt-3 max-w-xl text-sm text-mute">{sub}</p>}
    </header>
  )
}

const fieldCls =
  'w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/30'

export function Field({
  label,
  icon,
  right,
  ...props
}: { label: string; icon?: ReactNode; right?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-mute">{label}</span>
      <span className="relative block">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute">{icon}</span>}
        <input {...props} className={`${fieldCls} ${icon ? 'pl-12' : ''} ${right ? 'pr-12' : ''}`} />
        {right && <span className="absolute right-2 top-1/2 -translate-y-1/2">{right}</span>}
      </span>
    </label>
  )
}

export function Select({
  label,
  options,
  ...props
}: { label: string; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-mute">{label}</span>
      <select {...props} className={`${fieldCls} appearance-none`}>
        {options.map((o) => (
          <option key={o} value={o} className="bg-bubble">
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function PrimaryButton({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-volt px-6 py-3.5 text-sm font-extrabold text-black shadow-[0_8px_24px_-8px_rgb(250_204_21/0.6)] transition hover:-translate-y-0.5 hover:bg-volt-dim active:translate-y-0 ${className}`}
    >
      {children}
    </button>
  )
}

export function Plate({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border-2 border-black/80 bg-volt px-2.5 py-0.5 font-mono text-sm font-bold tracking-widest text-black">
      {children}
    </span>
  )
}
