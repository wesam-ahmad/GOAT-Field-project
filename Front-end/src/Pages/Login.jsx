import Hero from "../assets/Images/background.png";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      errors,
    };

    try {
      const response = await axios.post(
        "http://localhost:5151/authentication/login",
        formData
      );
      const { token } = response.data;

      // Save the token to local storage

      localStorage.setItem("token", token);

      // Save the token to local storage
      console.log("Data sent successfully");
      navigate("/");
    } catch (error) {
      console.log("Error:", error.message);
    }
    setEmail("");
    setPassword("");
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const formErrors = validateForm({ email, password });

  return (
    <>
      <div className="flex flex-wrap z-100 bg-white mb-40">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 m   d:pt-0">
            <p className="mb-5 text-left text-1xl text-gray-500">Start now</p>
            <p className="text-left text-3xl font-bold">Welcome to GOAT</p>
            <p className="mt-5 text-left text-sm text-gray-500">
              You dont have an account?
              <Link
                to="/signup"
                className="ml-2 text-sm text-green-500 cursor-pointer hover:text-green-800"
              >
                Sign up
              </Link>
            </p>

            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <div className="mt-3">
                    <svg
                      viewBox="0 0 1024 1024"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#82CD47"
                        d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    className="w-full flex-1 appearance-none border-gray-300 border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={email}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className=" focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition w-full">
                  <div className="mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#82CD47"
                        d="M17,9V7c0-2.8-2.2-5-5-5S7,4.2,7,7v2c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C20,10.3,18.7,9,17,9z M9,7c0-1.7,1.3-3,3-3s3,1.3,3,3v2H9V7z M13,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3c0-0.6,0.4-1,1-1s1,0.4,1,1V17z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    className="w-full flex-1 appearance-none border-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={password}
                  />
                </div>
                {formErrors.password && (
                  <p className="text-red-500 mt-1">{formErrors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="relative px-5 py-2 font-medium text-white group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                <span className="relative">Login</span>
              </button>
            </form>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
          <div>
            <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
              <p className="mb-72 text-3xl font-semibold leading-10">
                We work 10x faster than our competitors and stay consistent.
                While theyre bogged down with technical debt, were releasing new
                features.
              </p>
            </div>
            <img
              className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
              src={Hero}
              alt="Background"
            />
          </div>
        </div>
      </div>
    </>
  );
}
