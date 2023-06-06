import Navbar from "../Layout/Navbar";
import ReservationDialog from "../Components/Rservation/ReservationDialog";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hotel = () => {
  const [pitches, setPitches] = useState([]);
  useEffect(() => {
    // Fetch the data from the server
    fetch("http://localhost:5151/getdatas")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPitches(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);
  // fix later
  const url = window.location.href;
  const id = parseInt(url.split("/").pop(), 10);
  const pitch = pitches.find((pitch) => pitch.id === id);
  let price;
  if (pitch) {
    price = pitch.price;
  }
  return (
    <>
      <Navbar />

      {pitch ? (
        <section key={pitch.id}>
          <div className="relative mx-auto max-w-screen-xl px-4 py-8">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                <img
                  src={`data:image/jpeg;base64,${pitch.images[0]}`}
                  alt="Field 1"
                  className="aspect-square w-full rounded-xl object-cover h-96"
                />

                <div className="grid grid-cols-2 gap-4 lg:mt-4">
                  <img
                    src={`data:image/jpeg;base64,${pitch.images[1]}`}
                    alt={`Field 2 `}
                    className="aspect-square w-full rounded-xl object-cover h-56"
                  />

                  <img
                    src={`data:image/jpeg;base64,${pitch.images[2]}`}
                    alt={`Field 3`}
                    className="aspect-square w-full rounded-xl object-cover h-56"
                  />
                </div>
              </div>

              <div className="sticky top-0">
                <nav aria-label="Breadcrumb" className="flex">
                  <ol
                    role="list"
                    className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600"
                  >
                    <li className="flex items-center">
                      <Link
                        to="/"
                        className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>

                        <span className="ms-1.5 text-xs font-medium">
                          {" "}
                          Home{" "}
                        </span>
                      </Link>
                    </li>

                    <li className="relative flex items-center">
                      <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

                      <Link
                        to="/reservationlist"
                        className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                      >
                        Reservation List
                      </Link>
                    </li>
                    <li className="relative flex items-center">
                      <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

                      <div className="flex h-10 items-center text-gray-400 underline bg-white pe-4 ps-8 text-xs font-medium transition ">
                        Reservation Details
                      </div>
                    </li>
                  </ol>
                </nav>

                {/* bread crumb-------------------------------------------------------------------------------- */}

                <div className="mt-8 flex justify-between">
                  <div className="max-w-[35ch] space-y-2">
                    <h1 className="text-xl font-bold text-black sm:text-2xl">
                      {pitch.name}
                    </h1>
                    ax
                    <p className="text-sm">{pitch.details}</p>
                    <div className="-ms-0.5 flex">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="h-5 w-5 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-2xl font-bold">{pitch.price} JD</p>
                </div>

                <div className="mt-4">
                  <div className="prose max-w-none mt-9">
                    <legend className="mb-1 text-black text-sm font-bold">
                      Description
                    </legend>

                    <p>{pitch.description}</p>
                  </div>
                </div>

                <form className="mt-8">
                  <fieldset>
                    <legend className="mb-1 text-black text-sm font-bold">
                      Location:
                    </legend>
                    <div>{pitch.location}</div>
                  </fieldset>

                  <fieldset className="mt-4 flex justify-between items-center">
                    <div>
                      <legend className="mb-1 text-black text-sm font-bold">
                        Size
                      </legend>

                      <span className="border inline-block  rounded-lg p-2 my-2  hover:bg-green-500 hover:text-white  hover:font-medium hover:drop-shadow-lg">
                        {pitch.size}
                      </span>
                    </div>
                    <ReservationDialog id={id} price={price} />
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Pitch with ID 13 not found.</p>
      )}
    </>
  );
};

export default Hotel;
