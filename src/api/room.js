import axios from "axios";

async function getRoomDatas(func, dispatch) {
  try{  
  const response = await axios('https://capstone3d.org/room');
  func(response);
  }catch(err){
    console.log(err);
  }
};

async function uploadRoom(formData,accessToken, func){
    await axios.post('https://capstone3d.org/upload', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'Authorization' : 'Bearer' + accessToken.slice(6,)
      }
    })
    .then((data)=>{
      func(data);
    })
    .catch((error)=> {
      console.log(error);
    })
};

export {getRoomDatas, uploadRoom};