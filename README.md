# Documentación del servicio

## Instalación de Módulos y Configuración

Antes de utilizar esta API, asegúrese de seguir estos pasos de instalación y configuración:

### Usando npm

1. Si usa npm ejecute: `npm install`

### Usando yarn

2. Si usa yarn ejecute: `yarn`

### Usando pnpm

3. Si usa npm ejecute: `pnpm install`

## Creación de las variables de entorno

Renombre el archivo `.env.template` a `.env` en la raíz del proyecto y configure las siguientes variables:

- `PORT`: Puerto en el que se ejecutará el servidor.
- `FRONT_URL`: URL del frontend o `*` para permitir cualquier origen (para configuración de CORS).
- `MONGODB_URL`: URL de conexión a la base de datos MongoDB.
- `NODE_ENV`: Entorno de la aplicación (p. ej., `DEV`, `PROD`, `TEST`).
- `JWT_SEED`: Clave secreta para la generación de tokens JWT.

## Documentación de Rutas de API

## Ruta de Autenticación (`/api/v1/auth`)

Esta ruta se encarga de gestionar las operaciones de autenticación de usuarios.

### Endpoints Disponibles:

#### Iniciar Sesión

- Método: `POST`
- Ruta: `/login`
- Descripción: Inicia sesión de usuario y emite un token de autenticación.
- Controlador: `loginItem`

#### Registrar Usuario

- Método: `POST`
- Ruta: `/register`
- Descripción: Registra un nuevo usuario en el sistema.
- Controlador: `registerItem`

##### Servicios Relacionados:

- **Servicio de Registro de Usuario**

  - `registerUser`

- **Servicio de Inicio de Sesión de Usuario**

  - `loginUser`

## Ruta de Departamentos (`/api/v1/department`)

Esta ruta se utiliza para administrar información relacionada con los departamentos.

### Endpoints Disponibles:

#### Obtener Todos los Departamentos

- Método: `GET`
- Ruta: `/`
- Descripción: Obtiene la lista de todos los departamentos.
- Controlador: `getItems`

##### Servicios Relacionados:

- **Servicio para Obtener Todos los Departamentos**

  - `getAllDepartments`

- **Servicio para Obtener un Departamento por ID**

  - `getDepartment`

## Ruta de Visitantes (`/api/v1/guest`)

Esta ruta gestiona las operaciones relacionadas con los visitantes.

### Endpoints Disponibles:

#### Obtener Todos los Visitantes

- Método: `GET`
- Ruta: `/`
- Descripción: Obtiene la lista de todos los visitantes.
- Controlador: `getItems`

#### Crear un Nuevo Visitante

- Método: `POST`
- Ruta: `/`
- Descripción: Crea un nuevo visitante.
- Controlador: `createItem`
- Validación de Rol Requerida: Sí (middleware `validateRole`)

#### Obtener Detalles de un Visitante

- Método: `GET`
- Ruta: `/:id`
- Descripción: Obtiene detalles de un visitante específico.
- Controlador: `getItem`

#### Actualizar Información de un Visitante

- Método: `PATCH`
- Ruta: `/:id`
- Descripción: Actualiza la información del estado y nota de un visitante existente.
- Controlador: `updateItem`
- Validación de Rol Requerida: Sí (middleware `validateRole`)

##### Servicios Relacionados:

- **Servicio para Obtener Todos los Visitantes**

  - `getGuests`

- **Servicio para Crear un Nuevo Visitante**

  - `addGuest`

- **Servicio para Obtener un Visitante por ID**

  - `getGuest`

- **Servicio para Actualizar Información de un Visitante**

  - `updateGuest`

## Ruta de Seed de Datos (`/api/v1/seed`)

Esta ruta se utiliza para cargar datos de prueba en la base de datos.

### Endpoints Disponibles:

#### Seed de Datos de Departamentos

- Método: `GET`
- Ruta: `/departments`
- Descripción: Seed de datos iniciales para departamentos.
- Controlador: `loadItems_1`

#### Seed de Datos de Visitantes

- Método: `GET`
- Ruta: `/guests`
- Descripción: Seed datos de prueba para visitantes.
- Controlador: `loadItems_2`

##### Servicios Relacionados:

- **Servicio para Cargar Seed de Datos de Departamentos**

  - `loadDepartmentsSeedToDB`

- **Servicio para Cargar Seed de Datos de Visitantes**

  - `loadGuestsSeedToDB`
