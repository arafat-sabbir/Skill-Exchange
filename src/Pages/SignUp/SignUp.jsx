import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate()
  const { signWithGoogle, signUpUser, updateUserProfile, signOutUser } =
    useAuth();
  const correctPassPatern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
  const [showP, setShowp] = useState(false);
  const [error, setError] = useState("");
  const notify = () =>
    toast.success("Sign Up Successful.", {
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

  const handleShowP = () => {
    setShowp(!showP);
  };
  const handleGoogleSignin = () => {
    signWithGoogle()
      .then(() => {
        notify()
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  AOS.init();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");

    if (password.length < 6) {
      return setError("Password should be at least 6 characters long.");
    } else if (!correctPassPatern.test(password)) {
      return setError(
        "Your password should contain at least one uppercase letter and One Special Character ."
      );
    }

    signUpUser(email, password)
      .then((result) => {
        e.target.reset();
        setError("");
        notify();
        updateUserProfile(name, photoUrl)
          .then((result) => {
            console.log(result);
            signOutUser();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="bg-[#f8f0dd]">
      <Helmet>
        <title>Skill Exchange || Sign Up</title>
      </Helmet>
      <div className="flex container mx-auto justify-center  items-center justify-items-center gap-6">
        <div className="flex-1 hidden lg:block">
          <img
            src="https://i.ibb.co/crGqCBB/7843dbff-3105-471b-9e00-63d4f49125f2-1.webp"
            className="w-11/12 mx-auto"
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
            className="hero min-h-[80vh]"
          >
            <div className="hero-content flex-col gap-8 bg-white shadow-[0_0_50px_#D1D1D1] px-8 rounded-2xl ">
              <h1 className="text-5xl font-bold pt-10  text-main">
                Sign Up now!
              </h1>
              <div className="card backdrop-blur-3xl bg-transparent pt-3">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="md:flex gap-4">
                      <div className="form-control lg:w-full">
                        <label className="label">
                          <span className="label-text">Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="your name"
                          className="input bg-transparent border border-main"
                          required
                        />
                      </div>
                      <div className="form-control md:w-full">
                        <label className="label">
                          <span className="label-text">Photo url</span>
                        </label>
                        <input
                          type="text"
                          name="photoUrl"
                          placeholder="photo url"
                          className="input bg-transparent border border-main"
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex gap-4">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="emil"
                          name="email"
                          placeholder="email"
                          className="input bg-transparent border border-main"
                          required
                        />
                      </div>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <div className="form-control relative">
                          <input
                            type={showP ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            className="input bg-transparent border border-main"
                            required
                          />
                          <div className="my-1 text-red-400 font-medium">
                            {error && <p>{error}</p>}
                          </div>
                          <span
                            className="absolute top-4 right-2"
                            onClick={handleShowP}
                          >
                            {showP ? <GoEye /> : <GoEyeClosed />}
                          </span>
                        </div>
                      </div>
                    </div>
                    <label className="flex justify-center my-2 w-full">
                      <a href="#" className="label-text-alt   link link-hover">
                        Forgot password?
                      </a>
                    </label>
                    <div className="form-control mt-6">
                      <button
                        type="submit"
                        className="cursor-pointer rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-6 py-2"
                      >
                        <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
                          Sign Up
                        </span>
                        <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                        <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                      </button>
                    </div>
                  </form>
                  <div>
                    <p className="my-4 text-main ">
                      Do not have a account ? please :{" "}
                      <Link to={"/signIn"} className=" font-bold text-main">
                        Sign In
                      </Link>
                    </p>
                  </div>
                  <button
                    onClick={handleGoogleSignin}
                    className="btn border  hover:border-main border-main z-50 hover:bg-transparent w-full mx-auto bg-transparent  font-semibold mb-3"
                  >
                    <FcGoogle></FcGoogle>
                    Sign Up With Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
