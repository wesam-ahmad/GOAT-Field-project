import Navbar from "../Layout/Navbar";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [email, setEmail] = useState("");
  const { formData } = useParams();
  const [selectedPitch, setSelectedPitch] = useState(null); // State to hold the selected pitch
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This line is necessary for some browsers
      return "Data may be lost. Are you sure you want to leave?";
    };

    const handlePopState = () => {
      return "Data may be lost. Are you sure you want to go back?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  // Parse the formData parameter back into an object
  const parsedFormData = JSON.parse(decodeURIComponent(formData));
  console.log(parsedFormData);
  useEffect(() => {
    // Fetch the data from the server
    axios
      .get("http://localhost:5151/getdata")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setSelectedPitch(data[0]); // Set the first pitch as the selected pitch
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);
  const handleExpirationChange = (e) => {
    const value = e.target.value;
    if (value.length <= 7) {
      if (
        value.length === 2 &&
        expirationDate.length === 1 &&
        !value.includes("/")
      ) {
        setExpirationDate(value + "/");
      } else if (
        value.length === 2 &&
        expirationDate.length === 3 &&
        value.endsWith("/")
      ) {
        setExpirationDate(value.slice(0, 1));
      } else {
        setExpirationDate(value);
      }
    }
  };
  function handleMessage() {
    Swal.fire(
      "Booking succeed",
      "You can view your bookings in your profile",
      "success"
    );
    navigate("/");
  }

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^\d]/g, "").slice(0, 16);
    const spacedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(spacedValue);
  };

  const handleSecurityCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setSecurityCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payInfo = {
      card_number: cardNumber.replace(/\s/g, ""), // Remove whitespace from cardNumber
      expiration_date: expirationDate,
      security_code: securityCode,
      name_on_card: nameOnCard,
      email: email,
    };
    try {
      const response = await axios.post("http://localhost:5151/pay", payInfo);
      console.log("Payment successful", response.data);
    } catch (error) {
      console.error("Payment failed", error);
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Retrieve the JWT token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:5151/bookings",
        parsedFormData,
        config
      );
      console.log("Form data submitted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error submitting form data:", error.response.data);
        setErrorMessage("The selected date and time are already booked.");
      } else {
        console.error("Error submitting form data:", error);
      }
    }
  };

  return (
    <div className="relative mx-auto w-full bg-white">
      <Navbar />
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24 mt-28">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-[#54B435] sm:w-20" />
            </h1>
            <form
              onSubmit={handleSubmit}
              action="http://localhost:3000/pay"
              className="mt-10 flex flex-col space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-500"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.capler@fang.com"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="card-number"
                  className="text-xs font-semibold text-gray-500"
                >
                  Card number
                </label>
                <input
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  maxLength="19"
                  required
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Expiration date
                  </label>
                  <input
                    value={expirationDate}
                    onChange={handleExpirationChange}
                    type="text"
                    id="expiration-date"
                    name="expiration-date"
                    placeholder="MM/YY"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="security-code"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Security code
                  </label>
                  <input
                    value={securityCode}
                    onChange={handleSecurityCodeChange}
                    type="text"
                    id="security-code"
                    name="security-code"
                    placeholder="123"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name-on-card"
                  className="text-xs font-semibold text-gray-500"
                >
                  Name on card
                </label>
                <input
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  placeholder="John Capler"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="relative px-5 py-2 font-medium text-white group w-full mt-20"
                onClick={handleMessage}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                <span className="relative">Pay Now</span>
              </button>
            </form>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <img
              src="https://media.discordapp.net/attachments/1084354501642813450/1114238674373185587/payment.png?width=1193&height=671"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {selectedPitch && (
                <li className="flex justify-between">
                  <div className="inline-flex">
                    {
                      <img
                        // src={`data:image/jpeg;base64,${pitch.images[0]}`}

                        src={`data:image/jpeg;base64,${selectedPitch.images}`}
                        alt=""
                        className="max-h-16"
                      />
                    }
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        {selectedPitch.name}
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        {selectedPitch.details}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    ${selectedPitch.price}
                  </p>
                </li>
              )}
            </ul>
            <br />
            <div className="flex gap-4 text-white">
              <div className=" font-bold">Name: </div>
              <div>{parsedFormData.name}</div>
            </div>
            <div className="flex gap-4 mt-2 text-white">
              <div className=" font-bold">Date: </div>
              <div>{parsedFormData.date}</div>
            </div>
            <div className="flex gap-4 mt-2 text-white ">
              <div className=" font-bold">Time: </div>
              <div>{parsedFormData.time}</div>
            </div>
            <div className="flex gap-4 mt-2 text-white">
              <div className=" font-bold">Contact no: </div>
              <div>{parsedFormData.phone}</div>
            </div>

            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30" />
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>{parsedFormData.price} JD</span>
              </p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">
              +962 7853 6541 <span className="font-light">(International)</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              support@GOAT.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
