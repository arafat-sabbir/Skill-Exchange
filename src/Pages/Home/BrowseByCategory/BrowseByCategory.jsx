import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxios from "../../../Hook/useAxios";
import { useEffect, useState } from "react";
import Dm from "../../../Components/Dm/Dm";
import Gd from "../../../Components/Gd/Gd";
import Wd from "../../../Components/Wd/Wd";

const BrowseByCategory = () => {
  const [category, setCategory] = useState("Web Developmnet");
  const [jobsData, setJobsData] = useState("");

  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get("/jobs");
    return response;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Jobs"],
    queryFn: getJobs,
  });
  useEffect(() => {
    const filtered = data?.data?.filter((ct) => ct.category === category);
    console.log(jobsData);
  }, [category, data?.data, jobsData]);

  return (
    <div className="">
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
