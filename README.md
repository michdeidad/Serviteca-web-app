# 🚗 Serviteca ADSO

🚀 **Demo en Vivo:** [https://serviteca-adso.netlify.app](https://serviteca-adso.netlify.app)

## Resumen Ejecutivo
Sistema web de gestión integral para servitecas, desarrollado como entregable académico del programa Tecnólogo en Análisis y Desarrollo de Software (ADSO) del SENA. Permite a administradores gestionar clientes, vehículos y servicios, mientras que los clientes acceden a un portal de consulta de solo lectura.

## Stack Tecnológico

| Herramienta | Versión | Uso |
|---|---|---|
| **React** | 19 | Framework UI |
| **TypeScript** | ^5.7 | Tipado estático |
| **Vite** | ^8.0 | Build tool y dev server |
| **Tailwind CSS** | v4 | Estilos utility-first |
| **Lucide React** | ^1.49 | Iconografía |
| **Netlify** | — | Hosting y CI/CD |
| **Figma Make** | — | Prototipado inicial |
| **Kiro (Amazon)** | — | Asistente IA de desarrollo |

## Arquitectura y Roles

### Panel Administrador (INT-02A)
- **Gestión de Clientes** — Agregar (con generación automática de credenciales), Consultar y Listar
- **Gestión de Carros** — Registrar (Placa, Marca, Modelo), Consultar y Listar
- **Gestión de Servicios** — Registrar (Placa, Cliente, Fecha, Tipo), Consultar por placa y Listar
- Sidebar colapsable con acceso en máximo 2 toques a cualquier sección
- Centro de mando con estadísticas en tiempo real

### Portal Cliente (INT-02B — Solo Lectura)
- **Mis Autos Registrados** — Visualización de vehículos vinculados al cliente
- **Historial de Servicios Recibidos** — Historial completo con tipo y fecha
- Bottom navigation bar táctil para uso con una sola mano en smartphones
- Sin opciones de registro ni modificación de datos (RNF-06.1, RNF-08.1)

## Diseño UI/UX — Dark Mode

| Token CSS | Color Hex | Uso |
|---|---|---|
| `--color-ink` | `#0F0F10` | Fondo principal (60%) |
| `--color-bubble` | `#1E293B` | Tarjetas, sidebar, contenedores (30%) |
| `--color-volt` | `#FACC15` | Botones primarios, iconos activos, acentos CTA (10%) |
| `--color-ok` | `#22C55E` | Mensajes de éxito, estados activos |

**Tipografía:**
- Display: Big Shoulders Display (headers impactantes)
- Body: Manrope (legibilidad en dark mode)
- Mono: JetBrains Mono (placas, IDs, código)

## Mapa de Pantallas

```
INT-01: Login → credenciales admin/admin | cliente/cliente
├── ROL ADMIN → INT-02A Dashboard Admin
│   ├── INT-03 Clientes (Agregar / Consultar / Listar)
│   ├── INT-04 Carros (Agregar / Consultar / Listar)
│   ├── INT-05 Servicios (Agregar / Consultar / Listar)
│   └── Ayuda + Cerrar Sesión
└── ROL CLIENTE → INT-02B Dashboard Cliente
    ├── Mis Autos (solo lectura)
    ├── Historial de Servicios (solo lectura)
    └── Ayuda + Cerrar Sesión
```

## Instalación y Ejecución Local

```bash
# Clonar el repositorio
git clone <repo-url>
cd "Login Screen Design"

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Credenciales de Demo

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | `admin` | `admin` |
| Cliente | `cliente` | `cliente` |

## Despliegue CI/CD

El proyecto está configurado con integración continua mediante **GitHub → Netlify**. Cada `git push` a la rama `main` actualiza automáticamente la web desplegada.

El archivo `netlify.toml` en la raíz del proyecto frontend configura:
- **Comando de build:** `npm run build`
- **Directorio de publicación:** `dist`
- **Redirección SPA:** todas las rutas redirigen a `index.html` (evita errores 404 en recarga de páginas)

## Estructura del Proyecto

```
serviteca_adso/
├── Login Screen Design/     # Proyecto frontend principal
│   ├── src/
│   │   ├── App.tsx          # Enrutador raíz (Login → Admin | Client)
│   │   ├── Login.tsx        # INT-01: Autenticación
│   │   ├── Admin.tsx        # INT-02A + INT-03/04/05: Panel Admin
│   │   ├── Client.tsx       # INT-02B: Portal Cliente
│   │   ├── Services.tsx     # Componente de consulta de servicios
│   │   ├── data.ts          # Datos demo (clientes, carros, servicios)
│   │   ├── ui.tsx           # Componentes UI reutilizables
│   │   └── index.css        # Tokens de diseño Tailwind CSS v4
│   ├── netlify.toml         # Configuración de despliegue
│   └── package.json
├── .docs/
│   └── requirements.md      # Documento de especificación UI/UX
└── README.md                # Este archivo
```

---
_Proyecto académico — Programa ADSO, SENA Colombia. Generado con asistencia de Kiro (Amazon AI)._
