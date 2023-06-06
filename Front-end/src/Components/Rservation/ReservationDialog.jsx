import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationDialog({ id, price }) {
  console.log(id);
  console.log(price);
  const navigate = useNavigate();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    date: null,
    time: "",
    name: "",
    phone: "",
    pitch_id: id,
    price: price,
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (formData.date) {
      // Fetch available times for the selected date from the backend
      fetchAvailableTimes(formData.date);
    }
  }, [formData.date]);

  const fetchAvailableTimes = (selectedDate) => {
    axios
      .get(`http://localhost:5151/getbookings/${selectedDate}`)
      .then((response) => {
        const allBookings = response.data;

        const allTimes = ["12-14", "14-16", "16-18", "18-20", "20-22", "22-24"];

        const filteredTimes = allTimes.filter(
          (time) => !allBookings.some((obj) => obj.time === time)
        );
        console.log(filteredTimes);

        setAvailableTimes(filteredTimes);
      })
      .catch((error) => {
        console.log("Error fetching available times:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataParam = encodeURIComponent(JSON.stringify(formData));
    navigate(`/checkout/${formDataParam}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
    setErrorMessage("");
    fetchAvailableTimes(date);
  };

  const renderTimeSlots = () => {
    return (
      <select
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        required
      >
        <option value="" selected>
          Please Select Time
        </option>
        {availableTimes.map((timeSlot) => {
          const isReserved = !availableTimes.includes(timeSlot);
          const readOnly = isReserved && formData.time !== timeSlot;

          return (
            <option
              key={timeSlot}
              value={timeSlot}
              disabled={readOnly}
              className={readOnly ? "text-gray-400" : ""}
            >
              {timeSlot}
            </option>
          );
        })}
      </select>
    );
  };

  const handleClickOpen = () => {
    const token = localStorage.getItem("token");
    !token ? navigate("/login/") : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  return (
    <div>
      <Button
        variant="outlined"
        className="btn bg-[#54B435] text-[#54B435]"
        onClick={handleClickOpen}
      >
        Book Now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book now</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-3xl text-center mb-6">
            Football Field Reservation
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="date">
                Date:
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                minDate={today} // Set the minimum selectable date
                dateFormat="dd-MM-yyyy"
                placeholderText="Select date"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="time">
                Time:
              </label>
              {renderTimeSlots()}
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="name">
                Name:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                type="text"
                id="name"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="phone">
                Phone:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                type="tel"
                id="phone"
                name="phone"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="terms"
                name="terms"
                required
              />
              <label className="text-sm" htmlFor="terms">
                I agree to the terms and conditions
              </label>
            </div>
            <div>
              <input
                className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
                type="submit"
                value="Book Now"
              />
            </div>
            {errorMessage && (
              <small className="mt-2 text-red-600">{errorMessage}</small>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// {
//   "data": [
//     {
//       "id": 110,
//       "details": {
//         "date": "2023-05-28T21:00:00.000Z",
//         "time": "14-16"
//       },
//       "name": "hamza dawahreh",
//       "phone": "0787137598"
//     }
//   ]
// }
