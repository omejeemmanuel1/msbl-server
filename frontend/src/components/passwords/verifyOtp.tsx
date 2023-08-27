import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/meri-logo.png";
import axios from "axios";
import "./verifyOtp.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, otpDigits.length);
  }, [otpDigits.length]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);

      if (value) {
        if (index < otpDigits.length - 1) {
          otpInputRefs.current[index + 1]?.focus();
        }
      } else {
        if (index > 0) {
          otpInputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("text");
    const clipboardDigits = clipboardData.match(/\d/g);
    if (clipboardDigits && clipboardDigits.length === 6) {
      const newOtpDigits = [...otpDigits];
      clipboardDigits.forEach((digit, index) => {
        newOtpDigits[index] = digit;
      });
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
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (
        response.data.message ==
        "OTP verified successfully. Proceed to change your password"
      ) {
        swal("OTP verified successfully. Proceed to change your password");

        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      }
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
                ref={(input) => (otpInputRefs.current[index] = input)}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={handlePaste}
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
