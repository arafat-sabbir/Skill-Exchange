import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import UseLoading from "../../Hook/useLoading";

const Wd = () => {
  const category = "Web Development";
  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get(`/jobsBy-category?category=${category}`);
    return response;
  };
  const { data, isLoading, } = useQuery({
    queryKey: ["Jobs", category],
    queryFn: getJobs,
  });
  const { user } = useAuth();
  const handleaddtoBookmark = (post) => {
    if(user.email===post.sellerEmail){
      return toast.error("You can't Bookmark Your Own Job")
    }
    const bookmarkData = {
      bookmarkUser: user.email,
      bookmarkPost: post,
    };
    axios.post("/addtobookmark", bookmarkData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Post Bookmarked SuccessFully");
      }
    });
  };
  // Handled Post Loading State  From Server
  return isLoading ? (
    <UseLoading></UseLoading>
  ) : (
    // Card Container
    <div className="grid lg:grid-cols-1 xl:grid-cols-2  gap-10 justify-items-center container mx-auto my-12">
      {data?.data?.map((wd) => (

        <div key={wd._id}>
          <div className="min-w-5xl lg:w-[600px] w-[98vw] shadow-[0_0_70px_#E0E0E0] px-8 py-4 bg-white rounded-lg  dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                Deadline : {wd.deadline}
              </span>
              <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-duration-300 transform bg-gray-600 rounded cursor-pointer ">
                {wd.category}
              </p>

            </div>
            <div className="my-2">
              <p className="text-xl py-2 font-bold text-gray-700 dark:text-white dark:hover:text-gray-200 ">
                {wd?.jobtitle}
              </p>
              <p className="text-black py-1">
                <span className="font-semibold">Price :</span> ${wd.minPrice} - ${wd.maxPrice}
              </p>
              <p className="text-black py-2"> <span className="font-semibold">Seller :</span> {wd.sellerEmail}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <p
                  className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
                >
                  {wd.sellerName}
                </p>
                <img
                  className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                  src={wd.sellerPhoto}
                  alt="Seller Image"
                />

              </div>
              {/* Review Job Button */}
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handleaddtoBookmark(wd)}
                  className="p-2 font-bold text-xl"
                >
                  <IoBookmarkOutline />
                </button>
                <Link to={`/bidJob/${wd._id}`}>
                  <button
                    className="text-black border p-1 border-gray-500 hover:border-main hover:scale-95 transition duration-300 font-semibold w-[100px] "
                  >
                    Bid Job
                  </button>
                </Link>
              </div>

              {/* Seller Information */}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wd;
