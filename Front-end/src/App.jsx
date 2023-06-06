import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./Layout/Layout";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RequiredAuth from "./customHooks/RequiredAuth";
import RservationDetails from "./Pages/RservationDetails";
import ReservationList from "./Pages/ReservationList";
import NotFound from "./Pages/NotFound404";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import FAQs from "./Pages/FAQs";
import Footer from "./Layout/Footer";
import Checkout from "./Pages/Checkout";
import Providerprofile from "./Pages/Providerprofile";
import Userprofile from "./Pages/Userprofile";
function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/signup" element={<Signup />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route
              path="/rservationdetails/:id"
              element={<RservationDetails />}
            />
            <Route path="/reservationlist" element={<ReservationList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Checkout/:formData" element={<Checkout />} />
            <Route element={<RequiredAuth />}>
              <Route path="/providerprofile" element={<Providerprofile />} />
              <Route path="/userprofile" element={<Userprofile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
