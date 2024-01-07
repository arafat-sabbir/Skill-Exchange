import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";

const PostedJobCard = ({ job, handleDelete }) => {
  const { jobtitle, minPrice, maxPrice, description, category, deadline, _id } =
    job;
  return (
    <div>
      <div className="group before:hover:scale-95 before:hover:h-[500px] before:hover:w-[400px] before:hover:h-[500px] before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-[400px] before:h-44 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-[400px] h-[500px] relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
        <div className="w-28 h-28 bg-main mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"></div>
        <div className="z-10  group-hover:-translate-y-10 transition-all duration-500"></div>
        <div className="space-y-4 z-50">
          <span className="text-2xl font-semibold">{jobtitle}</span>
          <p className="text-xl font-semibold">{category}</p>
          <p className="text-xl font-semibold">Deadline: {deadline}</p>
          <p className="text-md font-semibold">
            Price : ${minPrice}-${maxPrice}
          </p>
          <div className="flex gap-20 ">
            <Link to={`/dashboard/updatejob/${_id}`}>
              <button
                className="flex z-50 justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#34D399] via-[#10B981] to-[#059669]
                hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#059669] "
              >
                Update<RxUpdate></RxUpdate>
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="flex z-50 justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] "
            >
              Delete<MdDeleteOutline></MdDeleteOutline>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobCard;
