import React from "react";
import "./Footerpart.css";
import { SocialIcon } from "react-social-icons";
function Footerpart() {
  return (
    <div>
      <div className="foot-wrapper">
        <div className="foot-top">
          <div className="location">
            <div className="l-header">LOCATION</div>
            <div className="l-context">
              16-21-178 Vishal Nagar Kuktapally Hyderabad Telanagana 500012
            </div>
            <div className="l-email">
              <span>Email :</span>support@garuda.in
            </div>
            <div style={{ height: 15 }}></div>
            <div className="social-icons">
              <div>
                <SocialIcon
                  target="_blank"
                  url="https://www.instagram.com/__starshot__/"
                />
              </div>
              <div>
                <SocialIcon
                  target="_blank"
                  url="https://www.youtube.com/channel/UC-pPkgbJE4VfOubZrARclkg"
                />
              </div>
              <div>
                <SocialIcon
                  target="_blank"
                  url="https://github.com/GLokeshchary"
                />
              </div>
            </div>
          </div>
          <div className="information">
            <div className="l-header">INFORMATION</div>
            <div className="el-link">
              <div>Our Story</div>
              <div>Contact Us</div>
              <div>Terms & Conditions</div>
            </div>
          </div>
          <div className="newsletter">
            <div className="l-header">NEWS LETTER</div>
            <div className="footerbutton">
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="copyright">© 2023 Garuda All Rights Reserved.</div>
          <div className="paytmm">
            <img
              src="https://www.fansarmy.in/cdn/shop/files/Untitled_design_4.webp?v=1685622140"
              alt="payments"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footerpart;
