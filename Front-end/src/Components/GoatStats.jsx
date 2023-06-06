import { useEffect, useState } from "react";
import axios from "axios";

const GoatStats = () => {

  const [usersnum, setusersnum] = useState("")
  const [fieldnum, setfieldnum] = useState("")
  const [bookingsnum, setbookingsnum] = useState("")

  const getstats = () => {
    axios.get('http://localhost:5151/countreservations')
      .then(response => { setbookingsnum(response.data) })
      .catch(error => {
        console.error(error);
      })
    console.log(bookingsnum);
    axios.get('http://localhost:5151/countusers')
      .then(response => { setusersnum(response.data) })
      .catch(error => {
        console.error(error);
      })
    console.log(usersnum);
    axios.get('http://localhost:5151/countfields')
      .then(response => { setfieldnum(response.data) })
      .catch(error => {
        console.error(error);
      })
    console.log(fieldnum);
  }

  useEffect(() => {
    getstats()
  }, [])
  return (
    <section className="bg-white">
      <hr />

      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            GOAT Feild Stats
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores
            laborum labore provident impedit esse recusandae facere libero harum
            sequi.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100"
          >
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Number Of Reservations
              </dt>

              <dd className="text-4xl font-extrabold text-[#54B435] md:text-5xl">
                {bookingsnum.count}
              </dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Our Pitchs
              </dt>

              <dd className="text-4xl font-extrabold text-[#54B435] md:text-5xl">{fieldnum.count}</dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Users Numbers
              </dt>

              <dd className="text-4xl font-extrabold text-[#54B435] md:text-5xl">{usersnum.count}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default GoatStats;
