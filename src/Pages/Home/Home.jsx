import { Helmet } from "react-helmet";
import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import Banner from "../../Components/Banner/Banner";
import UserReview from "../../Components/UserReview/UserReview";
import Faq from "../../Components/Faq/Faq";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Skill Exchange || Home</title>
      </Helmet>
      <Banner></Banner>
      <BrowseByCategory></BrowseByCategory>
      <UserReview></UserReview>
      <Faq></Faq>
    </div>
  );
};

export default Home;
