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
router.get('/upcoming', async (req, res, next) => {
  try {
    const { vet } = req.query;
    
    const filter = {
      date: { $gte: new Date() },
      status: 'scheduled'
    };

    if (vet) {
      filter.vet = vet;
    }

    const appointments = await Appointment.find(filter)
      .sort({ date: 1 })
      .populate({ path: 'vet', select: 'name speciality' })
      .populate({
        path: 'pet',
        select: 'name species',
        populate: {
          path: 'owner',
          select: 'name email'
        }
      });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

// 4. POST /api/appointments: crear una cita
router.post('/', async (req, res, next) => {
  try {
    const { pet, vet } = req.body;

    const petExists = await Pet.exists({ _id: pet });
    const vetExists = await Vet.exists({ _id: vet });

    if (!petExists || !vetExists) {
      return res.status(400).json({ error: 'La mascota o el veterinario especificados no existen' });
    }

    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (err) {
    next(err);
  }
});

// 6. DELETE /api/appointments/past: eliminar las citas pasadas
router.delete('/past', async (req, res, next) => {
  try {
    const result = await Appointment.deleteMany({ date: { $lt: new Date() } });
    res.json({ deleted: result.deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
