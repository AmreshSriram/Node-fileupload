const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    video : [
        {
            type: String,
        }
    ]
  },
  { timestamps: true }
);

const videoFile = mongoose.model("videoFile", videoSchema);

module.exports = videoFile;
