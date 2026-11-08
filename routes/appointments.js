const router = require('express').Router();
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Vet = require('../models/Vet');

// GET /api/appointments: todas las citas (DADO)
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) { next(err); }
});

// 5. GET /api/appointments/upcoming: próximas citas programadas, ordenadas por fecha
//    - Solo las de hoy en adelante y con status 'scheduled'
//    - Filtro opcional: ?vet=<id> → solo las de ese veterinario
//    - populate: veterinario (name, speciality) y mascota (name, species) → su dueño (name, email)
//    - Pista: es parecido al ejemplo de la diapositiva «Relaciones: populate()»
router.get('/upcoming', async (req, res, next) => {
  // TODO
  res.status(501).json({ error: 'Sin implementar' });
});

// 4. POST /api/appointments: crear una cita
//    - Comprueba que existen la mascota y el veterinario (Pet.exists / Vet.exists, o findById)
//    - Si no existen → 400
//    - 201 + la cita creada
router.post('/', async (req, res, next) => {
  // TODO
  res.status(501).json({ error: 'Sin implementar' });
});

// 6. DELETE /api/appointments/past: eliminar las citas pasadas
//    - deleteMany + { $lt: new Date() } sobre la fecha
//    - Respuesta: { deleted: <número de citas eliminadas> } (pista: deletedCount)
router.delete('/past', async (req, res, next) => {
  // TODO
  res.status(501).json({ error: 'Sin implementar' });
});

module.exports = router;
