const { Schema, model } = require('mongoose');

// Parte 1 · Modelo Appointment
//   date:   Date, obligatorio
//   reason: String, obligatorio
//   status: 'scheduled' | 'done' | 'cancelled' (enum), por defecto 'scheduled'
//   pet:    ObjectId → Pet, obligatorio
//   vet:    ObjectId → Vet, obligatorio

const appointmentSchema = new Schema({
  // TODO
});

module.exports = model('Appointment', appointmentSchema);
