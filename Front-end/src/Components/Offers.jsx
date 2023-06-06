import { GppMaybeOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const Container = styled.div`
  /* border: 1px solid black; */
`;



const IconContainer = styled.div`
  background-color: #fff0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 15px;

  @media screen and (max-width: 950px) {
    margin-right: 10px;
  }

  .icon {
    color: #db2424;
  }
`;

const OfferInfo = styled.div`
  /* border: 1px solid red; */
  margin-top: 30px;

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
    margin: 0px 0px 12px 4px;

    @media screen and (max-width: 950px) {
      font-size: 15px;
    }
  }
`;

const CardContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  @media screen and (max-width: 675px) {
    flex-direction: column;
    padding: 0px;
  }
`;

const Card = styled.div`
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.6);
  position: relative;
  flex: 1;
  height: 184px;
  border-radius: 10px;

  @media screen and (max-width: 950px) {
    height: 160px;
  }

  @media screen and (max-width: 675px) {
    flex: none;
    width: 100%;
  }

  &:first-of-type {
    margin-right: 30px;

    @media screen and (max-width: 675px) {
      margin-right: 0px;
      margin-bottom: 20px;
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const TextContainer = styled.div`
  background-color: #00000021;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  color: white;

  @media screen and (max-width: 950px) {
    padding: 10px;
  }

  h2 {
    @media screen and (max-width: 385px) {
      font-size: 20px;
    }
  }

  span {
    font-size: 16px;
    margin: 5px 0px 0px;

    @media screen and (max-width: 950px) {
      font-size: 15px;
    }
  }
`;

const Button = styled.button`
  border: 1px solid white;
  background-color: #00000061;
  width: 150px;
  margin-top: 20px;
  padding: 9px 10px;
  font-weight: 600;
  font-size: 15px;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 950px) {
    width: 130px;
    padding: 7px;
    font-size: 13px;
    margin-top: 12px;
  }

  &.bigBtn {
    width: 190px;

    @media screen and (max-width: 950px) {
      width: 168px;
    }
  }

  &:hover {
    background-color: transparent;
  }
`;

const Offers = () => {
  return (
    <Container>


      <OfferInfo>
        <h1>Offers</h1>
        <p>Promotions, deals and special offers for you</p>

        <CardContainer>
          <Card>
            <img src="https://img.freepik.com/free-photo/soccer-plan-chalk-board-with-formation-tactic_93675-131783.jpg?w=1380&t=st=1685558813~exp=1685559413~hmac=3676dbaa06a6351785f67bf0d476fd6bd053737bbccfb7fb03b89ca44fcb0d59" alt="flight" />
            <TextContainer>
              <h2>Help your team  </h2>
              <span>Get inspired, compare and book football fields.</span>
              <Link to="reservationlist">
                <Button type="button" className="rounded">Search for pitchs</Button>
              </Link>
            </TextContainer>
          </Card>

          <Card>
            <img src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="girl" />
            <TextContainer>
              <h2>make it your match day</h2>
              <span>and enjoy the fair comptition</span>
              <Link to="reservationlist">

                <Button type="button" className="bigBtn rounded">
                  Discover New Pitchs
                </Button>
              </Link>
            </TextContainer>
          </Card>
        </CardContainer>
      </OfferInfo>
    </Container >
  );
};

export default Offers;
