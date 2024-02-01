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
  const {  signUpUser, updateUserProfile } =
    useAuth();
  // Regex For Checking Right Passwords Pattern
  const correctPassPatern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
  const [showP, setShowp] = useState(false);
  const [error, setError] = useState("");
  // Notify Message For Successfully Sign UP
  // Show And Hide Password
  const handleShowP = () => {
    setShowp(!showP);
  };
  // handle role for user
  const [role,setRole] = useState();
  const handleRole =(e)=>{
    setRole(e.target.value)
  }
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
    const toastId = toast.loading("SignUp Processing..")
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
      .then((res) => {
        e.target.reset();
        setError("");
        toast.success("Sign Up Successfully ",{id:toastId})
        updateUserProfile(name, photoUrl)
          .then(() => {
            navigate(location.state?location.state:'/')
            const userData = {
              userEmail: res.user.email,
              userName: res.user.displayName,
              userPhoto: res.user.photoURL,
              creationDate: new Date().toDateString(),
              role:role.toLowerCase()
            };
            axiosSecure.post("/createUser", userData).then((res) => {
              console.log(res.data);
            });
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
    <>
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
            <div className="hero-content flex-col gap-8  bg-white dark:bg-gray-900 bg-opacity-70 shadow-[0_0_70px_#F0F0F0] dark:shadow-[0_0_50px_#122827] px-8 rounded-2xl ">
              <h1 className="text-5xl font-bold pt-10  text-main dark:text-slate-400">
                Sign Up now!
              </h1>
              <div className="card backdrop-blur-3xl bg-transparent dark:text-slate-300 pt-3">
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
                        className="input bg-transparent dark:text-slate-300 border  border-black focus:border-dashed focus:outline-none focus:border-main focus:ring-0"
                        required
                      />
                    </div>
                    {/* user Photo  */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Photo</span>
                      </label>

                      <div className="relative w-full">
                        <label className="label absolute -z-50 input pt-2  input-bordered  border-black focus:border-dashed focus:outline-none focus:border-main focus:ring-0 w-full ">
                          <span className="label-text ">
                            {photoName || "Choose Profile Picture"}
                          </span>
                        </label>
                        <input
                          onChange={handlePhotoUpload}
                          accept="images/*"
                          type="file"
                          placeholder="upload your Photo"
                          className="input pt-2 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 border-dashed  border-black focus:border-dashed focus:outline-none focus:border-main focus:ring-0"
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
                        className="input bg-transparent dark:text-slate-300 border  border-black focus:border-dashed focus:outline-none focus:border-main focus:ring-0"
                        required
                      />
                    </div>
                    {/* user role */}
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">
                          Your Role
                        </span>
                      </div>
                      <select onChange={handleRole} className="select select-bordered border border-black focus:border-main focus:outline-none">
                        <option disabled selected>
                         Select Your Role
                        </option>
                        <option>Client</option>
                        <option>FreeLancer</option>
                      </select>
                    </label>
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
                          className="input bg-transparent dark:text-slate-300 border  border-black focus:border-dashed focus:outline-none focus:border-main focus:ring-0"
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
                    <div className="form-control mt-6">
                      <button
                        type="submit"
                        className="btn border border-black hover:border-black focus:border-dashed focus:outline-none focus:border-main focus:ring-0 z-50 hover:bg-transparent dark:text-slate-300 w-full mx-auto bg-transparent dark:text-slate-300  font-semibold mb-3"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div>
                    <p className="my-4 text-main  dark:text-slate-400">
                      Do not have a account ? please :{" "}
                      <Link to={"/signIn"} className=" font-bold text-main dark:text-slate-300">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
