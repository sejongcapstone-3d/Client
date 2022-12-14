import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../redux/userSlice";
import "./SignIn.scss";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredInput, setEnteredInput] = useState({ email: "", password: "" });
  const signinButtonHandler = async () => {
    const response = await axios.post("https://capstone3d.org/login", {
      email: enteredInput.email,
      password: enteredInput.password,
    });
    console.log(response);
    if(response.data.status===200){
      const { data } = response.data;
      console.log(data.id);
      console.log(response.headers);
      window.localStorage.setItem("accessToken", response.headers.atk);
      window.localStorage.setItem("refreshToekn", response.headers.rtk);
      dispatch(userActions.signIn({
        businessName:data.business_name,
        userId:data.id,
        nickName:data.nickname,
        phone:data.phone,
        isSignIn:true,
      }))
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
