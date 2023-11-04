import { Link, useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://i.ibb.co/56vRqP1/404-Error-Page-not-Found-with-people-connecting-a-plug-bro.webp"
          className="h-[700px] w-[800px]"
          alt=""
        />
        <p className=" mb-4 text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>
        <Link to="/">
          <button className="btn rounded-full hover:bg-[#007456] bg-[#007456] border-none   text-white">
            Go Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
