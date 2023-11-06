import { Helmet } from "react-helmet";
import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import Banner from "../../Components/Banner/Banner";
import UserReview from "../../Components/UserReview/UserReview";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Skill Exchange || Home</title>
      </Helmet>
      <Banner></Banner>
      <BrowseByCategory></BrowseByCategory>
      <UserReview></UserReview>
    </div>
  );
};

export default Home;
