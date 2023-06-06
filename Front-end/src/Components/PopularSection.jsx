import styled from "styled-components";

const Container = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  margin: 30px 0px 25px;

  h1 {
    font-size: 30px;
    margin-left: 2px;

    @media screen and (max-width: 1025px) {
      font-size: 25px;
    }
  }

  p {
    color: gray;
    font-size: 16px;
    margin: 2px 0px 8px 3px;

    @media screen and (max-width: 950px) {
      font-size: 15px;
    }
  }
`;

const CardContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
margin-bottom: 3rem;
margin-top: 1.5rem;
  justify-content: space-evenly;
`;

import { useEffect, useState } from "react";
import axios from "axios";

const PopularSection = () => {
  const [featuredCityData, setFeaturedCityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5151/getdatas");
        setFeaturedCityData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container>
      <h1>Popular destinations</h1>
      <p>These popular destinations have a lot to offer</p>
      <CardContainer className="gap-y-10 gap-x-1">
        {featuredCityData.slice(0, 6).map((city) => (
          <div key={city.id} className="2xl:w-1/4 xl:w-1/3 lg:w-1/3 w-2/3 min-w-fit">
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-gray-300">

              <img
                className=" rounded-lg"
                style={{
                  objectFit: "contain",
                  height: "200px" // Set the desired height for the image
                }}
                src={`data:image/jpeg;base64,${city.images[0]}`}
                alt={`Image 1`}
              />
              <div className="mt-2">
                <dl>
                  <div>
                    <div className="flex items-start justify-start gap-2">
                      <dd className="font-medium text-black">field name:</dd><span className="">{city.name}</span>
                    </div>

                  </div>
                  <div>
                    <dt className="sr-only">Price</dt>
                  </div>
                  <br />
                  <div>
                    <div className="flex items-start justify-start gap-2">
                      <dd className="text-sm text-black   font-medium">$ price:</dd><span className="">{city.price}</span>
                    </div>
                  </div>
                  <br />
                  <div>
                    <div className="flex items-start justify-start gap-2">
                      <dd className="text-sm text-black   font-medium">Field size:</dd><span className="">{city.size}</span>
                    </div>
                  </div>
                  <br />

                  <div>
                    <div className="flex flex-col items-start justify-start gap-2 w-20 break-normal	pr-20">
                      <dd className="text-sm  mt-1 text-black w-20  font-medium">details:</dd><span className="inline-block w-60 break-words">{city.details}</span>

                    </div>
                    <br />

                  </div>
                </dl>
                <div className="mt-6 flex items-center gap-8 text-xs">
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="h-4 w-4 text-[#54B435]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-black">{city.location} </p>
                      <p className="font-medium text-black"></p>
                    </div>
                  </div>
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <div className="mt-1.5 sm:mt-0">
                      <p className="font-medium">{city.reservations}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </CardContainer>

    </Container>
  );
};

export default PopularSection;
