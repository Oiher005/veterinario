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
//    - Los que atienden ese día O tienen esa especialidad ($or)
//    - Si solo llega uno de los parámetros, usar solo ese
//    - Si no llega ninguno, todos los veterinarios (¡un $or vacío da error!)
//    - Pista: { availableDays: 'lunes' } busca dentro del array
  //    - Convierte cada parámetro a texto con String(): así nadie puede colar un objeto
  //      (por ejemplo { $ne: null }) en el filtro (inyección NoSQL)
router.get('/', async (req, res, next) => {
  // TODO
  res.status(501).json({ error: 'Sin implementar' });
});

// 3. PATCH /api/vets/:id: actualizar el email del veterinario
//    - findByIdAndUpdate(id, cambios, { returnDocument: 'after', runValidators: true })
//    - Si no existe → 404
//    - Email no válido → 400
router.patch('/:id', async (req, res, next) => {
  // TODO
  res.status(501).json({ error: 'Sin implementar' });
});

module.exports = router;
