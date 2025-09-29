import { UserModel } from "../models/mongoose/user.model.js";
import { singToken, verifyToken} from "../helpers/jwt.helper.js" ;
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";

export const register = async (req, res) => {
    const { username, email, password, role, profile } = req.body;
    try {
        const hashedPwd = await hashPassword(password);
        const newUser = new UserModel({ username, email, password: hashedPwd, role, profile });
        await newUser.save();
        res.status(201).json(newUser);
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
     const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = singToken({ id: user._id, role: user.role });
        res.status(200).json({ token });
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
