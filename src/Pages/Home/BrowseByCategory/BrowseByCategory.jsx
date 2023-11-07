import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dm from "../../../Components/Dm/Dm";
import Gd from "../../../Components/Gd/Gd";
import Wd from "../../../Components/Wd/Wd";

const BrowseByCategory = () => {

  return (
    <div className=" mt-20">
      <div className="flex justify-center items-center">
        <div className=" w-[286px]  my-8 h-[56px] bg-no-repeat flex bg-hero-pattern">
          <h3 className="text-white text-lg ml-[60px]  mt-3  font-bold">
            Browse By Category
          </h3>
        </div>
      </div>
      <Tabs>
        <div className="flex justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Digital Marketing</Tab>
            <Tab>Graphics Design</Tab>
          </TabList>
        </div>
        <TabPanel>
         <Wd></Wd>
        </TabPanel>
        <TabPanel>
          <Dm></Dm>
        </TabPanel>
        <TabPanel>
          <Gd></Gd>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BrowseByCategory;
