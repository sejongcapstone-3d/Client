import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = props => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y += 0.01;
  })
  const model = useLoader(
    GLTFLoader,
    props.path
  );
  console.log(model);
  return <primitive {...props} ref={ref} object={model.scene}/>;
}

export default Model;