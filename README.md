# API de veterinaria · Proyecto inicial

La clínica necesita una API REST para gestionar dueños, mascotas, veterinarios y citas.
Están listos Express, la conexión, el manejador de errores y los ejemplos de las diapositivas
(`Owner`, `Pet` y `/api/pets`): tú tienes que completar el resto de modelos y endpoints.
Busca la palabra `TODO` en los ficheros.

## Arrancar

```bash
npm install     # la primera vez también descarga MongoDB (~100 MB)
npm run dev     # http://localhost:3000 (se reinicia al guardar un fichero)
```

No hay que instalar ni configurar nada: sin `.env`, MongoDB arranca **en memoria** y los datos
de ejemplo se cargan automáticamente (2 dueños, 4 mascotas, 3 veterinarios, 6 citas).

- Al reiniciar el servidor, los datos vuelven al estado inicial: lo que hayas creado desaparece
  y hay que volver a ejecutar las peticiones de creación de `requests.http`.
- Para ver los datos en Compass: copia la URI que el servidor imprime en la consola.
- Para usar una base de datos real (local o Atlas): `.env.example` → `.env`. El código no cambia.

## Estructura

```
veterinaria-api/
├── server.js                  DADO: Express, rutas y middleware de errores
├── db.js                      DADO: conexión (en memoria o MONGODB_URI)
├── seed.js                    DADO: datos de ejemplo (se cargan al arrancar)
├── requests.http              DADO: todas las pruebas
├── middleware/errorHandler.js DADO (parte 3: reto)
├── models/
│   ├── Owner.js               DADO (el de las diapositivas): comprobar
│   ├── Pet.js                 DADO (el de las diapositivas): comprobar
│   ├── Vet.js                 Parte 1
│   └── Appointment.js         Parte 1
└── routes/
    ├── pets.js                DADO (el de las diapositivas): usar como modelo
    ├── owners.js              Parte 2
    ├── vets.js                Parte 2
    └── appointments.js        Parte 2
```

Si has usado Express Generator: lo que allí está en `app.js` (configuración y rutas) y en `bin/www`
(`app.listen()`), aquí está en un solo fichero, `server.js`.

## Parte 1 · Modelos (`models/`)

| Modelo | Qué hacer | Campos |
|---|---|---|
| Owner | Dado: comprueba que cumple las condiciones | `name` (obligatorio) · `email` (obligatorio, único, con @) |
| Pet | Dado: comprueba que cumple las condiciones | `name` · `species`: dog, cat, bird · `owner` → Owner · `vaccines`: lista embebida |
| Vet | **Lo haces tú** | `name`, `speciality` (obligatorios) · `email` (opcional, pero si existe debe cumplir el patrón) · `availableDays`: lista de textos |
| Appointment | **Lo haces tú** | `date`, `reason` (obligatorios) · `status`: scheduled, done, cancelled (por defecto scheduled) · `pet` → Pet · `vet` → Vet |

Al terminar, reinicia el servidor: los datos de ejemplo se cargan con tus modelos. Si hay algún
error en los modelos, aparecerá un aviso en la consola. Comprueba en Compass que los documentos
tienen todos los campos.

## Parte 2 · Endpoints (`routes/`)

Usa `routes/pets.js` como modelo: tiene los ejemplos de POST, GET, PATCH y DELETE de las diapositivas.
Esenciales: 1, 3 y 4. El resto, ampliación.

| # | Ruta | A tener en cuenta |
|---|---|---|
| 1 | `POST /api/owners` | 201 · email duplicado → 409 |
| 2 | `GET /api/vets?day=…&speciality=…` | `$or` solo con los parámetros recibidos; ninguno → todos |
| 3 | `PATCH /api/vets/:id` | actualizar el email · `runValidators: true` · si no existe → 404 |
| 4 | `POST /api/appointments` | comprueba que existen la mascota y el veterinario; si no → 400 |
| 5 | `GET /api/appointments/upcoming` | `populate`: pet → owner, vet · solo `scheduled` · filtro opcional `?vet=id` |
| 6 | `DELETE /api/appointments/past` | `deleteMany` + `$lt: new Date()` · `{ deleted: N }` (`deletedCount`) |

## Parte 3 · Reto (`middleware/errorHandler.js`)

El manejador básico ya viene hecho: ValidationError / CastError → 400 · E11000 → 409 · otros → 500.
Mejóralo (busca `TODO`):

- Rutas desconocidas → 404 en JSON (función `notFound`).
- En los errores de validación, devuelve también la lista de campos que fallan (`err.errors`).

## Probar

- `requests.http`: en VS Code con la extensión "REST Client", pulsa "Send Request" encima de cada petición.
- Thunder Client, Postman o curl:

```bash
curl -X POST http://localhost:3000/api/owners \
  -H "Content-Type: application/json" \
  -d '{"name":"Carmen","email":"carmen@mail.com"}'
```

Para volver a los datos iniciales: reinicia el servidor.

## Preguntas para la puesta en común

1. ¿Embeber o referenciar el nombre y el email del veterinario dentro de la cita? ¿Qué pasa si cambia el email?
2. Al eliminar una mascota, ¿qué hacer con sus citas? ¿Quién lo gestiona: las rutas o un hook?
3. ¿Qué endpoint necesita `populate()`? ¿Cuántas consultas se hacen por detrás?
