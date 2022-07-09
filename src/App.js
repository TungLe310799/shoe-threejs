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
  const { scale, bodycolor, color2, soleColor, stripesColor } = useControls(
    "SHOE",
    {
      transform: folder({
        scale: 1,
      }),
      bodyColor: folder({
        bodycolor: "#fff",
      }),
      laceColor: folder({
        color2: "#fff",
      }),
      soleColor: folder({
        soleColor: "#fff",
      }),
      stripeColor: folder({
        stripesColor: "#fff",
      }),
    }
  );
  

  return (
    <group ref={group} {...props} dispose={null} scale={scale}>
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={color2}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={bodycolor}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={color2}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={color2}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={soleColor}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={stripesColor}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={soleColor}
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
          <div className="control">
            <h2>Control</h2>
            <div className="colors">
              <form>
                <h3>Change color</h3>
                <div className="item">
                  <label for="mesh">Main</label>
                  <input
                    type="color"
                    id="mesh"
                    name="mesh"
                    value={mesh}
                    onChange={(e) => setMesh(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label for="stripes">Stripes</label>
                  <input
                    type="color"
                    id="stripes"
                    name="stripes"
                    value={stripes}
                    onChange={(e) => setStripes(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label for="soul">Soul</label>
                  <input
                    type="color"
                    id="soul"
                    name="soul"
                    value={soul}
                    onChange={(e) => setSoul(e.target.value)}
                  />
                </div>
                <h3>Display</h3>
                <div className="item">
                  <label for="mesh">Main</label>
                  <input
                    type="checkbox"
                    id="mesh"
                    name="mesh"
                    defaultChecked={displayMesh}
                  />
                </div>
                <div className="item">
                  <label for="stripes">Stripes</label>
                  <input
                    type="checkbox"
                    id="displayStripes"
                    name="displayStripes"
                    defaultChecked={displayStripes}
                  />
                </div>
                <div className="item">
                  <label for="soul">Soul</label>
                  <input
                    type="checkbox"
                    id="displaySoul"
                    name="displaySoul"
                    defaultChecked={displaySoul}
                    onChange={(e) => {
                      setDisplaySoul(false);
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
