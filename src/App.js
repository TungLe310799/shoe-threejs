import "./index.css";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  folder,
  Leva,
  useControls,
  LevaPanel,
  useCreateStore,
  button,
} from "leva";
import { Color } from "three";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/shoe.gltf");
  
  // ------USING LEVA --------
  const { scale,Laces, Body, Soul, stripesColor } = useControls(
    "SHOE",
    {
      scale: 1,
      color: folder({
        Laces: "#fff",
        Body: "#fff",
        Soul: "#fff",
        stripesColor: "#fff",
      })
    }
  );
  

  return (
    <group ref={group} {...props} dispose={null} scale={scale}>
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={Laces}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={Body}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={Body}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color="#000"
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={Soul}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={stripesColor}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={Soul}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={stripesColor}
      />
    </group>
  );
}

function App() {
  const [mesh, setMesh] = useState("#ffffff");
  const [stripes, setStripes] = useState("#ffffff");
  const [soul, setSoul] = useState("#ffffff");

  const [displayMesh, setDisplayMesh] = useState(true);
  const [displayStripes, setDisplayStripes] = useState(true);
  const [displaySoul, setDisplaySoul] = useState(true);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="card">
          <div className="product-canvas">
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight />
                <spotLight
                  intensity={0.9}
                  angle={0.1}
                  penumbra={1}
                  position={[10, 15, 10]}
                  castShadow
                />
                <Model
                  customColors={{ mesh: mesh, stripes: stripes, soul: soul }}
                  customVisible={{ soul: displaySoul }}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                />
              </Suspense>
            </Canvas>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
