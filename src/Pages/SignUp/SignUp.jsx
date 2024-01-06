import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import axios from "axios";

const SignUp = () => {
  // Image Related Functions
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
  const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { signWithGoogle, signUpUser, updateUserProfile, signOutUser } =
    useAuth();
  // Regex For Checking Right Passwords Pattern
  const correctPassPatern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
  const [showP, setShowp] = useState(false);
  const [error, setError] = useState("");
  // Notify Message For Successfully Sign UP
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
  // Show And Hide Password
  const handleShowP = () => {
    setShowp(!showP);
  };
  // Google Sign In
  const handleGoogleSignin = async () => {
    signWithGoogle()
      .then((res) => {
        const userData = {
          userEmail: res.user.email,
          userName: res.user.displayName,
          userPhoto: res.user.photoURL,
          creationDate: new Date().toDateString(),
        };
        axiosSecure.post("/createUser", userData).then((res) => {
          console.log(res.data);
        });
        notify();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Aos Init For animation
  AOS.init();
  // Photo Related Tasks
  const [photoName, setPhotoName] = useState("");
  const [photo, setPhoto] = useState("");
  // make a form data to send the data to imagebb
  const formData = new FormData();
  formData.append("image", photo);
  const handlePhotoUpload = (e) => {
    e.preventDefault();
    setPhotoName(e.target.files[0].name);
    setPhoto(e.target.files[0]);
  };

  // Email And Password Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(imageHostingAPi, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const form = e.target;
    const name = form.name.value;
    const photoUrl = res.data.data.display_url;
    const email = form.email.value;
    const password = form.password.value;
    console.log(form.email.value);
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
    <div className="">
      <Helmet>
        <title>Skill Exchange || Sign Up</title>
      </Helmet>
      <div className="flex h-screen  container mx-auto justify-center  items-center justify-items-center gap-6">
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
            <div className="hero-content flex-col gap-8 bg-white bg-opacity-70 shadow-[0_0_10px_1px_#D1D1D1] px-8 rounded-2xl ">
              <h1 className="text-5xl font-bold pt-10  text-main">
                Sign Up now!
              </h1>
              <div className="card backdrop-blur-3xl bg-transparent pt-3">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* user Name */}

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
                    {/* user Photo  */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Photo</span>
                      </label>

                      <div className="relative w-full">
                        <label className="label absolute -z-50 input pt-2  input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main w-full ">
                          <span className="label-text ">
                            {photoName || "Choose Profile Picture"}
                          </span>
                        </label>
                        <input
                          onChange={handlePhotoUpload}
                          accept="images/*"
                          type="file"
                          placeholder="upload your Photo"
                          className="input pt-2 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed border-main focus:border-main"
                        />
                      </div>
                    </div>
                    {/* user Email */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="input bg-transparent border border-main"
                        required
                      />
                    </div>
                    {/* User Password */}
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

                    <label className="flex justify-center my-2 w-full">
                      <a href="#" className="label-text-alt   link link-hover">
                        Forgot password?
                      </a>
                    </label>
                    <div className="form-control mt-6">
                      <button
                        type="submit"
                        className="btn bg-white hover:bg-white border-1 border-main hover:border-main"
                      >
                        Sign In
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
