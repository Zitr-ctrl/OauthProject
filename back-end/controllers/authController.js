const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importamos el modelo de Sequelize

// Registro de usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  // Verificamos si el usuario ya existe
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ message: "Usuario ya registrado" });

  // Hasheamos la contraseña
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  res.json({ message: "Usuario registrado" });
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener usuario autenticado
exports.getUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del header

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodificar el token
    const user = await User.findByPk(decoded.id); // Buscar al usuario por el ID del token

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user });  // Devuelve los datos del usuario al frontend
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
