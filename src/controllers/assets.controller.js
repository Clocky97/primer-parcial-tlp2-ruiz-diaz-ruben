import { AssetModel } from "../models/mongoose/asset.model.js";

export const createAsset = async (req, res) => {
    const { inventoryNumber, description, brand, model, status, adquisitionDate, adquisitionValue, owner } = req.body;
    try {
        const newAsset = new AssetModel({ inventoryNumber, description, brand, model, status, adquisitionDate, adquisitionValue, owner })
    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    const assets = await AssetModel.find().populate('User')
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
        const { id } = req.params;
    try {
        const asset = await AssetModel.findById(id).populate('author', 'username email');
        if (!asset) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }};

export const deleteAsset = async (req, res) => {
    const { id } = req.params;
    try {
        await AssetModel.findByIdAndDelete(id);
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
