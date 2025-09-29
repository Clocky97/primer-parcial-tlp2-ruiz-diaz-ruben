import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  assignCategoryToAsset,
  unassignCategoryToAsset
} from "../controllers/categories.controller.js";

export const categoryRoutes = Router();

// * crear una categoria (usuario autenticado que sea admin)
categoryRoutes.post("/categories",authMiddleware, createCategory);

// * obtener todas las categorias (usuario autenticado)
categoryRoutes.get("/categories",authMiddleware, getAllCategories);

// * eliminar una categoria por id (usuario autenticado que sea admin)
categoryRoutes.delete("/categories/:id",authMiddleware, deleteCategory);

//asignarle y quitarle una categoria a un asset

categoryRoutes.post("/category/:id/category",authMiddleware, assignCategoryToAsset);
categoryRoutes.delete("/category/:id/category/:categoryId",authMiddleware, unassignCategoryToAsset);
