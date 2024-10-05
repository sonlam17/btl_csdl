import express from "express";
import productsController from "../controllers/AppController.js"
const router = express.Router();

router.get('/',  productsController.index);
router.post('/',  productsController.save);

export default router;