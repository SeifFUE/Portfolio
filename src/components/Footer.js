import fue from "../assets/img/Fue.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-left">
          <div className="footer-brand">
            <img src={fue} alt="FUE" />
            <h2>My Portfolio</h2>
          </div>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        <div className="footer-right">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#connect">Contact</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;