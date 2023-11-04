import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const { signWithGoogle, user, signInUser } = useAuth();
  const [showP, setShowp] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    e.target.reset();

    signInUser(email, password)
      .then((result) => {
        console.log(result);
        swal("Great!", "Sign In SuccessFully", "success");
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
        swal("Great!", "Sign In SuccessFully", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  AOS.init();
  return (
    <>
      <div>
        <Helmet>
          <title>Skill Exchange || Sign In</title>
        </Helmet>
        <div className="flex justify-center items-center container mx-auto ">
          <div className="flex-1">
            <img
              src="https://i.ibb.co/QQ0sDLF/3094352.webp"
              className="w-11/12 mx-auto"
              alt=""
            />
          </div>
          <div className="flex-1">
            <div
              data-aos="zoom-in"
              data-aos-offset="200"
              data-aos-duration="1000"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top"
              className="hero min-h-[80vh] "
            >
              <div className="hero-content flex-col shadow-[0_0_50px_#D1D1D1] px-10 rounded-xl gap-8">
                <h1 className="text-5xl font-bold text-[#007456] pt-8">
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
                          className="input border border-[#00745685] bg-transparent"
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
                            className="input border border-[#00745685] bg-transparent"
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
                        <button className="btn text-white hover:bg-[#007456bd] bg-[#007456bd] border-none bg-opacity-80 font-semibold">
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="my-1 text-[#007456] font-medium">
                      {error && <p>Error : {error}</p>}
                      <p className="my-4">
                        Do not have a account ? :{" "}
                        <Link
                          to={"/signUp"}
                          className=" font-bold text-[#007456]"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                    <button
                      onClick={handleGoogleSignin}
                      className="btn z-50 border hover:border-[#00745685] border-[#00745685] hover:bg-transparent w-full bg-transparent font-semibold mb-3"
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
