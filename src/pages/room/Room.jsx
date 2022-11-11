import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "../../common/components/Model";
import Arrow from "../../common/icons/arrow-white.svg";
import Dragable from "../../common/components/Dragable";
import "./Room.scss";
import RoomHeader from "./RoomHeader";
import RoomSideBar from "./RoomSideBar";
import { TransformControls } from "@react-three/drei";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { furnitureActions } from "../../redux/furnitureSlice";
import FurnitureSelector from "./FurnitureSelector";
import FurnitureInfo from "./FurnitureInfo";
import axios from "axios";
import { useLocation } from "react-router-dom";

extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Box = (props) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref} {...props} castShadow>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshPhysicalMaterial color="black" wireframe />
    </mesh>
  );
};

function Room() {
  const [isLoaded, setIsLoaded] = useState(false);
  // const [mode, setMode] = useState("translate");
  const [isOrbit, setIsOrbit] = useState(true);
  const [isDragable, setIsDragable] = useState(false);
  const furnitures = useSelector((state) => state.furniture.furnitures);
  const selectedFurniture = useSelector((state) => state.furniture.selectedFurniture);
  const mode = useSelector((state) => state.furniture.mode);
  const [furniture, setFurniture] = useState([]);
  const roomState = useLocation().state;
  console.log(roomState);
  // const [furnitureData, setFurnitureData] = useState([]);
  const dispatch = useDispatch();
  const infoOpen = useSelector((state)=>state.furniture.furnitureInfo);
  console.log(infoOpen);
  const loadHandler = () => {
    setIsLoaded(true);
  };

  const getFurnitureList = async () => {
    const response = await axios('http://3.35.40.132:8080/furniture');
    console.log(response);
  };

  useEffect(()=>{
    getFurnitureList();
  },[]);

  console.log(mode);
  useEffect(() => {
    setFurniture(
      furnitures.map((data) => {
        return (
          <TransformControls
            onMouseDown={()=>{setIsLoaded(true)}}
            onMouseUp={()=>{setIsLoaded(false)}}
            showX={selectedFurniture.id === data.id}
            showY={selectedFurniture.id === data.id}
            showZ={selectedFurniture.id === data.id}
            enabled={selectedFurniture.id === data.id}
            mode={mode}
          >
            <Model
              loading={loadHandler}
              position={[0, 0, 0]}
              scale={[0.8, 0.8, 0.8]}
              path={data.path}
            />
          </TransformControls>
        );
        // if (selectedFurniture.id === data.id) {
        //   return (
        //     <TransformControls mode={mode}>
        //       <Model
        //         loading={loadHandler}
        //         position={[0, 0, 0]}
        //         scale={[0.8, 0.8, 0.8]}
        //         path={data.path}
        //       />
        //     </TransformControls>
        //   );
        // } else {
        //   return (
        //     <Model
        //       loading={loadHandler}
        //       position={[0, 0, 0]}
        //       scale={[0.8, 0.8, 0.8]}
        //       path={data.path}
        //     />
        //   );
        // }
      })
    );
  }, [furnitures, mode, selectedFurniture]);

  const addFurniture = (path, mode, id) => {
    // setFurnitureData((prev) => {
    //   return [...prev, { path, mode, id }];
    // });
    // setFurniture((prev) => {
    //   return [
    //     ...prev,
    //     <TransformControls mode={mode}>
    //       <Model
    //         loading={loadHandler}
    //         position={[0, 0, 0]}
    //         scale={[0.8, 0.8, 0.8]}
    //         path="https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json"
    //       />
    //     </TransformControls>,
    //   ];
    // });
  };
  console.log(isLoaded, isOrbit);
  return (
    <div className="room">
      <FurnitureSelector />
      <RoomHeader addFurniture={addFurniture} />
      {infoOpen && <FurnitureInfo/>}
      {<RoomSideBar />}
      {/* {!isLoaded && <div className="room-loading">Loading...</div>} */}
      <Canvas shadows style={{ background: "#ececec" }} camera={{ position: [4, 4, 4] }}>
        <pointLight castShadow position={[1, 5, 0]} />
        {!isLoaded && isOrbit && <Orbit />}
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          {/* <primitive onClick={()=>{console.log(1)}} object={new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())}/> */}
          <Model
            loading={loadHandler}
            position={[0, 0, 0]}
            scale={[0.8, 0.8, 0.8]}
            path={roomState.roomUrl}
          />
          {furniture}
        </Suspense>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}

export default Room;
