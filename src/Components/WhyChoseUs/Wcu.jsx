import "./WhyChoseUs.css";

const Wcu = () => {
  return (
    <div className="feat bg-gray pt-5 pb-5 mt-20">
      <div className="container mx-auto">
          <h3 className="mt-3  mb-16 font-semibold text-3xl text-center">
            Why Choose Us
          </h3>
        <div className="row grid lg:grid-cols-3 grid-cols-1 gap-10 lg:w-auto w-[90vw] mx-auto">
          <div className="col-lg-4 col-sm-6 ">
          <div className="item dark:bg-gray-800 ">
              <span className="icon feature_box_col_one flex justify-center items-center mx-auto">
                <img src="https://i.ibb.co/824FCcc/icons8-affordable-64.png" alt="" />
              </span>
              <h6 className="font-semibold text-xl dark:text-slate-300">Affordable Job Price</h6>
              <p className="text-md font-medium">
               If You Are Looking for A Worker Here On Skill-Exchange <br /> You can Find A Worker In  Reasonable Price .
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item dark:bg-gray-800 ">
              <span className="icon feature_box_col_two flex justify-center items-center mx-auto">
                <img src="https://i.ibb.co/QdPyR2P/icons8-cancel-64.png" alt="" />
              </span>
              <h6 className="font-semibold text-xl dark:text-slate-300">Cancel AnyTime</h6>
              <p>
               If You Think Your Job Post Bid Isn't Relevent For You.. You Can Cancel The Request Without Any Question.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item dark:bg-gray-800 ">
              <span className="icon feature_box_col_three flex justify-center items-center mx-auto">
                <img src="https://i.ibb.co/bBGfh5B/icons8-24-hours-day-support-64.png" alt="" />
              </span>
              <h6 className="font-semibold text-xl dark:text-slate-300">24 x 7 User Support</h6>
              <p>
                If our Client has any problem and any query we are always
                happy to help then.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item dark:bg-gray-800 ">
              <span className="icon feature_box_col_four flex justify-center items-center mx-auto">
                <img src="https://i.ibb.co/t350y10/icons8-in-progress-48.png" alt="" />
              </span>
              <h6 className="font-semibold text-xl dark:text-slate-300">Track Progress</h6>
              <p>
               You Can Track Your Job Post Progress 24/7..You Can See If It Is Progress Or It Is Finished
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item dark:bg-gray-800 ">
              <span className="icon feature_box_col_five flex justify-center items-center mx-auto">
                <img src="https://i.ibb.co/bQMKNch/icons8-update-64.png" alt="" />
              </span>
              <h6 className="font-semibold text-xl dark:text-slate-300">Update Anytime</h6>
              <p>
              If You Think Your Job Post Has MisInformation Or You Want To Update Anything You Can Update it Anytime..
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="item dark:bg-gray-800 ">
              <span className="icon feature_box_col_six flex justify-center items-center mx-auto">
                <img src="https://i.ibb.co/dJKcdNP/icons8-category-48.png" alt="" />
              </span>
              <h6 className="font-semibold text-xl dark:text-slate-300">Multiple Category</h6>
              <p>
               We Have Multiple Category For Job Post Or Finding Job Find The One YOu Desire...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wcu;
