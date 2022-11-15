import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";

function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="user">
      <div className="signin">
        <div className="signin-description">방 등록을 위해선 로그인이 필요합니다</div>
        <input className="signin-input" placeholder="Email" />
        <input type="password" className="signin-input" placeholder="Password" />
        <button className="signin-button">로그인</button>
        <div className="signin-signup">
          계정이 없으신가요? <span onClick={()=>{navigate('/user/signUp')}}>회원가입</span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
