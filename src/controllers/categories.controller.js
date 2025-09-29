import { CategoryModel } from "../models/mongoose/category.model.js";
import { AssetModel } from "../models/mongoose/asset.model.js";

export const createCategory = async (req, res) => {
  const { name, description} = req.body;
  try {
    const newCategory = new CategoryModel({ name, description })
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryModel.find().populate('Category')
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedcategory = await CategoryModel.findByIdAndDelete(id);
        if (!deletedcategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

//Asignar category a un asset (esto es para la relacion N:M)


export const assignCategoryToAsset = async (req, res) => {
  const { categoryId, assetId } = req.body;
  try {
    const category = await AssetModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const asset = await AssetModel.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset no encontrado" });
    }

    if (!asset.categorys.includes(categoryId)) {
      asset.categorys.push(categoryId);
    }

    await asset.save();
    await asset.populate("categorys");

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({
      message: "Error al asignar la Categoría al Asset",
      error,
    });
  }
};

//quitar category

export const unassignCategoryToAsset = async (req, res) => {
  const { categoryId, assetId } = req.body;
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    const asset = await assetModel.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset no encontrado" });
    }


    asset.categorys = asset.categorys.filter(
      (id) => id.toString() !== categoryId.toString()
    );

    await asset.save();
    await asset.populate("categorys");

    res.status(200).json({
      message: "Categoria removida del Asset correctamente",
      asset,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al quitar la categoria del Asset",
      error,
    });
  }
};

//no es lo pedido, pero es la manera que use y me acostumbré