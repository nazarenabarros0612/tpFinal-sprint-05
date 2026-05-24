# TP Final Sprint 5

Aplicación web desarrollada con Node.js, Express, MongoDB y EJS.

El proyecto permite importar países desde una API externa, almacenarlos en MongoDB y realizar operaciones CRUD completas.

También incluye búsqueda, paginación, exportación CSV y estadísticas generales.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Bootstrap
- Axios
- express-validator
- method-override

---

# Funcionalidades

- Importación de países desde API externa
- CRUD completo
- Validaciones backend
- Dashboard con estadísticas
- Búsqueda por nombre
- Paginación
- Exportación CSV

---

# Instalación y ejecución

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://grupo-02:grupo-02@cluster0.blryo.mongodb.net/NodeMod3Cohorte5
```

Iniciar servidor:

```bash
node app.js
```

Abrir en navegador:

```txt
http://localhost:3000
```

---

# Funciones avanzadas implementadas

- Búsqueda
- Paginación
- Exportación CSV
- Promedio Gini

---

## Nota sobre MongoDB

Para desarrollar y probar el proyecto se utilizó MongoDB Compass local.

Al probar el cluster compartido de MongoDB Atlas proporcionado para la cursada, se presentaron problemas de permisos del usuario para algunas operaciones sobre la colección.

Por ese motivo, para ejecutar correctamente el proyecto se recomienda configurar la variable `MONGO_URI` con una conexión local o con un cluster MongoDB propio.

# Deploy

pendiente

---

# Repositorio GitHub

https://github.com/nazarenabarros0612/tpFinal-sprint-05.git

---

# Autor

Nazarena Barros