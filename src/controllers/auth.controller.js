const pool = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const {
    dni,
    email,
    name_lastname,
    username,
    pass,
    passConfirm,
    id_bank,
    role,
  } = req.body;
  let roles = req.body.role;

  pool.query(
    "SELECT * FROM clients WHERE email=?",
    [email],
    async (error, results) => {
      if (results.length > 0)
        return res
          .status(400)
          .json({ message: "That email is already in use" });

      if (pass !== passConfirm)
        return res.status(400).json({ message: "Passwords do no match" });

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

      let hashedPassword = await bcrypt.hash(pass, 8);

      const client = {
        dni,
        email,
        name_lastname,
        username,
        pass: hashedPassword,
        id_bank,
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
    const { username, pass } = req.body;
    console.log("req", req.body);
    if (!username || !pass) {
      return res.status(400).json({
        message: "Please provide an username and password",
      });
    }

    const clients = await pool.query("SELECT * FROM clients WHERE username=?", [
      username,
    ]);

    if (!clients[0]) res.status(400).json({ message: "Client Not Found" });

    const matchPassword = await bcrypt.compare(pass, clients[0].pass);

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const token = jwt.sign(
      { id: clients[0].id, name: clients[0].name_lastname, username: clients[0].username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ name: clients[0].name_lastname, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
