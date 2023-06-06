const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const authorization = require("./middleware/authorization");
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const port = 5151;
const pool = require("./db");
const { getItem } = require("./utils/jwtGenerator");

pool.connect().then(() => {
  app.listen(port, () => {
    console.log("Server working on port " + port);
  });
});

app.get("/countusers", async (req, res) => {
  try {

    const usersnum = await pool.query("SELECT COUNT(*) FROM users")
    res.json(usersnum.rows[0])

  } catch (err) {
    console.error(err.message);
  }
})
app.get("/countfields", async (req, res) => {
  try {

    const usersnum = await pool.query("SELECT COUNT(*) FROM pitch")
    res.json(usersnum.rows[0])

  } catch (err) {
    console.error(err.message);
  }
})
app.get("/countreservations", async (req, res) => {
  try {

    const usersnum = await pool.query("SELECT COUNT(*) FROM bookings")
    res.json(usersnum.rows[0])

  } catch (err) {
    console.error(err.message);
  }
})

app.post("/pay", async (req, res) => {
  try {
    const { email, card_number, expiration_date, security_code, name_on_card } =
      req.body;

    // Hash the payment information
    const saltRounds = 10;
    const hashedCardNumber = await bcrypt.hash(card_number, saltRounds);
    const hashedSecurityCode = await bcrypt.hash(security_code, saltRounds);

    const addPayInfo = await pool.query(
      "INSERT INTO payment (email, card_number, expiration_date, security_code, name_on_card) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        email,
        hashedCardNumber,
        expiration_date,
        hashedSecurityCode,
        name_on_card,
      ]
    );
    res.json(addPayInfo.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment." });
  }
});

// Routes
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/ser", require("./routes/serviceProvider"));

app.get("/getbookings/:selectedDate", (req, res) => {
  const selectedDate = new Date(req.params.selectedDate);
  const selectedUTCDate = new Date(
    selectedDate.getUTCFullYear(),
    selectedDate.getUTCMonth(),
    selectedDate.getUTCDate()
  );

  pool.query(
    "SELECT * FROM bookings WHERE date::date = DATE($1)",
    [selectedUTCDate],
    (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        const bookings = result.rows;
        console.log(bookings);
        res.json(bookings);
      }
    }
  );
});

app.post("/senddata", upload.array("images", 3), (req, res) => {
  const files = req.files;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const userId = getItem(token).user_id;

  const { name, price, size, details, description, location } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).send("No images provided");
  }

  const imageDatas = files.map((file) => file.buffer);

  // Insert data into the database
  const query =
    "INSERT INTO pitch (name, price, size, details, images, description, location,provider_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *;";
  const values = [
    name,
    price,
    size,
    details,
    imageDatas,
    description,
    location,
    userId,
  ];

  pool
    .query(query, values)
    .then((result) => {
      const insertedPitch = result.rows[0];
      console.log("Data sent");
      res.send(insertedPitch); // Send the inserted pitch data to the client
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
    });
});

app.put("/updatedata/:id", upload.array("images", 3), (req, res) => {
  const pitchId = req.params.id; // Retrieve the pitch ID from the request parameters
  const files = req.files;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const userId = getItem(token).user_id;

  const { name, price, size, details, description, location } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).send("No images provided");
  }

  // Process the files as needed

  // Update data in the database
  const query = `
    UPDATE pitch 
    SET name = $1, price = $2, size = $3, details = $4, images = $5, description = $6, location = $7
    WHERE id = $8 AND provider_id = $9
    RETURNING *;
  `;
  const imageDatas = files.map((file) => file.buffer);
  const values = [
    name,
    price,
    size,
    details,
    imageDatas,
    description,
    location,
    pitchId,
    userId,
  ];

  pool
    .query(query, values)
    .then((result) => {
      const updatedPitch = result.rows[0];
      console.log("Data updated");
      res.send(updatedPitch); // Send the updated pitch data to the client
    })
    .catch((error) => {
      console.error("Error updating data:", error);
      res.status(500).send("Error updating data");
    });
});


app.put("/api/update", async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.query.user_id; // Access the user ID from the authorization middleware

    // Update the user profile in the database
    const updatedUser = await pool.query(
      "UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING *",
      [username, email, userId]
    );

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/getdata", (req, res) => {
  const user_id = req["query"].user_id;

  const query = "SELECT * FROM pitch where provider_id = $1 ";
  const value = [user_id];
  pool
    .query(query, value)

    .then((result) => {
      const pitches = result.rows.map((pitch) => {
        const base64ImageDatas = pitch.images.map((imageData) =>
          Buffer.from(imageData).toString("base64")
        );
        return { ...pitch, images: base64ImageDatas };
      });
      res.json(pitches);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      const errorMessage = "Error retrieving data";
      res.status(500).json({ error: errorMessage });
    });
});



app.get("/getdatas", (req, res) => {
  const query = "SELECT * FROM pitch;";

  pool
    .query(query)
    .then((result) => {
      const pitches = result.rows.map((pitch) => {
        const base64ImageDatas = pitch.images.map((imageData) =>
          Buffer.from(imageData).toString("base64")
        );
        return { ...pitch, images: base64ImageDatas };
      });
      res.json(pitches);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      const errorMessage = "Error retrieving data";
      res.status(500).json({ error: errorMessage });
    });
});






app.delete("/deletepitch/:id", (req, res) => {
  const pitchId = req.params.id;
  const query = "DELETE FROM pitch WHERE id = $1;";

  pool
    .query(query, [pitchId])
    .then(() => {
      console.log("Pitch deleted");
      res.sendStatus(204); // Send a success status code
    })
    .catch((error) => {
      console.error("Error deleting pitch:", error);
      const errorMessage = "Error deleting pitch";
      res.status(500).json({ error: errorMessage });
    });
});
app.get('/get-user-data', async (req, res) => {
  try {
    const userId = req.query.user_id;
    
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userData = user.rows[0];
    
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use(authorization);
app.post("/bookings", (req, res) => {

  const { date, time, name, phone, pitch_id } = req.body;
  try {
    const userId = req.user_id; // Access the userId from req.userId
 
    // Check if the desired date and time slot is available
    pool.query(
      "SELECT * FROM bookings WHERE date = $1 AND time = $2",
      [date, time],
      (error, result) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).send("Internal Server Error");
        } else {
          const existingBooking = result.rows[0];
          // If a booking already exists for the same date and time, send an error response
          if (existingBooking) {
            res.status(400).json({
              message: "The selected date and time are already booked.",
              existingBooking: existingBooking,
            });
          } else {
            // Insert the new booking into the table, associating it with the user ID
            const query =
              "INSERT INTO bookings (date, time, name, phone, pitch_id, user_id) VALUES ($1, $2, $3, $4, $5, $6)";
            pool.query(
              query,
              [date, time, name, phone, pitch_id || null, userId],
              (error, result) => {
                if (error) {
                  console.error(
                    "Error inserting data into the bookings table:",
                    error
                  );
                  res
                    .status(500)
                    .send("Error inserting data into the bookings table");
                } else {
                  console.log("Form data inserted successfully!");
                  res.sendStatus(200);
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error); // Log the token verification error
    return res.status(401).json({ message: "Invalid token" });
  }
});
app.get("/history", (req, res) => {
  const userId = req.user_id; // Access the userId from req.userId

  const query =
    "SELECT * FROM bookings b JOIN pitch p ON b.pitch_id = p.id WHERE b.user_id = $1";
  pool
    .query(query, [userId])
    .then((result) => {
      const bookings = result.rows;
      res.json(bookings);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      const errorMessage = "Error retrieving data";
      res.status(500).json({ error: errorMessage });
    });
});
