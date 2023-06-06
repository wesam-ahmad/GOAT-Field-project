import styled from "styled-components";
import SearchedHotelsList from "../Components/Rservation/SearchedHotelsList.jsx";
import Navbar from "../Layout/Navbar";


const SideContainer = styled.aside`
  /* border: 1px solid blue; */
  margin: 0px 8px 15px 0px;
  flex: 1;

  @media screen and (max-width: 925px) {
    margin: 5px 0px 15px;
  }

  #sticky-container {
    position: sticky;
    top: 17px;
    z-index: 999; // Don't delete it.

    @media screen and (max-width: 925px) {
      position: static;
      z-index: auto;
    }
  }
`;



const HotelList = () => {
  return (
    <>
      <Navbar />
      <div>
        <div>
          <div>
            <SideContainer>
              <div id="sticky-container">
                {/* <Sidebar /> */}

                {/* <Map /> */}
              </div>
            </SideContainer>
            <div>
              <SearchedHotelsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelList;
