const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate de que el modelo de Usuario está bien importado

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // Extraemos el token del encabezado
  console.log("Token recibido en backend:", token); // Verifica el token que llega al backend

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token
    console.log("Token decodificado:", decoded); // Verifica los datos decodificados

    const user = await User.findByPk(decoded.id); // Usa findByPk para obtener el usuario por el ID del token
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    req.user = user; // Asigna el usuario al objeto `req`
    next(); // Llama al siguiente middleware
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
