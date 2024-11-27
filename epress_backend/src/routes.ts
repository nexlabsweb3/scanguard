import { Router } from "express";
import { submitProduct, getProductDetails } from "./product";

const router = Router();

router.post("/submit", submitProduct);
router.get('/scan/:productId', getProductDetails);


export default router;
