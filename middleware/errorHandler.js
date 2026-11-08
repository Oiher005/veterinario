// Errores → códigos HTTP (diapositiva «Errores → códigos HTTP»).
// DADO: el manejador básico. Parte 3 (reto): mejóralo. Busca TODO.
//
//   err.name === 'ValidationError'  → 400  (no se cumplen las reglas del esquema)
//   err.name === 'CastError'        → 400  (ID o tipo no válido: /api/vets/abc)
//   err.code === 11000              → 409  (valor duplicado en un campo unique)
//   Otros                           → 500

// TODO (reto): rutas desconocidas → 404 con { error: 'La ruta no existe' }
// De momento no hace nada y Express devuelve su 404 en HTML.
function notFound(req, res, next) {
  next();
}

function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    // TODO (reto): devolver también la lista de campos que fallan.
    // Pista: err.errors es un objeto con un mensaje por cada campo.
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicado', fields: err.keyValue });
  }
  console.error(err);
  res.status(500).json({ error: 'Error del servidor' });
}

module.exports = { errorHandler, notFound };
