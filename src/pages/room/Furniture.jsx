import { extend, useThree } from "@react-three/fiber";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
extend({ TransformControls });

const Transform = () => {
  const {camera, gl} = useThree();
  return <transfromControls args={[camera, gl.domElement]} setMode='transform' />;
};

export default Transform;