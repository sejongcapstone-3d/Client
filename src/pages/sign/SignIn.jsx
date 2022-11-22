import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";

function SignIn() {
  const navigate = useNavigate();
  const [enteredInput, setEnteredInput] = useState({ email: "", password: "" });
  const signinButtonHandler = async () => {
    const response = await axios.post("https://capstone3d.org/login", {
      email: enteredInput.email,
      password: enteredInput.password,
    });
    console.log(response);
    if(response.data.status===200){
      navigate('/user/upload');
    }
  };

  const inputChangeHandler = (e) => {
    setEnteredInput((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  return (
    <div className="user">
      <div className="signin">
        <div className="signin-description">방 등록을 위해선 로그인이 필요합니다</div>
        <input
          value={enteredInput.email}
          className="signin-input"
          id="email"
          placeholder="Email"
          onChange={inputChangeHandler}
        />
        <input
          value={enteredInput.password}
          type="password"
          className="signin-input"
          id="password"
          placeholder="Password"
          onChange={inputChangeHandler}
        />
        <button className="signin-button" onClick={signinButtonHandler}>로그인</button>
        <div className="signin-signup">
          계정이 없으신가요?{" "}
          <span
            onClick={() => {
              navigate("/user/signUp");
            }}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
