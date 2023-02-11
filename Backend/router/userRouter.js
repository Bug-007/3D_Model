const Model = require("../models/userModel");

const router = require("express").Router();

router.post("/add", (req, res) => {
  // reading client data from req body
  console.log(req.body);
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
      setTimeout(() => {
        res.json(result);
      }, 3000);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
  // res.send(' user router');
});
// agar ham koi mail bheje to wo exist kr rha h ki ni, ni kr rha hoga to empty  array behejega
router.get("/checkmail/:email", (req, res) => {
  // to fetch client data from  get request
  console.log(req.params.email);
  // if we find only one then we use findOne() it find first element otherwise find all element then we use find()
  Model.findOne({ email: req.params.email })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/getbyid/:userid", (req, res) => {
  Model.findById(req.params.userid)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// findByOne is also use when id is not want to delete
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
