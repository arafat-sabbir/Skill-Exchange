const BrowseByCategory = () => {
  return (
  <div>
      <h3 className="text-3xl font-semibold text-center my-8 text-[#007456]">
        Browse By Category
      </h3>
      <div className="flex justify-center items-center font-semibold">
      <div className="tabs ">
        <a className="tab tab-lifted">Web Development</a>
        <a className="tab tab-lifted tab-active text-[#007456] font-semibold">
          Digital Marketing
        </a>
        <a className="tab tab-lifted font-semibold">Graphics design</a>
      </div>
    </div>
  </div>
  );
};

export default BrowseByCategory;
