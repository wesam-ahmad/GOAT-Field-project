const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const {jwtGenerator} = require("../utils/jwtGenerator");
const validInfo = require("../middleware/UservalidInfo");
const authorization = require("../middleware/authorization");
// Register route



router.post("/register", validInfo, async (req, res) => {
  try {
    const  { name, email, password, role } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists. Please log in.");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role]
    );

   

    const token = jwtGenerator(newUser.rows[0]);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Login route
router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or password is incorrect");
    } 

   const user_info = user.rows[0];
  

    const token = jwtGenerator(user_info);
    return res.json({ token }); // Use "return" to terminate the function after sending the response
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name, role FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});





module.exports = router;