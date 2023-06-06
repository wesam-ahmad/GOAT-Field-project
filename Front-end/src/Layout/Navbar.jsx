import hero from "../../public/videos/goathero3.mp4";
import {
  AirportShuttleOutlined,
  AttractionsOutlined,
  CurrencyExchangeOutlined,
  DirectionsCarOutlined,
  HelpOutlineOutlined,
  HotelOutlined,
  HowToRegOutlined,
  LoginOutlined,
  LogoutOutlined,
  NightShelterOutlined,
  SearchOutlined,
  TranslateOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Wrapper = styled.header`
  /* border: 1px solid blue; */
  /* background-image: linear-gradient(90deg, #1958b2, #003580); */
  color: white;
  padding: 0px 150px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 1200px) {
    padding: 0px 30px;
  }

  @media screen and (max-width: 950px) {
    padding: 0px 15px;
  }
`;

const NavContainer = styled.nav`
  /* border: 1px solid yellow; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const LogoContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  flex: 1;

  span {
    /* border: 1px solid black; */
    width: 250px;
    font-size: 30px;
    font-weight: 600;

    @media screen and (max-width: 950px) {
      width: 145px;
      font-size: 25px;
    }
  }
`;

const BtnContainer = styled.div`
  /* border: 1px solid black; */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 675px) {
    display: none;
  }

  span {
    font-size: 17px;
    margin: 0px 20px;
    cursor: pointer;
  }

  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
  }

  .help-icon {
    font-size: 28px;
    margin-right: 20px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: 1px solid white;
  background-color: white;
  width: 80px;
  padding: 9px 10px;
  margin-right: 10px;
  color: #54b435;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;

  @media screen and (max-width: 950px) {
    padding: 7px;
    margin-right: 7px;
    font-size: 13px;
    width: 70px;
  }

  &:hover {
    color: white;
    background-color: transparent;
  }

  &.bigBtn {
    background-color: transparent;
    color: white;
    width: 150px;

    @media screen and (max-width: 950px) {
      width: 125px;
    }

    &:hover {
      background-color: #00000061;
    }
  }
`;

// ----------------Mobile Hamburger Icon Style--------------------

const ImgAndHamburgerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (min-width: 675px) {
    display: none;
  }

  img {
    background-color: whitesmoke;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    object-fit: cover;
  }

  .hamburger {
    /* border: 1px solid red; */
    width: 32px;
    height: 27px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    cursor: pointer;

    span {
      background-color: white;
      width: 100%;
      height: 4px;
      transform-origin: left;
      transition: all 0.2s ease;
    }
  }

  .close-hamburger {
    span {
      &:first-of-type {
        transform: rotate(45deg);
      }

      &:nth-of-type(2) {
        opacity: 0;
      }

      &:last-of-type {
        transform: rotate(-45deg);
      }
    }
  }
`;

// ----------------End of Hamburger Style---------------------

const SecondNavContainer = styled.nav`
  /* border: 1px solid yellow; */
  display: flex;
  align-items: center;
  height: 77px;

  @media screen and (max-width: 950px) {
    height: 50px;
  }

  /* For Mobile Phone etc */
  @media screen and (max-width: 675px) {
    background-color: #186f67;
    z-index: 100000;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 60px;
    right: 0px;
    width: 100vw;
    height: calc(100vh - 60px);
    overflow-y: scroll;
    padding: 10px 30px;
    transform: translateX(${({ openMenu }) => (openMenu ? 0 : 100)}vw);
    transition: all 0.2s ease-out;
  }

  h3 {
    padding: 15px 5px;
    border-bottom: 1px solid #4f5874;
    width: 100%;
    display: none;
    @media screen and (max-width: 675px) {
      display: block;
    }
  }

  ul {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    list-style: none;

    &.hidden-ul {
      display: none;
      @media screen and (max-width: 675px) {
        display: flex;
      }
    }

    /* For Mobile Phone etc*/
    @media screen and (max-width: 675px) {
      flex-direction: column;
      align-items: flex-start;
      order: 2;
      width: 100%;
      border-bottom: 1px solid #4f5874;
      padding: 5px 0px;

      &:last-child {
        border-bottom: none;
      }
    }

    .link {
      text-decoration: none;
      color: white;

      /* For Mobile Phone etc*/
      @media screen and (max-width: 675px) {
        margin: 5px 0px;
      }
    }

    li {
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      padding: 10px 14px;
      font-size: 18px;
      cursor: pointer;

      @media screen and (max-width: 1025px) {
        margin-right: 5px;
        padding: 6px 12px;
        font-size: 15px;
      }

      @media screen and (max-width: 950px) {
        margin-right: 3px;
        padding: 2px 7px;
        font-size: 14px;
      }

      /* For Mobile Phone etc*/
      @media screen and (max-width: 675px) {
        border: none;
        background-color: transparent;
      }

      &:hover {
        border: 1px solid white;
        border-radius: 30px;

        /* For Mobile Phone */
        @media screen and (max-width: 675px) {
          border: none;
          border-radius: 0px;
        }
      }

      &.active {
        border: 1px solid white;
        border-radius: 30px;

        /* For Mobile Phone */
        @media screen and (max-width: 675px) {
          border: none;
          border-radius: 0px;
        }
      }

      .li-icon {
        margin-right: 8px;

        /* For Mobile Phone */
        @media screen and (max-width: 675px) {
          margin-right: 12px;
          /* color: #2874f0; */
        }
      }
    }
  }
`;

const Navbar = () => {
  const token = localStorage.getItem("token");
  let username = "";
  let role = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username = decodedToken.username;
      role = decodedToken.role;
      // Use the extracted username and role variables as needed
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle the error (e.g., show an error message, redirect the user, etc.)
    }
  } else {
    console.error("No token found in localStorage");
    // Handle the case where there is no token (e.g., show an error message, redirect the user, etc.)
  }

  // Use the username and role variables outside the if statement
  // console.log("Username:", username);
  // console.log("Role:", role);
  // Use the extracted username and role variables as needed

  const [openMenu, setOpenMenu] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 1,
    room: 1,
  });

  return (

    <Wrapper className="bg-[#161616]">
      <NavContainer>
        <LogoContainer>
          <span>🐐GOAT FIELD</span>
        </LogoContainer>

        <BtnContainer>
          {token && role == "serviceProvider" ? (
            <Link to="/providerprofile">
              <p className="mr-8">{username}</p>
            </Link>
          ) : (
            <Link to="/userprofile" className=" m-8 ">
              {username}
            </Link>
          )}

          {token == null ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </BtnContainer>

        {/* For Mobile Start */}

        <ImgAndHamburgerContainer>
          <img src="/hotel-booking-app/images/boydp.jpg" alt="" />
          <div
            className={`hamburger ${openMenu && "close-hamburger"}`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </ImgAndHamburgerContainer>

        {/* For Mobile End*/}
      </NavContainer>

      <SecondNavContainer openMenu={openMenu}>
        <ul>
          <Link to="/" className="link flex items-center">
            <li className="active">Home</li>
          </Link>
          <Link to="/reservationlist" className="link flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#fff"
              className="bi bi-plus-circle-fill w-5 h-5"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />{" "}
            </svg>

            <li>Reservation</li>
          </Link>
          <Link to="/aboutus" className="link flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#fff"
              className="bi bi-people-fill w-5 h-5"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{" "}
              <path d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />{" "}
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />{" "}
            </svg>
            <li>About us</li>
          </Link>
          <Link to="/contactus" className="link flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="#fff"
              className="w-5 h-5"
            >
              {" "}
              <g>
                {" "}
                <path fill="none" d="M0 0h24v24H0z  w-5 h-5" />{" "}
                <path d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z" />{" "}
              </g>{" "}
            </svg>

            <li className="ml-2">Contact us</li>
          </Link>
          <Link to="/contactus" className="link flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="#fff"
              className="w-5 h-5"
            >
              {" "}
              <g>
                {" "}
                <path fill="none" d="M0 0h24v24H0z  w-5 h-5" />{" "}
                <path d="M22 20.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16.007zM4.434 5L12 11.81 19.566 5H4.434zM0 15h8v2H0v-2zm0-5h5v2H0v-2z" />{" "}
              </g>{" "}
            </svg>

            <li className="ml-2">Contact us</li>
          </Link>
          {/* <Link to="/hotel/5" className="link flex items-center">

                <li>
                  <HelpOutlineOutlined className="li-icon" />
                  Help
                </li>
              </Link> */}
        </ul>
        <ul className="hidden-ul">
          <Link to="/register" className="link flex items-center  ">
            <li className="mr-5">
              <LogoutOutlined className="li-icon" />
              Register
            </li>
          </Link>
          <Link to="/hotel/4" className="link flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#fff"
              className="bi bi-box-arrow-left w-5 h-5"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />{" "}
              <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />{" "}
            </svg>
            <li>Logout</li>
          </Link>
        </ul>
      </SecondNavContainer>

    </Wrapper>

  );
};

export default Navbar;
