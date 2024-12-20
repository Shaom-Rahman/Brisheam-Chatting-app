import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, } from "firebase/auth";
import { Slide, toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  // ------------------------------------- useState part ----------------------------
  const [Show, setShow] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  //  ----------------------------------- firebase variables -------------------------
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // ------------------------------------ functions part ----------------------------
  const handelShow = () => {
    setShow(!Show);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!Email) {
      setEmailError("Enter your email");
    }
    if (!Password) {
      setPasswordError("Enter your password");
    } else {
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          const user = userCredential.user;

      // -------------------------------- email verification --------------------------
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("Email Verification send!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

      // --------------------------------- email taken error -------------------------

          if (errorCode == "auth/email-already-in-use") {
            toast.error(" Email has already taken  !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          }
        });
    }
  };

  // --------------------------------- google sign in -----------------------------
  const handelGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <section className="Login ">
        <div className="container">
          <div className="menuRow ">
            <div className="mainText">
              <h1>WELCOME BACK! </h1>
              <p>
                Already have a account,
                <span className="text-[#8699DA] font-medium">
                  Sign In
                </span>
              </p>
              <form>
                <p className="name"> Email</p>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value), setEmailError("");
                  }}
                  className="input1"
                  type="text"
                  placeholder="deniel123@gmail.com"
                />
                <h3 className="font-Nunito font-semibold text-center text-[18px] text-red-700">          
                  {EmailError}
                </h3>
                <p className="pass"> Password</p>
                <div className="flex justify-center items-center password_Input">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value), setPasswordError("");
                    }}
                    // className="input2"
                    type={Show ? "text" : "password"}
                  />
                  <span className="eye">
                    {Show ? (
                      <FaRegEye onClick={handelShow} />
                    ) : (
                      <FaEyeSlash onClick={handelShow} />
                    )}
                  </span>
                </div>
                <h3 className="font-Nunito font-semibold text-center text-[18px] text-red-700">
                  {PasswordError}
                </h3>
                <div className="Others">
                  <div className="remember ">
                    <div className="circle">
                      <Icon icon="formkit:radio" />
                    </div>
                    <p> Remember me</p>
                  </div>
                  <div className="forget">
                    <p> Forget password? </p>
                  </div>
                </div>
                <div className="menuButton ">
                  <button onClick={handelSubmit}> Sign Up </button>
                </div>
                <div className="socialParts">
                  <div className="continueline">
                    <div> </div>
                    <p> or continue with</p>
                    <div> </div>
                  </div>
                  <div className="socialSite ">
                    <FcGoogle
                      onClick={handelGoogle}
                      className="w-[120px] h-[80px] border-[2px] border-[#8699DA] p-[15px]
                         rounded-[8px] text-[25px] md:text-[48px]"
                    />
                    <BsFacebook
                      className="w-[120px] h-[80px] border-[2px] border-[#8699DA] p-[15px]
                         rounded-[8px] text-[30px] md:text-[48px] text-[#8699DA]"
                    />
                    <FaApple
                      className="w-[120px] h-[80px] border-[2px] border-[#8699DA] p-[15px]
                         rounded-[8px] text-[30px] md:text-[48px] text-[#444B59]"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="menuImage ">
              <img src="Images/Image.png" alt="logo" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
