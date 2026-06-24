import express from 'express';
import { getCharacter } from '../controllers/charachter.controller.js';

const router = express.Router();

router.post('/get-character', getCharacter);

export default router;
