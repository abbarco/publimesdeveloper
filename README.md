# **Guía de Instalación y Configuración del Proyecto Publimes**

Este documento describe los pasos necesarios para instalar y ejecutar el backend y frontend del proyecto **Publimes**. Se detallan los requisitos previos, la configuración de la base de datos.

---

## **1. Requisitos Previos**
Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js** (versión recomendada: `>=16.x`)
- **NPM** (se instala con Node.js)
- **Angular CLI** (para el frontend)
- **PostgreSQL** (para la base de datos)
- **Git** (para clonar el repositorio)

Puedes verificar si están instalados con los siguientes comandos:

```bash
node -v
npm -v
ng version
psql --version
git --version
```

## **2. Clonar el Proyecto**
Clona el repositorio en tu máquina local:
```bash
git clone https://github.com/abbarco/publimesdeveloper.git
cd publimes
```

## **3. Configuración del Backend**
El backend está desarrollado en NestJS y requiere una configuración específica antes de ejecutarse.

###3.1 Instalar Dependencias
Accede al directorio del backend e instala las dependencias necesarias:

```bash
cd backend-inventory
npm install
```
### **3.2 Configurar la Base de Datos**
Se debe crear la base de datos manualmente en PostgreSQL antes de ejecutar el backend.

Accede a PostgreSQL:

```bash
psql -U postgres
```
Crea la base de datos Publimes:

sql
```
CREATE DATABASE Publimes;
```
Verifica que la base de datos fue creada
Sal del entorno de PostgreSQL

### **3.3 Configurar Variables de Entorno**
Crea un archivo .env en la raíz de backend-inventory con el siguiente contenido:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=Qwerty123+
DB_NAME=Publimes
```
### **3.4 Ejecutar Migraciones y Seeders**
Una vez configurada la base de datos, ejecuta las migraciones para crear las tablas necesarias:

```bash
npm run migration:run
```
Luego, ejecuta los seeders para poblar la base de datos con datos iniciales:

```bash
npm run seed:run
```
###3.5 Ejecutar el Backend
Finalmente, inicia el servidor backend:

```bash
npm run start
```

El backend estará disponible en:
➡ http://localhost:3000

## **4. Configuración del Frontend**
El frontend está desarrollado en Angular y requiere instalar dependencias antes de ejecutarse.

### **4.1 Instalar Dependencias**
Accede al directorio del frontend e instala las dependencias necesarias:

```bash
cd ../frontend-inventory
npm install
```
### **4.2 Ejecutar el Frontend**
Inicia el servidor de desarrollo de Angular:

```bash
ng serve
```
El frontend estará disponible en:
➡ http://localhost:4200

