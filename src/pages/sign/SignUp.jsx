import axios from "axios";
import React from "react";
import { useState } from "react";
import "./SignUp.scss";
import {
  checkBuisnessName,
  checkEmail,
  checkNickname,
  checkPassword,
  checkPhone,
} from "./validcheck";

function SignUp() {
  const [enterdInput, setEnteredInput] = useState({
    email: "",
    password: "",
    buisnessName: "",
    nickname: "",
    phone: "",
  });
  const [validInput, setValidInput] = useState({
    email: false,
    password: false,
    buisnessName: false,
    nickname: false,
    phone: false,
  });
  const [feedback, setFeedback] = useState({
    email: "",
    password: "",
    buisnessName: "",
    nickname: "",
    phone: "",
  });
  const isValid =
    validInput.email &&
    validInput.password &&
    validInput.nickname &&
    validInput.phone &&
    validInput.buisnessName;

  const inputChangeHandler = (e) => {
    setEnteredInput((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    inputValidCheck(e.target.value, e.target.id);
  };

  const inputValidCheck = (input, type) => {
    let response;
    if (type === "email") {
      response = checkEmail(input);
    } else if (type === "password") {
      response = checkPassword(input);
    } else if (type === "nickname") {
      response = checkNickname(input);
    } else if (type === "buisnessName") {
      response = checkBuisnessName(input);
    } else {
      response = checkPhone(input);
    }

    if (!response.isValid) {
      setValidInput((prev) => {
        return { ...prev, [type]: false };
      });
    } else {
      setValidInput((prev) => {
        return { ...prev, [type]: true };
      });
    }

    setFeedback((prev) => {
      return { ...prev, [type]: response.message };
    });
  };

  const signupButtonHandler = async () => {
    const response = await axios.post('https://capstone3d.org/sign-up',{
      email:enterdInput.email,
      password:enterdInput.password,
      nickname:enterdInput.nickname,
      phone:enterdInput.phone,
      business_name:enterdInput.buisnessName
    });
    console.log(response);
  };
  
  return (
    <div className="user">
      <div className="signin">
        <div className="signin-description">회원정보를 입력해주세요</div>
        <div className="signin-inputbox">
          <input
            id="email"
            value={enterdInput.email}
            className="signin-inputbox-input"
            placeholder="이메일"
            onChange={inputChangeHandler}
          />
          {feedback.email.length > 0 && (
            <span className="signin-inputbox-feedback">{feedback.email}</span>
          )}
        </div>
        <div className="signin-inputbox">
          <input
            id="password"
            value={enterdInput.password}
            type="password"
            className="signin-inputbox-input"
            placeholder="비밀번호"
            onChange={inputChangeHandler}
          />
          {feedback.password.length > 0 && (
            <span className="signin-inputbox-feedback">{feedback.password}</span>
          )}
        </div>
        <div className="signin-inputbox">
          <input
            id="nickname"
            value={enterdInput.nickname}
            className="signin-inputbox-input"
            placeholder="닉네임"
            onChange={inputChangeHandler}
          />
          {feedback.nickname.length > 0 && (
            <span className="signin-inputbox-feedback">{feedback.nickname}</span>
          )}
        </div>
        <div className="signin-inputbox">
          <input
            id="phone"
            value={enterdInput.phone}
            className="signin-inputbox-input"
            placeholder="휴대폰번호 ( - 포함)"
            onChange={inputChangeHandler}
          />
          {feedback.phone.length > 0 && (
            <span className="signin-inputbox-feedback">{feedback.phone}</span>
          )}
        </div>
        <div className="signin-inputbox">
          <input
            id="buisnessName"
            value={enterdInput.buisnessName}
            className="signin-inputbox-input"
            placeholder="상호명 또는 이름"
            onChange={inputChangeHandler}
          />
          {feedback.buisnessName.length > 0 && (
            <span className="signin-inputbox-feedback">{feedback.buisnessName}</span>
          )}
        </div>
        <button disabled={!isValid} className="signin-button" onClick={signupButtonHandler}>회원가입</button>
      </div>
    </div>
  );
}

export default SignUp;
