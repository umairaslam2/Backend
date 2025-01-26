import express from 'express';

const router = express.Router();

// Example admin routes
router.get('/applications', (req, res) => {
  res.send('Admin applications route');
});

router.post('/schedule', (req, res) => {
  res.send('Admin schedule appointment route');
});

export default router;
