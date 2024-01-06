import CountUp from "react-countup";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="">
      <div className="flex  container flex-col-reverse lg:flex-row p-4 md:p-auto mx-auto place-items-center lg:h-[65vh]">
        <div className="flex-1 text-3xl text-black font-semibold leading-[50px]">
          <div className="mb-4 border-l-4 border-[#007456]">
            <h1 className=" ml-4">
              <span className="md:text-4xl text-3xl">Worried About Jobs?</span>{" "}
              <br /> Can't Find The Job You're Looking For!
            </h1>
          </div>
          <div className="mb-4 border-l-4 border-[#007456] mt-6">
            <h1 className=" ml-4">
              {" "}
              On <span className=" text-[#007456]"> Skill-Exchange</span>
              <br />{" "}
              <Typewriter
                words={[
                  "Find World’s best Jobs From Home..",
                  " Elevate your career with the finest work-from-home opportunities worldwide..",
                  "Redefine your work-life balance with the world's top remote jobs..",
                  "Join the future of work: Seamless, global, and rewarding – Find your perfect job..",
                  "Craft your career path without boundaries..",
                ]}
                loop={true}
                cursor
                cursorStyle=""
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
          <div className="flex items-center pt-10 pb-10 p-4 md:h-40 ">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-start h-28 md:w-40 w-60 justify-center px-4 mx-0.5 my-0.5 border-r-4 border-[#007456]">
                <div className="flex-col">
                  <div className="text-xl text-[#007456]  font-bold  my-2">
                    Job Submit
                  </div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold ">
                      <span className="flex"><CountUp enableScrollSpy={true} start={15} end={30} duration={6} />K</span>
                    </div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-violet-500 font-medium ">
                      <div>
                        <ion-icon name="arrow-down-outline"></ion-icon>
                      </div>
                      <div>25%</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium  ">Last week 18.7k</div>
                </div>
              </div>
              <div className="text-black flex items-start h-28 md:w-40 w-60 justify-center px-4 mx-0.5 my-0.5">
                <div className="flex-col">
                  <div className="text-xl text-[#007456]  font-bold  my-2">
                    Active User
                  </div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold "> <span className="flex"><CountUp enableScrollSpy={true} start={25} end={40} duration={6} />K</span></div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-violet-500 font-medium ">
                      <div>
                        <ion-icon name="arrow-down-outline"></ion-icon>
                      </div>
                      <div>2%</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium  ">Last week 8k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://i.ibb.co/NmXms76/71a5ab45-ccd6-483f-a579-d86740a6f198.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
