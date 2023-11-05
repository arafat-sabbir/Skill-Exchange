import { Helmet } from "react-helmet";
import BrowseByCategory from "./BrowseByCategory/BrowseByCategory";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Skill Exchange || Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Banner></Banner>
      <BrowseByCategory></BrowseByCategory>
    </div>
  );
};

export default Home;
