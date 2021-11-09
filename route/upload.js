const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const imageFile = require("../models/image.model");
const videoFile = require("../models/video.model");
const audioFile = require("../models/audio.model");
// const { to, ReE, ReS } = require("../services/utilService");
// const HttpStatus = require("http-status");
// const maxSize = 1 * 1024 * 1024;

// Image Upload
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/images/");
    console.log(__basedir);
  }, // Destination to store image
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image a valid image"));
    }
    cb(undefined, true);
  },
});

// For Single image upload
router.post(
  "/uploadImage",
  imageUpload.single("image"),
  (req, res) => {
    // console.log(req);
    // res.send(req.file)
    imageFile
      .create({
        image: "/images/" + req.file.filename,
      })
      .then(() => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: "please upload image lasser than 1 Mb" });
  }
);

// For Multiple image uplaod
router.post(
  "/uploadBulkImage",
  imageUpload.array("images", 4),
  (req, res) => {
    // console.log(req)
    const img = req.files.map(file => "/images/" + file.filename);
    console.log(img)
    imageFile
      .create({
        image:  img,
      })
      .then(() => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// ---------------------------------------------------------------------------- //

// Video Upload
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/videos/");
    console.log(__basedir);
  }, // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4)$/)) {
      // upload only mp4 and mkv format
      return cb(new Error("Please upload a Video in mp4 format"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/uploadVideo",
  videoUpload.single("video"),
  (req, res) => {
    // console.log(req);
    // res.send(req.file)
    videoFile
      .create({
        video: "/videos/" + req.file.filename,
      })
      .then(() => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: "please upload video lasser than 10 Mb" });
  }
);

// ---------------------------------------------------------------------------- //

// Video Upload
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/audios/");
    console.log(__basedir);
  }, // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const audioUpload = multer({
  storage: audioStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp3)$/)) {
      // upload only mp4 and mkv format
      return cb(new Error("Please upload a audio in mp3 format"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/uploadAudio",
  audioUpload.single("audio"),
  (req, res) => {
    // console.log(req);
    // res.send(req.file)
    audioFile
      .create({
        audio: "/audios/" + req.file.filename,
      })
      .then(() => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  },
  (req, res) => {
    res.status(400).send({ error: "please upload video lasser than 10 Mb" });
  }
);

module.exports = router;
