import styled from "styled-components";
import Offers from "../components/Offers";
import FeaturedCities from "../Components/PopularSection";
import HomeNavbar from "../Components/HomeNavBar";
import GoatStats from "../Components/GoatStats";

const Container = styled.div`
  /* border: 1px solid blue; */
  margin: 20px 150px;

  @media screen and (max-width: 1200px) {
    margin: 20px 30px;
  }

  @media screen and (max-width: 675px) {
    margin: 20px;
  }
`;

const Home = () => {
  return (
    <>
      <div className="bg-white">
        <HomeNavbar />
        <Container >
          <Offers />
          <FeaturedCities />
          <GoatStats />
        </Container>
      </div>
    </>
  );
};

export default Home;
