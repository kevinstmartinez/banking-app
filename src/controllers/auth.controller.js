const pool = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const {
    cedula,
    nombres,
    email ,
    telefono,
    pin,
    role
  } = req.body;
  let roles = req.body.role;

  pool.query(
    "SELECT * FROM clients WHERE cedula=?",
    [email],
    async (error, results) => {
      if (results.length > 0)
        return res
          .status(400)
          .json({ message: "That cedula is already in use" });

      if (roles) {
        const foundRole = await pool.query("SELECT * FROM roles WHERE role=?", [
          roles,
        ]);
        roles = foundRole.map((role) => role.id);
      } else {
        const role = await pool.query("SELECT * FROM roles WHERE role=?", [
          "user",
        ]);
        roles = role[0].id;
      }

      let hashedPassword = await bcrypt.hash(pin, 8);

      const client = {
        cedula,
        nombres,
        email ,
        telefono,
        pin: hashedPassword,
        id_role: roles,
      };

      await pool.query("INSERT INTO clients set ?", [client]);

      const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.status(200).json({ token });
    }
  );
};

const login = async (req, res) => {
  try {
    const { telefono, pin } = req.body;
    console.log("req", req.body);

    if (!telefono || !pin) {
      return res.status(400).json({
        message: "Please provide a phone and pin",
      });
    }

    const clients = await pool.query("SELECT * FROM clients WHERE telefono=?", [
      telefono,
    ]);

  

    if (!clients[0]) res.status(400).json({ message: "Client Not Found" });

    const matchPassword = await bcrypt.compare(pin, clients[0].pin);

    console.log(matchPassword)

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid Pin" });

    const token = jwt.sign(
      { id: clients[0].id, name: clients[0].nombres, email: clients[0].email, telefono: clients[0].telefono },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
