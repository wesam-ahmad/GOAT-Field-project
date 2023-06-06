const router = require("express").Router();
router.post("/bookings", (req, res) => {
  const { date, time, name, phone } = req.body;

  try {
    const userId = req.user_id; // Access the userId from req.userId
    console.log(userId);
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
              "INSERT INTO bookings (date, time, name, phone, user_id) VALUES ($1, $2, $3, $4, $5)";
            pool.query(
              query,
              [date, time, name, phone || null, userId],
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
module.exports = router;
