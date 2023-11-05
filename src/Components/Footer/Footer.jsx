import { FaFacebookF } from "react-icons/fa";
import { BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer p-10 container mx-auto justify-between">
        <aside>
          <img
            src="https://i.ibb.co/ZHDJ3R6/Skill-Exchange-1.webp"
            className="w-20"
            alt=""
          />
          <p>
            <span className="text-2xl font-bold text-[#007456]">
              Skill Exchange
            </span>
            <br />
            Providing reliable tech since 2009
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>

        </nav>

        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <header className="footer-title">Get In Touch</header>
          <div className="flex gap-4 text-[#007456] text-2xl">
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
