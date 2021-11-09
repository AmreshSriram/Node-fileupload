const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    image : 
        {
            type: Array,
        }
  },
  { timestamps: true }
);

const imageFile = mongoose.model("imageFile", imageSchema);

module.exports = imageFile;
