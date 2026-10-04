# DOCUMENTO DE ESPECIFICACIÓN DE INTERFACES DE USUARIO (UI/UX)

**Proyecto:** Aplicación Móvil Serviteca ADSO  
**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)  
**Evidencia:** Maquetación e Interfaz Gráfica de Usuario  

---

## Tabla de Contenido
1. [Introducción y Objetivos del Entregable](#1-introducción-y-objetivos-del-entregable)
2. [Tiempo Estimado de Entrega y Cronograma de Trabajo](#2-tiempo-estimado-de-entrega-y-cronograma-de-trabajo)
3. [Metodología de Trabajo](#3-metodología-de-trabajo)
4. [Requerimientos Funcionales y No Funcionales](#4-requerimientos-funcionales-y-no-funcionales)
5. [Especificación General de Diseño y Mapa de Sitio](#5-especificación-general-de-diseño-y-mapa-de-sitio)
6. [Diagrama de Navegación (Flujo de Pantallas)](#6-diagrama-de-navegación-flujo-de-pantallas)
7. [Wireframes Textuales y Especificación de Pantallas](#7-wireframes-textuales-y-especificación-de-pantallas)

---

## 1. Introducción y Objetivos del Entregable

### Objetivo General
Diseñar y documentar la arquitectura visual e interactiva de la aplicación **Serviteca ADSO** mediante la especificación de requerimientos, flujos de navegación y prototipos de alta fidelidad.

> **Aclaración:** Este entregable abarca únicamente el diseño de interfaces (Frontend / Maquetación UI/UX) y la lógica visual de navegación, sin incluir la integración con bases de datos ni backend funcional en esta etapa.

---

## 2. Tiempo Estimado de Entrega y Cronograma de Trabajo

* **Proyecto:** Serviteca ADSO — *Fase 1: Maquetación y Especificación de Interfaces UI/UX.*
* **Duración Total:** 5 días hábiles.

### Desglose de Actividades por Día

| Día | Fase / Actividad | Descripción |
| :--- | :--- | :--- |
| **Día 1** | Levantamiento y Análisis | Lectura y análisis del caso de estudio Serviteca ADSO. Definición de requisitos funcionales y no funcionales. |
| **Día 2** | Arquitectura y Flujos | Construcción del Mapa de Sitio (*Site Map*) y Diagrama de Navegación entre pantallas. |
| **Día 3** | Guía de Estilo | Configuración de la paleta de colores en Dark Mode (`#0F0F10`, `#1E293B`, `#FACC15`, `#22C55E`). Estructuración de componentes gráficos (tarjetas redondeadas, botones táctiles y tipografía). |
| **Día 4** | Prototipado y Maquetación | Generación de maquetas interactivas y prototipos utilizando herramientas y agentes de IA (Figma Make, v0.dev, Manus IA, Gemini IA Studio). Diseño de pantallas clave: Login, Dashboard Admin, Registro de Clientes/Carros/Servicios y Portal Cliente. |
| **Día 5** | Documentación y Entrega | Consolidación del documento técnico de entrega. Validación del prototipo frente a los requerimientos del SENA y entrega final. |

---

## 3. Metodología de Trabajo

Para el desarrollo de esta primera fase entregable se adoptó una **Metodología Ágil inspirada en SCRUM** adaptada a ciclos cortos (*Sprint* de 1 semana) junto con prácticas de **Design Thinking**:

* **Enfoque Iterativo e Incremental:** Se dividió la fase de maquetación en pequeñas tareas diarias con entregables continuos (mapa de sitio, prototipos visuales y código del frontend).
* **Diseño Centrado en el Usuario (UX/UI):** Se aplicaron técnicas de *Mobile-First Design* garantizando que los componentes sean legibles y funcionales en dispositivos móviles antes de proyectarse a pantallas de escritorio.
* **Uso de Herramientas de Prototipado e Inteligencia Artificial:** Se hizo uso de modelos de lenguaje e IA especializada en diseño (Figma Make, Manus IA, Gemini Studio, v0.dev) para acelerar la generación de componentes React/Tailwind CSS y la validación de diseños responsivos.

---

## 4. Requerimientos Funcionales y No Funcionales

| ID | Tipo | Categoría | Nombre | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **RNF-06.1** | No Funcional | Seguridad | Control de Permisos por Rol | El cliente solo podrá visualizar información en modo de lectura de sus propios autos e historial de servicios. |
| **RNF-06.2** | No Funcional | Interfaz de Usuario | Estética y Tema Dark Mode | La interfaz debe implementar una guía de estilo coherente basada en el modo oscuro (Dark Mode) con acentos de color llamativos (Amarillo/Verde Neón) / (Azul, Verde Neón). |
| **RNF-07.1** | No Funcional | Usabilidad | Accesibilidad de Menú Admin | La barra de menú lateral (*Sidebar*) o barra inferior (*Bottom Navigation Bar*) debe ser colapsable y táctil, garantizando un acceso con máximo 2 toques/clics a cualquier submenú. |
| **RNF-07.2** | No Funcional | Interfaz de Usuario | Consistencia Visual en Menús | Las opciones activas del menú deben destacarse visualmente mediante resaltado en verde/amarillo brillante para orientar al usuario. |
| **RNF-08.1** | No Funcional | Seguridad | Restricción de Contenido en Cliente | El menú del cliente no debe renderizar ni permitir el acceso a opciones de registro o modificación de datos. |
| **RNF-08.2** | No Funcional | Usabilidad | Diseño Táctil Móvil | El menú del cliente debe implementarse prioritariamente como una barra inferior (*Bottom Bar*) para facilitar el uso con una sola mano en smartphones. |

---

## 5. Especificación General de Diseño

### 5.1 Guía de Estilo y UI

#### Paleta de Colores Principal
* **Fondo Principal (60%):** Negro (`#0F0F10` / `#18181B`) – Otorga estética premium y limpia.
* **Color Secundario / Estructural (30%):** Azul Oscuro / Grafito (`#1E293B`) – Contenedores, tarjetas y barras de navegación.
* **Color de Acento / CTA (10%):** Amarillo brillante (`#FACC15`) – Botones primarios, iconos activos y resaltados.
* **Color Complementario:** Verde (`#22C55E`) – Utilizado únicamente para mensajes de éxito o estado activo.

#### Diseño UX
* Estilo de tarjetas redondeadas (burbujas).
* Navegación por botones intuitivos e interacciones limpias.

---

### 5.2 Mapa de Sitio

```text
Serviteca ADSO
 ├── INT-01: Login (Ingreso de Usuario)
 │
 ├── ROL ADMINISTRADOR (Panel de Control Total)
 │    ├── INT-02A: Dashboard / Menú Principal Admin
 │    ├── INT-03: Menú Clientes
 │    │    ├── Formulario Agregar Cliente
 │    │    ├── Consultar Cliente
 │    │    └── Listar Clientes
 │    ├── INT-04: Menú Carros
 │    │    ├── Formulario Registrar Servicio
 │    │    ├── Consultar Carro
 │    │    └── Listar Carros
 │    ├── INT-05: Menú Servicios
 │    │    ├── Formulario Registrar Servicio
 │    │    ├── Consultar Servicios por Carro
 │    │    └── Listar Servicios Prestados
 │    ├── INT-06: Menú Ayuda
 │    └── INT-07: Cerrar Sesión
 │
 └── ROL CLIENTE (Acceso de Consulta Restringido)
      ├── INT-02B: Dashboard / Menú Principal Cliente
      ├── INT-08: Mis Autos Registrados (Consultar / Listar)
      ├── INT-09: Historial de Servicios Recibidos (Consultar / Listar)
      ├── INT-06: Menú Ayuda
      └── INT-07: Cerrar Sesión
```

---

## 6. Diagrama de Navegación (Flujo de Pantallas)

```text
                  +--------------------------------+
                  | INT-01: Pantalla de Login      |
                  +---------------+----------------+
                                  |
                      Validación de Credenciales
                                  |
         +------------------------+------------------------+
         |                                                 |
  [Es Administrador]                                  [Es Cliente]
         |                                                 |
         v                                                 v
+-------------------------------+               +-------------------------------+
| INT-02A: Dashboard Admin      |               | INT-02B: Dashboard Cliente    |
+-------------------------------+               +-------------------------------+
| - Menú Clientes               |               | - Mis Autos                   |
| - Menú Carros                 |               | - Mis Servicios               |
| - Menú Servicios              |               | - Ayuda                       |
| - Ayuda                       |               | - Salir (Cerrar Sesión)       |
| - Salir (Cerrar Sesión)       |               +-------------------------------+
+-------------------------------+
```

---

## 7. Wireframes Textuales y Especificación de Pantallas

### INT-01: Interfaz de Validación de Ingreso (Login)
* **Propósito:** Autenticar usuarios (Administradores y Clientes) mediante credenciales.
* **Componentes Visuales:**
  * Contenedor central tipo tarjeta flotante (burbuja) sobre fondo negro.
  * Logotipo de la Serviteca ADSO.
  * **Campo de Texto 1:** Usuario.
  * **Campo de Texto 2:** Contraseña (caracteres ocultos).
  * **Botón Principal (Amarillo):** `"Iniciar Sesión"`.

---

### INT-02A: Menú Principal (Vista Administrador)
* **Propósito:** Centro de mando para gestión total de la serviteca.
* **Componentes Visuales:**
  * **Barra Lateral de Navegación (Sidebar / Menú Principal):**
    * **Opción 1:** Menú Clientes (Agregar, Consultar, Listar).
    * **Opción 2:** Menú Carros (Agregar, Consultar, Listar).
    * **Opción 3:** Menú Servicios (Agregar, Consultar, Listar).
    * **Opción 4:** Menú Ayuda.
    * **Opción 5:** Menú Salir (Cerrar Sesión).
  * **Área de Contenido:** Tarjetas de acceso rápido e indicadores generales.

---

### INT-03: Interfaz Registro de Cliente (Vista Admin)
* **Propósito:** Captura de datos personales para la creación de un nuevo cliente.
* **Campos del Formulario:**
  * **Lista desplegable:** Tipo de Identificación.
  * **Campo de texto:** Número de Identificación.
  * **Campo de texto:** Nombres.
  * **Campo de texto:** Apellidos.
  * **Campo de texto:** Correo Electrónico.
  * **Campo de texto:** Número de Celular.
* **Acciones:**
  * **Botón (Amarillo):** `"Guardar Cliente"`.
  * **Modal/Notificación de Salida (Éxito - Verde):** Muestra de forma automática el User y la Contraseña generados por el sistema según las reglas de negocio.

---

### INT-04: Interfaz Registro de Carro (Vista Admin)
* **Propósito:** Registrar un vehículo vinculándolo a la serviteca.
* **Campos del Formulario:**
  * **Campo de texto:** Placa del vehículo.
  * **Campo de texto:** Marca.
  * **Campo de texto:** Modelo.
* **Acciones:**
  * **Botón (Amarillo):** `"Registrar Carro"`.

---

### INT-05: Interfaz Registro de Servicio Prestado (Vista Admin)
* **Propósito:** Asignar un servicio realizado a un vehículo registrado.
* **Campos del Formulario:**
  * **Campo de texto:** Placa del Carro.
  * **Campo de texto:** Identificación del Cliente.
  * **Selector de Fecha:** Fecha del Servicio.
  * **Lista desplegable (Tipo de Servicio):** Cambio de Aceite, Sincronización, Alineación, Lavado.
* **Acciones:**
  * **Botón (Amarillo):** `"Registrar Servicio"`.

---

### INT-06: Consulta y Listado de Servicios Prestados por Carro
* **Propósito:** Consultar el historial detallado de atención de un vehículo específico.
* **Componentes Visuales:**
  * **Barra de búsqueda:** Ingrese la Placa del Carro.
  * **Botón (Azul):** `"Consultar"`.
  * **Tabla / Lista de Resultados (Estilo Burbujas):**
    * **Columna 1:** ID Auto / Placa.
    * **Columna 2:** Tipo de Servicio (Cambio de Aceite, Sincronización, Alineación, Lavado).
    * **Columna 3:** Fecha del Servicio.

---

### INT-02B: Menú / Vista Simplificada de Cliente
* **Propósito:** Permitir al cliente autenticado visualizar de manera clara sus vehículos y servicios recibidos (solo consulta/lectura).
* **Componentes Visuales:**
  * **Menú Navegación:** Mis Autos | Historial de Servicios | Ayuda | Salir.
  * **Sección 1 (Mis Autos):** Tarjetas con Placa, Marca, Modelo y su respectivo ID de registro.
  * **Sección 2 (Servicios Recibidos):** Historial con Tipo de servicio y Fecha recibida.