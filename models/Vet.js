const { Schema, model } = require('mongoose');

// Parte 1 · Modelo Vet
//   name:          String, obligatorio
//   speciality:    String, obligatorio (p. ej. 'perros', 'gatos', 'aves')
//   email:         opcional, pero si existe debe cumplir el patrón (match)
//   availableDays: lista de String (p. ej. ['lunes', 'miércoles'])

const vetSchema = new Schema({
  // TODO
});

module.exports = model('Vet', vetSchema);
