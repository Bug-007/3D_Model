import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls } from "@react-three/drei";
import { Link, useParams } from "react-router-dom";

const ViewModel = () => {
  const { id } = useParams();
  const url = "http://localhost:5000";
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getModelById = () => {
    setLoading(true);
    fetch(url + "/3dmodel/getbyid/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setModelData(data);
        setLoading(false);
        console.log(url + "/extracted/" + data.file + "/scene.gltf");
      });
  };

  useEffect(() => {
    getModelById();
  }, []);

  const displayModelData = () => {
    console.log(loading);
    if (!loading && modelData) {
      return (
        <div
          style={{
            background:
              "linear-gradient(to top, #ffffff00,#64a5ad, #ffffff00,#64a5ad)",
          }}
        >
          <div className="container">
            <div className="row " style={{ padding: "3rem" }}>
              {/* <div className="col-md-12"> */}
              <div className="card bg-">
                <div className="card-body">{showModel(modelData.file)}</div>
                {/* </div> */}

                <div style={{ padding: "2rem", marginTop: "-3%" }}>
                  <h2
                    className="card-title"
                    style={{ fontWeight: "bold", fontSize: "50px" }}
                  >
                    {" "}
                    {modelData.title}
                  </h2>
                  <h5>3D Model</h5>
                  <p className="card-text" >
                    <b>Created At:</b> {modelData.createdAt}
                  </p>
                  <a
                    href={url + "/zipfiles/" + modelData.file}
                    target="_blank"
                    className="btn text-white"
                    style={{
                      float: "right",
                      marginTop: "-11%",
                      background: "#64a5ad",
                    }}
                  >
                    {" "}
                    <i class="fa-solid fa-download"></i> Download 3D Model
                  </a>
                  <h5
                    style={{
                      float: "right",
                      marginTop: "-7%",
                      fontWeight: "bold",
                    }}
                    className="card-text"
                  >
                    Uploaded BY : {modelData.uploadedBy}
                  </h5>
                  <hr />
                </div>
                <div
                  style={{
                    paddingLeft: "2rem",
                    fontSize: "20px",
                    marginTop: "-2%",
                  }}
                >
                  <div className="row">
                    <div className="col-md">
                      <p className="card-text">
                        <b>Triangle : </b>
                        {modelData.triangle}
                      </p>
                    </div>
                    <div className="col-md">
                      <p className="card-text">
                        <b>Vertices:</b>
                        {modelData.vertices}
                      </p>
                    </div>
                    {/* <div className="col-md">
            <p className="card-text"><b>Material :</b> {modelData.materials}</p>
            </div> */}
                    <div className="col-md">
                      <p className="card-text">
                        <b>Material :</b> {modelData.materials}
                      </p>
                    </div>
                    <div className="col-md">
                      <p className="card-text">
                        <b>Textures :</b> {modelData.textures}
                      </p>
                    </div>

                    <div className="col-md">
                      <p className="card-text">
                        <b>Size :</b> {modelData.size}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <p className="card-text">
                    <b>Description:</b> {modelData.description}
                  </p>
                  <hr />
                </div>
                <Link
                  style={{ background: "#64a5ad" }}
                  className="btn "
                  to="/home"
                >
                  Go Back
                </Link>
                <hr />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const Model = ({ path }) => {
    const gltf = useLoader(GLTFLoader, path);
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
      </>
    );
  };

  const showModel = (modelname) => {
    console.log(url + "/extracted/" + modelname + "/scene.gltf");
    return (
      <Canvas style={{ height: "100vh" }}>
        <Suspense fallback={null}>
          <Model path={url + "/extracted/" + modelname + "/scene.gltf"} />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    );
  };

  return <div>{displayModelData()}</div>;
};

export default ViewModel;
