import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer items-center p-4 bg-neutral text-neutral-content">
        <div className="items-center grid-flow-col">
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            className="text-2xl hover:text-secondary"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/myself-rasel-mahmud/basha-vara-lagbe"
          >
            <FaGithub />
          </a>
          <a
            className="text-2xl hover:text-secondary"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/MyselfRaselMahmud/"
          >
            <FaLinkedinIn />
          </a>
          <a
            className="text-2xl hover:text-secondary"
            target="_blank"
            rel="noreferrer"
            href="https://facebook.com/MyselfRaselMahmud"
          >
            <FaFacebookF />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
