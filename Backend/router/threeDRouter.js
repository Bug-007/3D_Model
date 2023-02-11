const Model = require("../models/threeDModel");
const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const unzipper = require("unzipper");

const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads/zipfiles");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const extractFile = (filepath) => {
  fs.createReadStream("./static/uploads/zipfiles/" + filepath).pipe(
    unzipper.Extract({ path: "./static/uploads/extracted/" + filepath })
  );
};

const uploadImage = multer({ storage: imagestorage });
const uploadFile = multer({ storage: filestorage });

router.post("/uploadimage", uploadImage.single("myimage"), (req, res) => {
  console.log(req.body);
  res.json({ message: "File upload success" });
});

router.post("/uploadfile", uploadFile.single("myfile"), (req, res) => {
  console.log(req.body);
  res.json({ message: "File upload success" });
});

router.post("/add", (req, res) => {
  data = req.body;

  let model = new Model(data);

  model
    .save()
    .then((data) => {
      extractFile(data.file);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/add", (req, res) => {
  // reading client data from req body
  console.log(req.body);
  res.send("reponse from user router");
  // create operation    data ko database m add krne k liye   (ascynchronous)
  new Model(req.body)
    .save()
    .then((result) => {
      console.log(result);
      console.log("data saved");
      // server se client json k form m bhejega  nd client server ko v json k form m data bhejega
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
router.get("/getall", (req, res) => {
  // data dhund k laana database se       it give data in the form of array
  Model.find({})
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
  // res.send(' user router');
});

router.delete("/delete/:userid", (req, res) => {
  Model.findByIdAndDelete(req.params.userid)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

router.get("/getbyid/:userid", (req, res) => {
  Model.findById(req.params.userid)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
router.put("/update/:userid", (req, res) => {
  Model.findByIdAndUpdate(req.params.userid, req.body, { new: true })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// authenticate
router.post("/authenticate", (req, res) => {
  console.log(req.body);
  Model.findOne({ email: req.body.email, password: req.body.password })
    .then((userdata) => {
      if (userdata) {
        res.status(200).json(userdata);
      } else {
        res.status(300).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
module.exports = router;
