import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dm from "../../../Components/Dm/Dm";
import Gd from "../../../Components/Gd/Gd";
import Wd from "../../../Components/Wd/Wd";

const BrowseByCategory = () => {

  return (
    <div className="mt-20">
      <div className="flex justify-center items-center">
       
          <h3 className="mt-3  mb-16 font-semibold text-3xl">
            Browse By <span className="text-main font-title">Category</span>
          </h3>
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
