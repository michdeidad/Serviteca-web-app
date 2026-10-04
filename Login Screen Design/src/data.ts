export type Client = { id: string; tipo: string; doc: string; nombre: string; correo: string; celular: string }
export type Car = { id: string; placa: string; marca: string; modelo: string; owner: string }
export type Service = { id: string; placa: string; tipo: string; fecha: string; owner: string }

export const SERVICE_TYPES = ['Cambio de Aceite', 'Sincronización', 'Alineación y Balanceo', 'Lavado']

export const clients: Client[] = [
  { id: 'CLI-001', tipo: 'CC', doc: '1023456789', nombre: 'Juan Pérez', correo: 'juan.perez@correo.co', celular: '310 555 0142' },
  { id: 'CLI-002', tipo: 'CC', doc: '52889134', nombre: 'Marcela Ríos', correo: 'marcela.rios@correo.co', celular: '315 555 0177' },
  { id: 'CLI-003', tipo: 'NIT', doc: '900456123-7', nombre: 'Transportes Andina SAS', correo: 'flota@andina.co', celular: '601 555 0190' },
  { id: 'CLI-004', tipo: 'CE', doc: '381204', nombre: 'Luca Moretti', correo: 'luca.moretti@correo.co', celular: '320 555 0133' },
]

export const cars: Car[] = [
  { id: 'AUT-001', placa: 'XYZ789', marca: 'Toyota', modelo: 'Corolla 2022', owner: 'Juan Pérez' },
  { id: 'AUT-002', placa: 'ABC123', marca: 'Chevrolet', modelo: 'Spark GT 2019', owner: 'Marcela Ríos' },
  { id: 'AUT-003', placa: 'KLM456', marca: 'Renault', modelo: 'Duster 2021', owner: 'Transportes Andina SAS' },
  { id: 'AUT-004', placa: 'RTV208', marca: 'Mazda', modelo: 'CX-30 2023', owner: 'Luca Moretti' },
]

export const services: Service[] = [
  { id: 'SRV-118', placa: 'ABC123', tipo: 'Cambio de Aceite', fecha: '28/09/2026', owner: 'Marcela Ríos' },
  { id: 'SRV-104', placa: 'ABC123', tipo: 'Alineación y Balanceo', fecha: '15/08/2026', owner: 'Marcela Ríos' },
  { id: 'SRV-117', placa: 'XYZ789', tipo: 'Lavado', fecha: '22/09/2026', owner: 'Juan Pérez' },
  { id: 'SRV-096', placa: 'XYZ789', tipo: 'Cambio de Aceite', fecha: '03/07/2026', owner: 'Juan Pérez' },
  { id: 'SRV-081', placa: 'XYZ789', tipo: 'Sincronización', fecha: '12/05/2026', owner: 'Juan Pérez' },
  { id: 'SRV-112', placa: 'KLM456', tipo: 'Sincronización', fecha: '18/09/2026', owner: 'Transportes Andina SAS' },
  { id: 'SRV-109', placa: 'RTV208', tipo: 'Lavado', fecha: '09/09/2026', owner: 'Luca Moretti' },
]
