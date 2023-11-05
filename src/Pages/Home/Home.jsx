import { Helmet } from "react-helmet";
import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Skill Exchange || Home</title>
      </Helmet>
      <Banner></Banner>
      <BrowseByCategory></BrowseByCategory>
    </div>
  );
};

export default Home;
