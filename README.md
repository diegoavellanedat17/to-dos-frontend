# Aplicación de Tareas

## Ingresa al siguiente link para ver la aplicaión web en funcionamiento 🚀 [Mis Tareas](http://54.152.5.128:3000/)

Esta es una aplicación de tareas desarrollada en React que permite a los usuarios crear y actualizar sus tareas de manera sencilla y eficiente.

## Características

- **Autenticación**: Registro e inicio de sesión de usuarios.
- **Gestión de Tareas**: Crear, actualizar, y eliminar tareas.
- **Interfaz de Usuario Responsiva**: Adaptada para dispositivos móviles y de escritorio.
- **Persistencia de Sesión**: Las sesiones de usuario se mantienen activas usando JWT.

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Bootstrap.
- **Backend**: FastAPI (conectado al frontend a través de API REST).
- **Base de Datos**: SQLite (en desarrollo local).

## Requisitos

- **Docker**: Necesario para ejecutar la aplicación en contenedores.
- **Node.js**: Para el desarrollo y construcción del frontend.
- **npm**: Para gestionar dependencias de Node.js.

## Configuración Local

### Paso 1: Clonar el Repositorio

````sh
git clone https://github.com/tu-usuario/to-dos-frontend.git
cd to-dos-frontend# Aplicación de Tareas

Esta es una aplicación de tareas desarrollada en React que permite a los usuarios crear y actualizar sus tareas de manera sencilla y eficiente.

## Características

- **Autenticación**: Registro e inicio de sesión de usuarios.
- **Gestión de Tareas**: Crear, actualizar, y eliminar tareas.
- **Interfaz de Usuario Responsiva**: Adaptada para dispositivos móviles y de escritorio.
- **Persistencia de Sesión**: Las sesiones de usuario se mantienen activas usando JWT.

## Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Bootstrap.
- **Backend**: FastAPI (conectado al frontend a través de API REST).
- **Base de Datos**: SQLite (en desarrollo local).

## Requisitos

- **Docker**: Necesario para ejecutar la aplicación en contenedores.
- **Node.js**: Para el desarrollo y construcción del frontend.
- **npm**: Para gestionar dependencias de Node.js.

## Configuración Local

### Paso 1: Clonar el Repositorio

```sh
git clone https://github.com/tu-usuario/to-dos-frontend.git
cd to-dos-frontend

### Paso 2: Crear el Archivo .env

Crear un archivo .env en el directorio raíz del proyecto y añadir la configuración necesaria. Un ejemplo de configuración puede ser:

```sh
REACT_APP_API_URL=http://localhost:8000


### Paso 3: Construir y Ejecutar con Docker

```sh
docker build -t task-frontend .

Ejecutar el contenedor Docker

```sh
docker run -d -p 3000:3000 --name task-frontend --restart unless-stopped task-frontend

### Paso 4: Acceder a la Aplicación
La aplicación estará disponible en http://localhost:3000.

### Detener y Reiniciar el Contenedor
Para detener el contenedor:


```sh
docker stop task-frontend

Para reiniciar el contenedor:

```sh
docker start react-app

Eliminación del Contenedor y la Imagen

Para eliminar el contenedor:

```sh
docker rm -f react-app

Para eliminar la imagen:
```sh
docker rmi react-app
````

### Los test

```sh
npm test
```
