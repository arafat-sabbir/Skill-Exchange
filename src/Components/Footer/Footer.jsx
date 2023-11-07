import { FaFacebookF } from "react-icons/fa";
import { BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-[#FAF6EB]">
      <footer className="footer p-10 container mx-auto justify-between">
        <aside>
          <img
            src="https://i.ibb.co/ZHDJ3R6/Skill-Exchange-1.webp"
            className="w-20"
            alt=""
          />
          <p>
            <span className="text-2xl font-bold text-main">
              Skill Exchange
            </span>
            <br />
            Providing reliable tech since 2009
          </p>
        </aside>
        <nav>
          <header className=" border-b-[4px] pb-1 mb-2  border-b-main">Services</header>
          <a className="link hover:text-main font-medium link-hover">Branding</a>
          <a className="link hover:text-main font-medium link-hover">Design</a>
          <a className="link hover:text-main font-medium link-hover">Marketing</a>

        </nav>

        <nav>
          <header className="border-b-[4px] pb-1 mb-2  border-b-main">Legal</header>
          <a className="link hover:text-main font-medium link-hover">Terms of use</a>
          <a className="link hover:text-main font-medium link-hover">Privacy policy</a>
          <a className="link hover:text-main font-medium link-hover">Cookie policy</a>
        </nav>
        <nav>
          <header className="text  font-semibold border-b-[4px] pb-1 mb-2  border-b-main">Get In Touch</header>
          <div className="flex gap-4 text-main text-2xl">
            <a>
              <FaFacebookF></FaFacebookF>
            </a>
            <a>
              <BsTwitter></BsTwitter>
            </a>
            <a>
              <BsInstagram></BsInstagram>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
