const router = require('express').Router();
const Owner = require('../models/Owner');

// GET /api/owners: todos los dueños (DADO, como ejemplo)
router.get('/', async (req, res, next) => {
  try {
    const owners = await Owner.find().sort({ name: 1 });
    res.json(owners);
  } catch (err) { 
    next(err); 
  }
});

// 1. POST /api/owners: crear un dueño
//   - 201 + el dueño creado
//   - Email duplicado → 409 (lo gestiona el manejador de errores, que ya viene dado)
router.post('/', async (req, res, next) => {
  try {
    const newOwner = await Owner.create(req.body);
    res.status(201).json(newOwner);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
