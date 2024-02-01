import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router-dom";
import { CiBookmarkRemove } from "react-icons/ci";
import toast from "react-hot-toast";

const Bookmark = () => {
  const axios = useAxios();
  const { user } = useAuth();
  // Get the Bookmark Data From Db based On user Email
  const { data: Bookmark, refetch } = useQuery({
    queryKey: ["bookmark", user],
    queryFn: async () => {
      const res = await axios.get(`/bookmarks?email=${user.email}`);
      return res.data;
    },
  });
  // Handle Remove Bookmark
  const handleRemoveBookmark = (item) => {
    const toastId = toast.loading("Removing Bookmark...");
    axios.delete(`/deleteBookmark/${item._id}`).then((res) => {
      if (res.data) {
        refetch();
        toast.success(" Bookmark Removed SuccessFully", { id: toastId });
      }
    });
  };
  return (
    <>
      <h3 className="text-center font-semibold text-3xl my-16 text-main dark:text-slate-300">
        Your BookMarked Post
      </h3>
      <div className="grid lg:grid-cols-2  gap-10 justify-items-center container mx-auto my-12">
        {Bookmark?.map((item) => (
          <div
            key={item._id}
            className="lg:w-[600px] w-[90vw]  duration-300 border dark:border-gray-400 tracking-wide font-medium shadow-[0_0_40px_#D1D1D1] dark:shadow-[0_0_50px_#233327] relative pb-12"
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-black dark:text-slate-300 font-semibold ">
                  {item.bookmarkPost?.jobtitle}
                </h2>
                <button
                  onClick={() => handleRemoveBookmark(item)}
                  className="p-2 font-bold text-xl dark:text-slate-300"
                >
                  <CiBookmarkRemove />
                </button>
              </div>
              <p className="text-black dark:text-slate-300">
                Price : ${item.bookmarkPost.minPrice} - $
                {item.bookmarkPost.maxPrice}
              </p>
              <p className="text-black dark:text-slate-300">
                Deadline : {item.bookmarkPost.deadline}
              </p>
              <p className="text-black dark:text-slate-300">
                Seller : {item.bookmarkPost.sellerEmail}
              </p>
              <p className="text-black dark:text-slate-300">{item.bookmarkPost.description}</p>
              <div className="flex justify-end absolute bottom-4 right-4">
                <Link to={`/bidJob/${item.bookmarkPost._id}`}>
                  <button className="cursor-pointer rounded-sm font-semibold overflow-hidden relative z-100 border border-main group px-4 py-1">
                    <span className="relative z-10 text-black dark:text-slate-300 group-hover:text-white duration-500">
                      Bid Now
                    </span>
                    <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                    <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Bookmark;
