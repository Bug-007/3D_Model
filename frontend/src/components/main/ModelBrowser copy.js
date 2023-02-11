import { Box, IconButton, InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const ModelBrowser = () => {
  const url = "http://localhost:5000";
  const [threeDArray, setthreeDArray] = useState([]);

  const getDataFromBackend = async () => {
    const response = await fetch("http://localhost:5000/3dmodel/getall");
    const data = await response.json();
    console.log(data);
    setthreeDArray(data);
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);

  return (
    <div>
      <div className="container " style={{padding:"5rem"
          }}>
        <model-viewer 
        src={url + "/Drossel.gltf"}
        alt="model robot"
        auto-rotate
        camera-controls
        ar
        ios-src={url + "/Drossel.gltF"}
        
      ></model-viewer>
       
      <TextField
            // className="w-100"
            sx={{marginLeft:"25%" ,width: "70%" }}
            label="Explore"
            placeholder="Search Your 3D Model...."
            color="secondary" focused
          ></TextField>
             {/* <InputBase 
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Podcast to Search"
              inputProps={{ "aria-label": "Enter Podcast to Search" }}
            /> */}
             <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            
      </div>
      <div className="container-fluid mt-5 ">
        <div className="row ">
          {threeDArray.map((curr) => {
            return (
              <div className="col-10 col-md-4 mt-5">
                <div className="card">
                  <div
                    className="bg-image hover-overlay ripple"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={
                        "http://localhost:5000/images/"+curr.image
                      }
                      className="img-fluid"
                    />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="card-body" >
                    <h3 className="card-title text-center"> {curr.title}</h3>
                    <p className="card-text">
                      Description : {curr.description.substring(0,10)}
                    </p>
                    <p className="card-text">Triangle : {curr.triangle}</p>
                    <p className="card-text">Size : {curr.size}</p>
                    <p className="card-text">Material : {curr.materials}</p>
                    <p className="card-text">Support : {curr.support}</p>
                    <p className="card-text">Uploaded BY : {curr.uploadedBy}</p>
                    <Link to={'/main/viewer/'+curr._id} className="btn btn-primary w-100"  >
                      View Model
                    </Link>
                       
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ModelBrowser;
