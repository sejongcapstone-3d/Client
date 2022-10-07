import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = props => {
  const ref = useRef();
  
  const model = useLoader(
    GLTFLoader,
    props.path
  );
  model.scene.uuid = 2;
  console.log(model);
  props.loading();
  return <primitive {...props} ref={ref} object={model.scene}/>;
}

export default Model;