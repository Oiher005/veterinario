const router = require('express').Router();
const Vet = require('../models/Vet');

// POST /api/vets: crear un veterinario (DADO)
router.post('/', async (req, res, next) => {
  try {
    const vet = await Vet.create(req.body);
    res.status(201).json(vet);
  } catch (err) { next(err); }
});

// 2. GET /api/vets?day=lunes&speciality=perros
router.get('/', async (req, res, next) => {
  try {
    const { day, speciality } = req.query;
    const conditions = [];

    if (day) {
      conditions.push({ availableDays: String(day) });
    }
    if (speciality) {
      conditions.push({ speciality: String(speciality) });
    }

    let filter = {};
    if (conditions.length === 1) {
      filter = conditions[0]; 
    } else if (conditions.length > 1) {
      filter = { $or: conditions }; 
    }

    const vets = await Vet.find(filter);
    res.json(vets);
  } catch (err) {
    next(err);
  }
});

// 3. PATCH /api/vets/:id: actualizar el email del veterinario
router.patch('/:id', async (req, res, next) => {
  try {
    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      { email: req.body.email },
      { returnDocument: 'after', runValidators: true }
    );

    if (!vet) {
      return res.status(404).json({ error: 'Veterinario no encontrado' });
    }

    res.json(vet);
  } catch (err) {

    next(err);
  }
});

module.exports = router;
