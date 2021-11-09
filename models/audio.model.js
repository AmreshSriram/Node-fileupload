const mongoose = require("mongoose");

const audioSchema = mongoose.Schema(
  {
    audio : [
        {
            type: String,
        }
    ]
  },
  { timestamps: true }
);

const audioFile = mongoose.model("audioFile", audioSchema);

module.exports = audioFile;
