import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Left */}
        <div className="footer-left">
          <div className="locale-pill">
            India · English (UK) · ₹ INR
          </div>
        </div>

        {/* Middle */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>Help</h4>
            <a href="#">Privacy Settings</a>
            <a href="#">Log in</a>
          </div>

          <div className="footer-col">
            <h4>Cookie policy</h4>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Company details</a>
          </div>
        </div>

        {/* Right */}
        <div className="footer-accordion">
          {[
            "Explore",
            "Company",
            "Partners",
            "Trips",
            "International Sites"
          ].map((item) => (
            <button key={item} className="accordion-btn">
              <span>{item}</span>
              <span className="arrow">▾</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        Cheap flight booking from anywhere, to everywhere<br />
        © YourAirline Ltd 2002 – 2026
      </div>
    </footer>
  );
}
