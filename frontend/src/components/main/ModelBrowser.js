import { Box, IconButton, InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ModelBrowser.css";
const ModelBrowser = () => {
  const url = "http://localhost:5000";
  const [threeDArray, setthreeDArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const { category } = useParams();
  const handleFilter = async () => {
    
    const response = await fetch("http://localhost:5000/3dmodel/getall");
    const data = await response.json();
    setthreeDArray(
      data.filter((value) => {
        return value.title.toLowerCase().includes(filter.toLowerCase());
      })
    );
    // if (searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };
  const filterCategory = async (category) => {
    const response = await fetch("http://localhost:5000/3dmodel/getall");
    const data = await response.json();

    setthreeDArray(
      data.filter((value) => {
        return value.category.toLowerCase().includes(category.toLowerCase());
      })
    );
  };

  const getDataFromBackend = async () => {
    if (category) {
      filterCategory(category);
      return;
    }
    const response = await fetch("http://localhost:5000/3dmodel/getall");
    const data = await response.json();
    console.log(data);
    setthreeDArray(data);
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);

  return (
    <div style={{ background: "#7f9ead"}}>
      {/* style={{ background: "#7f9ead"}} */}
      <div className="container " style={{ padding: "4rem" }}>
        
          <div className="btn-toolbar " style={{float:"",marginLeft:"35%",marginTop:"-3%",display:"flex"}}>
                      <button
                        className="btn "
                        style={{ marginRight: "3%" ,marginLeft:"15%",color:"black"}}
                        onClick={(e) => filterCategory("Characters & Creatures 3D Models")}
                      >
                        Characters & Creatures 3D Models
                      </button>
                      
                      <button
                        className="btn "
                        style={{ color:"black" }}
                        onClick={(e) => filterCategory("Cars & Vehicles 3D Models")}
                      >
                       Cars & Vehicles 3D Models
                      </button>
                      
                      <button
                        className="btn "
                        style={{ marginTop: "3%" ,marginLeft:"",color:"black"}}
                        onClick={(e) => filterCategory("Architecture 3D Models")}
                      >
                      Architecture 3D Models
                      </button>
                      <button
                        className="btn "
                        style={{ marginTop: "3%",marginLeft:'3%' ,color:"black"}}
                        onClick={(e) => filterCategory("Animals & Pets 3D Models")}
                      >
                Animals & Pets 3D Models
                      </button>
                      <button
                        className="btn "
                        style={{ marginTop: "3%" ,marginLeft:'2%',color:"black"}}
                        onClick={(e) => filterCategory("Electronics & Gadgets 3D Models")}
                      >
               Electronics & Gadgets 3D Models
                      </button>
                      
                    </div>
                    {/* <model-viewer
                      src={url + "/spaceskull_-_skullchaser/scene.gltf"}
                      alt="model robot"
                      auto-rotate
                      camera-controls
                      ar
                      ios-src={url + "/spaceskull_-_skullchaser/scene.gltf"}
                    ></model-viewer>  */}
        <model-viewer
          src={url + "/Drossel.gltf"}
          alt="model robot"
          auto-rotate
          camera-controls
          ar
          ios-src={url + "/Drossel.gltF"}
        ></model-viewer>
        {/* <model-viewer
          src={url + "/Drossel.gltf"}
          alt="model robot"
          auto-rotate
          camera-controls
          ar
          ios-src={url + "/Drossel.gltF"}
        ></model-viewer> */}
      
<form>
    <TextField
      id="search-bar"
      sx={{ marginLeft: "26%", width: "70%" ,marginTop:"4%",}}
      className="text "
      onChange={(e) => setFilter(e.target.value)}
      // onInput={(e) => {
      //   setSearchQuery(e.target.value);
      // }}
      label="Explore"
      variant="outlined"
      placeholder="Search Your 3D Model..."
      // size="small"
    />
    <IconButton type="button" aria-label="search"  onClick={handleFilter}>
      <SearchIcon style={{ fill: "", fontSize:"30px" ,marginTop:"170%",float:"right"}} />
    </IconButton>
    {filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <a href={value.file} className="dataItem" target="_blank">
                      <p>{value.title}</p>
                    </a>
                  );
                })}
              </div>
            )}
  </form>
        {/* <TextField
          // className="w-100"
          sx={{ marginLeft: "25%", width: "70%" }}
          label="Explore"
          placeholder="Search Your 3D Model...."
          color="secondary"
          focused
        >
          
        </TextField> */}
        
        {/* <InputBase 
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Podcast to Search"
              inputProps={{ "aria-label": "Enter Podcast to Search" }}
            /> */}
            {/* <div className="" style={{float:'right',border:'2px solid'}}>
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton></div> */}
      </div>
      <div className="container-fluid mt-5">
        <div className="row ">
          {threeDArray.map((curr) => {
            return (
            <div className="col-10 col-md-4 mt-5">
              <div className="container style">

                {/* -----------------------      second code -------------------------------- */}
                 {/* <div className="card">
                  <div className="box"> 
                  <div className="card" style={{  background: "#ebf5fc"}}>
                   
                    <img
                      src={
                        "http://localhost:5000/images/"+curr.image
                      }
                      className="img-fluid"
                    />
                      <div className="card-body" >
                    <h2 className="card-title text-center"> {curr.title}</h2>
                    <p className="card-text">
                      Description : {curr.description}
                    </p>
                    <p className="card-text">Triangle : {curr.triangle}</p>
                    <p className="card-text">Size : {curr.size}</p>
                    <p className="card-text">Material : {curr.materials}</p>
                    <p className="card-text">Support : {curr.support}</p>
                    <p className="card-text">Uploaded BY : {curr.uploadedBy}</p>
                    <Link to={'/viewer/'+curr._id} className="btn btn-primary w-100"  >
                      View Model
                    </Link>
                     
                    </div>
                  </div>
                  </div>
                  </div>  */}



                  {/*     ------------------------       first code                                                ---------- */}
                  {/* <div
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
                      Description : {curr.description}
                    </p>
                    <p className="card-text">Triangle : {curr.triangle}</p>
                    <p className="card-text">Size : {curr.size}</p>
                    <p className="card-text">Material : {curr.materials}</p>
                    <p className="card-text">Support : {curr.support}</p>
                    <p className="card-text">Uploaded BY : {curr.uploadedBy}</p>
                    <Link to={'/viewer/'+curr._id} className="btn btn-primary w-100"  >
                      View Model
                    </Link>
                       
                  </div> */}

                  <div className="card outer">
                    <div className="card-body outer2">
                    <div className="imgbox">
                    <img
                      src={
                        "http://localhost:5000/images/"+curr.image
                      }
                      className="img-fluid im"
                    />
                    </div>
                    <div className="con">
                    <h1 className="card-title text-center"> {curr.title}</h1>
                  
                    <div className="container details">
                    {/* <div className="row">
                    <div className="col"> */}
                    <span className="data">Size<h5> <b>{curr.size}</b></h5> </span>

                    {/* </div> */}
                    {/* <div className="col" > */}
                    

                    <span className="data" >Uploaded BY
                      <h5> <b>{curr.uploadedBy}</b></h5>
                      </span>
                    {/* </div> */}
                    {/* </div> */}
                    </div>
                    {/* <p className="card-text">
                      Description : {curr.description}
                    </p> */}
 <p className="text-muted text-center">{curr.category}</p>
                    {/* <p className="card-text">Triangle : {curr.triangle}</p>
                    <p className="card-text">File : {curr.file}</p>
                    <p className="card-text">Image : {curr.image}</p> */}
                    {/* <p className="card-text">Material : {curr.materials}</p>
                    <p className="card-text">Support : {curr.support}</p> */}
                     <Link to={'/main/viewer/'+curr._id} className="btn  btn-primary model w-100"  >
                      View Model
                    </Link>
                    </div>
                  </div>




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
