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
import { TransformControls, useSelect } from "@react-three/drei";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { furnitureActions } from "../../redux/furnitureSlice";
import FurnitureSelector from "./FurnitureSelector";

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
  const furnitures = useSelector((state) => state.furnitures);
  const selectedFurniture = useSelector((state) => state.selectedFurniture);
  const mode = useSelector((state) => state.mode);
  const [furniture, setFurniture] = useState([]);
  // const [furnitureData, setFurnitureData] = useState([]);
  const dispatch = useDispatch();
  const loadHandler = () => {
    setIsLoaded(true);
  };

  console.log(mode);
  useEffect(() => {
    setFurniture(
      furnitures.map((data) => {
        return (
          <TransformControls mode={mode}>
            <Model
              loading={loadHandler}
              position={[0, 0, 0]}
              scale={[0.8, 0.8, 0.8]}
              path={data.path}
            />
          </TransformControls>
        );
      })
    );
  }, [furnitures, mode]);

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

  return (
    <div className="room">
      <FurnitureSelector/>
      <RoomHeader addFurniture={addFurniture} />
      {<RoomSideBar />}
      {/* {!isLoaded && <div className="room-loading">Loading...</div>} */}
      <Canvas shadows style={{ background: "#ececec" }} camera={{ position: [4, 4, 4] }}>
        <pointLight castShadow position={[1, 5, 0]} />
        {isLoaded && isOrbit && <Orbit />}
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          {/* <primitive onClick={()=>{console.log(1)}} object={new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())}/> */}
          {/* <Model
            loading={loadHandler}
            position={[0, 0, 0]}
            scale={[0.8, 0.8, 0.8]}
            path="https://3d-rooms.s3.ap-northeast-2.amazonaws.com/test/Room.json"
          /> */}
          {furniture}
        </Suspense>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}

export default Room;
