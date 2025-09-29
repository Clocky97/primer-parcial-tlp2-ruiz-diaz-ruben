export const getAllUsers = async (_req, res) => {
  try {
   const users = await UserModel.find().populate('owner', 'username email');
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

//soft delete

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndUpdate(id, { deleted: true });
    return res.status(204).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
