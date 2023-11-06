const UserReview = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className=" w-[286px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-2xl ml-[80px]  mt-3  font-bold">
          User Review
        </h3>
      </div>
      <div className="flex gap-4 justify-center my-20 ">
        <div className="overflow-hidden flex-1  border hover:shadow-[0_0_40px_#E3DEE0] hover:shadow-main duration-300 m-4 flex justify-center w-[558px] h-[349px]   md:w-[33%]  shadow-xl bg-main">
          <div className="flex flex-col md:flex-row items-center justify-center  bg-white rounded-tl-full ">
            <div className="  items-center justify-center flex py-2">
              <div className="flex flex-col  items-center justify-center ">
                <div className="flex items-center">
                  <div className="p-1 bg-white rounded-full">
                    <img
                      src="https://source.unsplash.com/100x100/?man,boy"
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-stone-500 mx-4">
                      John Doe
                    </div>
                    <div className="text-sm font-medium text-stone-500 hover:text-stone-500 mx-4">
                      <a href="#">Board Director of Tailblocks</a>
                    </div>
                  </div>
                </div>
                <div className="text-stone-400  m-2 px-8">
                  {" "}
                  Tailblocks provides best Tailwind CSS Components and Blocks to
                  create an unique websites within minutes. It has upto 60+ free
                  components for front-end Web Development.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex-1 border hover:shadow-[0_0_40px_#E3DEE0] hover:shadow-main duration-300 m-4 flex justify-center w-[558px] h-[349px]   md:w-[33%]  shadow-xl bg-main">
          <div className="flex flex-col md:flex-row items-center justify-center  bg-white rounded-tl-full ">
            <div className="  items-center justify-center flex py-2">
              <div className="flex flex-col  items-center justify-center ">
                <div className="flex items-center">
                  <div className="p-1 bg-white rounded-full">
                    <img
                      src="https://source.unsplash.com/100x100/?man,boy"
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-stone-500 mx-4">
                      John Doe
                    </div>
                    <div className="text-sm font-medium text-stone-500 hover:text-stone-500 mx-4">
                      <a href="#">Board Director of Tailblocks</a>
                    </div>
                  </div>
                </div>
                <div className="text-stone-400  m-2 px-8">
                  {" "}
                  Tailblocks provides best Tailwind CSS Components and Blocks to
                  create an unique websites within minutes. It has upto 60+ free
                  components for front-end Web Development.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
