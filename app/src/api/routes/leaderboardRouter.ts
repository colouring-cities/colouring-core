import express from 'express';

import leaderboardController from '../controllers/leaderboardController';

const router = express.Router();

router.get('/leaders', leaderboardController.getLeaders);

export default router;
