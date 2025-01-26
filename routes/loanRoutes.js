import express from 'express';

const router = express.Router();

// Example loan routes
router.post('/request', (req, res) => {
  res.send('Submit loan request route');
});

router.get('/:id', (req, res) => {
  res.send(`Fetch loan details for loan ID: ${req.params.id}`);
});

export default router;
