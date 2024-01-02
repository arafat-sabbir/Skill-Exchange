import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router-dom";

const Bookmark = () => {
    const axios = useAxios()
    const {user} = useAuth()
    console.log(user.email);
    const {data:Bookmark} = useQuery({
        queryKey:['bookmark'],
        queryFn:async()=>{
            const res = await axios.get(`/bookmarks?email=${user.email}`)
            return res.data;
        }
    })
    console.log(Bookmark);
    return (
        <div>
            <h3 className="text-center font-semibold text-3xl my-16 text-main">Your BookMarked Post </h3>
            <div className="grid lg:grid-cols-2  gap-10 justify-items-center container mx-auto my-12">
      {Bookmark?.map((item) => (

              <div key={item.bookmarkPost._id} className="card lg:w-[600px] w-[90vw] font-medium tracking-wide card-side bg-base-100 duration-300 border-2 border-main hover:shadow-[0_0_40px_#D1D1D1]">
                <div className="card-body">
                  <h2 className="text-2xl text-black font-semibold ">
                    {item.bookmarkPost?.jobtitle}
                  </h2>
                  <p className="text-black">
                    Price : ${item.bookmarkPost.minPrice} - ${item.bookmarkPost.maxPrice}
                  </p>
                  <p className="text-black">Deadline : {item.bookmarkPost.deadline}</p>
                  <p className="text-black">Seller : {item.bookmarkPost.sellerEmail}</p>
                  <p className="text-black">{item.bookmarkPost.description}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/bidJob/${item.bookmarkPost._id}`}>
                      <button className="cursor-pointer rounded-full font-semibold overflow-hidden relative z-100 border border-main group px-4">
                        <span className="relative z-10 text-black group-hover:text-white text-lg duration-500">
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
        </div>
    );
};

export default Bookmark;