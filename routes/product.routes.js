import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  showEditProduct,
  showProductDashboard,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", isAuthenticated, showProductDashboard);
router.post("/add-product", isAuthenticated, addProduct);
router.post("/get-product", isAuthenticated, showEditProduct);
router.post("/edit-product/:id", isAuthenticated, editProduct);
router.delete("/delete-product/:id", isAuthenticated, deleteProduct);

export default router;
