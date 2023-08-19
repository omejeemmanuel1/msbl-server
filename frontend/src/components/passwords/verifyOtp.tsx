import React, { useState } from "react";
import Logo from "../../assets/meri-logo.png";
import axios from "axios";
import "./verifyOtp.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const otp = otpDigits.join("");

    try {
      const response = await axios.post(
        "http://localhost:3000/password/verify-otp",
        {
          otp: parseInt(otp),
        }
      );

      console.log(response);
      swal("OTP verified successfully. Proceed to change your password");

      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forgotpass_container">
      <div className="forgotpass_main">
        <div className="logo_container">
          <div></div>
          <img src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className="center" action="">
          <h4>OTP Verification</h4>
          <div className="otp-container">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
            ))}
          </div>
          <button type="submit" className="btn">
            Verify
          </button>
          <p className="resend-text">
            Didn't receive the code?{"  "}
            <a href="/password/forgot" className="resend-link">
              Resend OTP
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
