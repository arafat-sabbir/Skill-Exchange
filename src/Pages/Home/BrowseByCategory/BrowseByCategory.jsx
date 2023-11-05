const BrowseByCategory = () => {

  return (
    <div className="">
    <div className="flex justify-center items-center">
    <div className=" w-[286px]  my-8 h-[56px] bg-no-repeat flex bg-hero-pattern">
    <h3 className="text-white text-lg ml-[60px]  mt-3  font-bold">Browse By Category</h3>
    </div>
    </div>
      <div className="flex justify-center items-center font-semibold">
        <div className="tabs">
          <a className="tab tab-lifted">Web Development</a>
          <a className="tab tab-lifted tab-active text-main font-semibold">
            Digital Marketing
          </a>
          <a className="tab tab-lifted font-semibold">Graphics design</a>
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
