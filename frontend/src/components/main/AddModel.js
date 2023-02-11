import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { Select } from "@react-three/drei";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
const AddModel = () => {
  const [selImage, setSelImage] = useState("");
  const [selFile, setSelFile] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const AddForm = {
    title: "",
    category: "",
    description: "",
    size: "",
    triangle: "",
    materials: "",
    vertices: "",
    uploadedBy: currentUser.username,
    textures: "",
    image: "",
    file: "",
  };
  const modelCategories = [
    " Cars & Vehicles 3D Models",
    "Characters & Creatures 3D Models",
    "Architecture 3D Models",
    "Electronics & Gadgets 3D Models",
    "Animals & Pets 3D Models",
  ];

  const addSubmit = async (formdata) => {
    formdata.image = selImage;
    formdata.file = selFile;
    console.log(formdata);
    const response = await fetch("http://localhost:5000/3dmodel/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log(response.status);
      console.log("success");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Model added Successfully!! 👍👍",
      });
      response.json().then((data) => {
        navigate("/main/viewer/" + data._id);
      });
    } else {
      console.log(response.status);
      console.log("something went wrong");
      Swal.error({
        icon: "error",
        title: "OOPS",
        text: "!! something went wrong!!",
      });
    }
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/3dmodel/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setSelImage(file.name);
    const fd = new FormData();
    fd.append("myimage", file);
    fetch(url + "/3dmodel/uploadimage", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("image uploaded");
      }
    });
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(200, "Too Long!")
      .required("Title is Required"),
    // category: Yup.string().required("Category is Required"),
    description: Yup.string().required("Description is Required"),
  });
  return (
    <div>
      <div className="container-fluid pt-5 " style={{ background: "#7f9ead" }}>
        <div className="row">
          <div className="">
            <div className="col-md-6 col-sm-6 mx-auto">
              <div className="card browser">
                <div className="card-body">
                  <div className="card-body add">
                    <h1>Upload Your 3D Model</h1>
                    <Formik
                      initialValues={AddForm}
                      onSubmit={addSubmit}
                      validationSchema={validationSchema}
                    >
                      {({
                        values,
                        handleSubmit,
                        handleChange,
                        errors,
                        touched,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <fieldset>
                            {/*                          
                          <TextField
                            label="Category"
                            id="category"
                            value={values.category}
                            onChange={handleChange}
                            className="w-100 mb-4 mt-3"
                          /> */}
                            <TextField
                              label="Title"
                              id="title"
                              value={values.title}
                              onChange={handleChange}
                              className="w-100 mb-4 mt-3"
                              helperText={touched.title ? errors.title : ""}
                              error={Boolean(errors.title && touched.title)}
                            />

                            {/*                  iss code m error aa rhi h sir    
                                                ye code select category wala h        
                                                isse uncomment krne p code add model form ni dikh raha h                                                              */}
                            {/* <FormControl> */}
                             

                            <TextField
                              label="Description"
                              id="description"
                              value={values.description}
                              onChange={handleChange}
                              className="w-100 mb-4"
                              helperText={
                                touched.description ? errors.description : ""
                              }
                              error={Boolean(
                                errors.description && touched.description
                              )}
                            />
                            <TextField
                              label="Size"
                              id="size"
                              value={values.size}
                              onChange={handleChange}
                              className="w-100 mb-4"
                            />
                            <TextField
                              label="Triangle"
                              id="triangle"
                              value={values.triangle}
                              onChange={handleChange}
                              className="w-100 mb-4"
                            />
                            <TextField
                              label="Vertices"
                              id="vertices"
                              value={values.vertices}
                              onChange={handleChange}
                              className="w-100 mb-4"
                            />
                            <TextField
                              label="Materials"
                              id="materials"
                              value={values.materials}
                              onChange={handleChange}
                              className="w-100 mb-4"
                            />
                            <TextField
                              label="Textures"
                              id="textures"
                              value={values.textures}
                              onChange={handleChange}
                              className="w-100 mb-4"
                            />
                            {/* <TextField
                            label="UploadedBy"
                            id="uploadedBy"
                            value={values.uploadedBy}
                            onChange={handleChange}
                            className="w-100 mb-4"
                          /> */}
 <InputLabel id="demo-simple-select-label">
                                Select category
                              </InputLabel>
                       
                              <select
                                labelId="demo-simple-select-label"
                                id="category"
                                name="category"
                                className="form-control mb-2"
                                label="Select category"

                                value={values.category}
                                error={Boolean(
                                  errors.category && touched.category
                                )}
                                // helperText="Category is required"
                                helperText={
                                  touched.category ? errors.category : ""
                                }
                                onChange={handleChange}
                              >
                                {modelCategories.map((category) => (
                                  <option value={category}>{category}</option>
                                ))}
                              </select>
                            {/* </FormControl> */}
                            <label>Uploade Image</label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={uploadImage}
                            />

                            <label>Uploade File</label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={uploadFile}
                            />

                            <button className="btn btn-primary model w-100 mt-5">
                              <h3> Submit Model</h3>
                            </button>
                          </fieldset>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
