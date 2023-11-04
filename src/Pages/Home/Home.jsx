import { Helmet } from "react-helmet";
import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Skill Exchange || Home</title>
      </Helmet>
      <BrowseByCategory></BrowseByCategory>
    </div>
  );
};

export default Home;
