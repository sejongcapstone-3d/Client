import axios from "axios";

async function signUp(data, func, dispatch) {
  // const {email, password, nickname, phone, buisness_name} = data;
  try{  
  const response = await axios.post('https://capstone3d.org/sign-up',data);
  func(response);
  }catch(err){
    console.log(err);
  }
};

export {getRoomDatas};