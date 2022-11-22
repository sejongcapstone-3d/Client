import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (props) => {
  const ref = useRef();


  const model = useLoader(GLTFLoader, props.path);
  console.log(model);
  return (
    <primitive
      onClick={() => {
        console.log(2);
      }}
      {...props}
      ref={ref}
      object={model.scene}
    />
  );
};

export default Model;
