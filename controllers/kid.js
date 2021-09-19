import Kid from "../models/Kid";
import fs from "fs";

export const addService = async (req, res) => {
  //   console.log(req.fields);
  //   console.log("req.files", req.files);
  try {
    const files = req.files;
    const fields = req.fields;

    let add = new Kid(fields);

    if (!fields.name || fields.name === "" || fields.name == null) {
      return res.status(400).send("Name is required");
    }
    if (!fields.price || fields.price === "" || fields.price == null) {
      return res.status(400).send("Price is required");
    }
    if (!fields.category || fields.category === "" || fields.category == null) {
      return res.status(400).send("Category is required");
    }
    if (!fields.time || fields.time === "" || fields.time == null) {
      return res.status(400).send("Time is required");
    }
    if (!fields.location || fields.location === "" || fields.location == null) {
      return res.status(400).send("Location is required");
    }

    if (files.image) {
      add.image.data = fs.readFileSync(files.image.path);
      add.image.contentType = files.image.type;
    }

    await add.save((err, result) => {
      if (err) {
        console.log("Add saving error: ", err.message);
        res.status(400).json(err.message);
      }
      res.json(result);
    });
  } catch (err) {
    console.log("Server Error ==> ", err);
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Kid.find().exec();
    res.json(services);
  } catch (err) {
    console.log("Server Error ==> ", err);
  }
};

export const getKidById = async (req, res) => {
  try {
    const service = await Kid.findById(req.params.kidId).exec();
    res.json(service);
  } catch (err) {
    console.log("Server Error ==> ", err);
  }
};