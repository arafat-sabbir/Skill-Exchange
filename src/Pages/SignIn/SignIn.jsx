import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const SignIn = () => {
  const { signWithGoogle, user, signInUser } = useAuth();
  const [showP, setShowp] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const notify = () =>
    toast.success("Sign In Successful.", {
      style: {
        border: "1px solid #007456",
        padding: "20px",
        color: "#007456",
      },
      iconTheme: {
        primary: "#007456",
        secondary: "#FFFAEE",
      },
    });

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    e.target.reset();

    signInUser(email, password)
      .then((result) => {
        notify();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Password doesn't match");
        } else if (error.code === "auth/user-not-found") {
          setError("Email doesn't match");
        } else {
          setError(error.message);
        }
      });
  };
  const handleShowP = () => {
    setShowp(!showP);
  };
  const handleGoogleSignin = () => {
    signWithGoogle()
      .then(() => {
        notify()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  AOS.init();
  return (
    <>
      <div className="bg-[#EEF0E5]">
        <Helmet>
          <title>Skill Exchange || Sign In</title>
        </Helmet>

        <div className="flex justify-between items-center container mx-auto ">
          <div className="flex-1 hidden lg:block">
            <img
              src="https://i.ibb.co/4gH8PKH/login.png"
              className="w-7/12 mx-auto"
              alt=""
            />
          </div>
          <div className="flex-1">
            <div
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-duration="600"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top"
              className="hero min-h-[80vh] "
            >
              <div className="hero-content flex-col md:w-auto w-[90vw] md:my-auto my-10 shadow-[0_0_50px_#D1D1D1] px-10 bg-white bg-opacity-70 rounded-xl gap-8">
                <h1 className="text-5xl font-bold text-main pt-8">
                  Sign In now!
                </h1>
                <div className="card  w-96   pt-3">
                  <div className="card-body">
                    <form onSubmit={handleSignIn}>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="emil"
                          name="email"
                          placeholder="email"
                          className="input border border-main bg-transparent"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <div className="form-control relative">
                          <input
                            type={showP ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className="input border border-main bg-transparent"
                            required
                          />
                          <span
                            className="absolute top-4 right-2"
                            onClick={handleShowP}
                          >
                            {showP ? <GoEye /> : <GoEyeClosed />}
                          </span>
                        </div>
                        <label className="label">
                          <a
                            href="#"
                            className="label-text-alt link link-hover"
                          >
                            Forgot password?
                          </a>
                        </label>
                      </div>
                      <div className="form-control mt-6">
                        <button className="cursor-pointer rounded-xl font-semibold overflow-hidden relative z-100 border border-main group px-6 py-2">
                          <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
                            Sign In
                          </span>
                          <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                          <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                        </button>
                      </div>
                    </form>
                    <div className="my-1 text-green-700 font-medium">
                      {error && <p>Error : {error}</p>}
                      <p className="my-4">
                        Do not have a account ? :{" "}
                        <Link to={"/signUp"} className=" font-bold text-main">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                    <button
                      onClick={handleGoogleSignin}
                      className="btn z-50 border hover:border-main border-main hover:bg-transparent w-full bg-transparent font-semibold mb-3"
                    >
                      <FcGoogle></FcGoogle>
                      Sign IN With Google
                    </button>
                  </div>
                </div>
              </div>
              {user && (
                <Navigate
                  to={location?.state ? location.state : "/"}
                ></Navigate>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
