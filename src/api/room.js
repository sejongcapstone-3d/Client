import axios from "axios";

async function getRoomDatas(func, dispatch) {
  try{  
  const response = await axios('http://3.35.40.132:8080/room');
  func(response);
  }catch(err){
    console.log(err);
  }
};

export {getRoomDatas};