# TaskBoard

Aplicación de gestión de tareas construida con **React + Vite** en el frontend y **Node.js + Express** en el backend. Permite crear, editar, completar y eliminar tareas con persistencia en memoria.

---

## Tabla de contenidos

- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [API Reference](#api-reference)
- [Componentes del frontend](#componentes-del-frontend)
- [Arquitectura del backend](#arquitectura-del-backend)

---

## Tecnologías utilizadas

### Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| Node.js | ≥18 | Runtime de JavaScript |
| Express | ^5 | Framework HTTP |
| CORS | ^2 | Peticiones cross-origin desde el frontend |
| Zod | ^4 | Validación de datos entrantes |
| dotenv | ^17 | Carga de variables de entorno |

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| React | ^18 | Librería de UI |
| Vite | ^5 | Bundler y servidor de desarrollo |
| DM Sans | — | Tipografía principal (Google Fonts) |
| Instrument Serif | — | Tipografía de display (Google Fonts) |

---

## Estructura del proyecto

```
TaskBoard/
├── app.js                           # Punto de entrada del backend
├── package.json
├── src/
│   ├── middlewares/
│   │   ├── appError.js              # Clase de error personalizada
│   │   └── errorHandler.js         # Middleware global de errores
│   └── modules/
│       └── tasks/
│           ├── tasks.controller.js  # Controladores de rutas
│           ├── tasks.routes.js      # Definición de rutas REST
│           ├── tasks.schema.js      # Esquemas de validación con Zod
│           └── tasks.service.js     # Lógica de negocio y almacenamiento
│
└── client/                          # Frontend React
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx          # Navegación lateral y progreso
    │   │   ├── TaskForm.jsx         # Formulario para agregar tareas
    │   │   ├── TaskList.jsx         # Lista agrupada de tareas
    │   │   ├── TaskItem.jsx         # Tarjeta individual de tarea
    │   │   ├── Modal.jsx            # EditModal y ConfirmModal
    │   │   └── Toast.jsx            # Notificación temporal
    │   ├── App.jsx                  # Componente raíz y estado global
    │   ├── App.css                  # Estilos globales y design system
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Requisitos previos

- **Node.js** ≥18 → [nodejs.org](https://nodejs.org)
- **npm** ≥9 (incluido con Node.js)
- **Git** → [git-scm.com](https://git-scm.com)

---

## Instalación y ejecución

Clona el repositorio:

```bash
git clone https://github.com/GEliasDev/TaskBoard.git
cd TaskBoard
```

**Terminal 1 — Backend:**

```bash
npm install
node app.js
```

El servidor queda disponible en `http://localhost:3000`. Si prefieres recarga automática:

```bash
npx nodemon app.js
```

**Terminal 2 — Frontend:**

```bash
cd client
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## Variables de entorno

### Backend (`.env` en la raíz)

```env
PORT=3000
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

> Las variables del frontend deben empezar con `VITE_` para ser expuestas por Vite. En el código se acceden como `import.meta.env.VITE_API_URL`.

---

## API Reference

Todas las respuestas son JSON. Las exitosas incluyen `"success": true`, las fallidas `"success": false` con un `message` descriptivo.

### `GET /health`

```json
{ "status": "ok" }
```

---

### `GET /api/tasks`

Retorna todas las tareas.

```json
{
  "success": true,
  "data": [
    { "id": "uuid", "title": "Revisar propuesta", "status": "pending", "createdAt": "..." }
  ]
}
```

---

### `GET /api/tasks/:id`

Retorna una tarea por ID. Responde `404` si no existe.

---

### `POST /api/tasks`

Crea una nueva tarea.

**Body:**
```json
{ "title": "Nombre de la tarea" }
```

**Respuesta `201`:**
```json
{
  "success": true,
  "data": { "id": "uuid", "title": "Nombre de la tarea", "status": "pending", "createdAt": "..." }
}
```

**Error `400`** — título vacío o faltante:
```json
{ "success": false, "message": "El título no puede estar vacío." }
```

---

### `PATCH /api/tasks/:id`

Actualiza el título y/o estado de una tarea. Al menos un campo es obligatorio.

**Body:**
```json
{ "title": "Nuevo título", "status": "completed" }
```

**Respuesta `200`:**
```json
{
  "success": true,
  "data": { "id": "uuid", "title": "Nuevo título", "status": "completed", "createdAt": "...", "updatedAt": "..." }
}
```

**Error `400`** — ningún campo enviado:
```json
{ "success": false, "message": "Debes enviar al menos un campo para actualizar (title o status)." }
```

---

### `PATCH /api/tasks/:id/complete`

Marca directamente una tarea como `completed`. Responde igual que el `PATCH` general.

---

### `DELETE /api/tasks/:id`

Elimina una tarea. Responde `204` sin cuerpo si fue exitoso, `404` si no existe.

---

## Componentes del frontend

### `App.jsx`

Componente raíz. Gestiona el estado global: `tasks`, `filter`, `editTask`, `deleteTask` y `toast`. Contiene todas las funciones que llaman a la API.

---

### `Sidebar.jsx`

| Prop | Tipo | Descripción |
|---|---|---|
| `filter` | `string` | Vista activa (`"all"`, `"pending"`, `"completed"`) |
| `onFilter` | `function` | Callback para cambiar el filtro |
| `counts` | `object` | `{ all, pending, completed }` |

---

### `TaskForm.jsx`

| Prop | Tipo | Descripción |
|---|---|---|
| `onCreate` | `function` | Callback async que recibe el título de la nueva tarea |

---

### `TaskList.jsx`

| Prop | Tipo | Descripción |
|---|---|---|
| `tasks` | `array` | Tareas ya filtradas |
| `filter` | `string` | Vista activa (decide si agrupar o no) |
| `onToggle` | `function` | Cambia estado de una tarea |
| `onEdit` | `function` | Abre el modal de edición |
| `onDelete` | `function` | Abre el modal de confirmación |

En vista `"all"` agrupa las tareas en dos secciones: Pendientes y Completadas.

---

### `TaskItem.jsx`

| Prop | Tipo | Descripción |
|---|---|---|
| `task` | `object` | `{ id, title, status, createdAt }` |
| `onToggle` | `function` | Recibe `(id, currentStatus)` |
| `onEdit` | `function` | Recibe `(id, currentTitle)` |
| `onDelete` | `function` | Recibe `(id, title)` |

---

### `Modal.jsx`

Exporta `EditModal` y `ConfirmModal`. Ambos se cierran con `Escape` o haciendo clic en el overlay. `EditModal` también guarda con `Enter` y hace foco automático al input.

---

### `Toast.jsx`

| Prop | Tipo | Descripción |
|---|---|---|
| `message` | `string` | Texto de la notificación |
| `onDone` | `function` | Callback al terminar la animación de salida |

Se auto-destruye tras 2.4 segundos.

---

## Arquitectura del backend

El backend sigue una estructura modular por capas:

- **`app.js`** — monta Express, configura CORS, JSON y registra las rutas.
- **`tasks.routes.js`** — define los endpoints REST y los conecta con los controladores.
- **`tasks.controller.js`** — recibe las solicitudes HTTP y delega la lógica al servicio.
- **`tasks.service.js`** — lógica de negocio y almacenamiento en memoria con un `Map`.
- **`tasks.schema.js`** — esquemas Zod que validan los cuerpos de `POST` y `PATCH`.
- **`errorHandler.js`** — middleware global que formatea errores de validación y operacionales.
- **`appError.js`** — clase de error personalizada para respuestas coherentes.

> Las tareas se guardan en un `Map` en memoria. Los datos se pierden al reiniciar el servidor. El backend incluye algunas tareas de ejemplo al arrancar.

---

## Licencia

MIT — libre para uso personal y comercial.
