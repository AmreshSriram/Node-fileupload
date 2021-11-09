const { to } = require("await-to-js");
// const CONFIG = require('../config/config');



module.exports.to = async (promise) => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [err];
  return [null, res];
};

module.exports.ReE = function (res, err, code) {
  // Error Web Response
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json({ success: false, error: err });
};

module.exports.ReS = function (res, data, code) {
  // Success Web Response
  let send_data = { success: true };

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.send(send_data);
};

module.exports.TE = function (err_message, log) {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
};

function isNull(field) {
  return typeof field === "undefined" || field === "" || field === null;
}

module.exports.isNull = isNull;

function isEmpty(obj) {
  return !Object.keys(obj).length > 0;
}


// module.exports.upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "video/mp4"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

// module.exports.getRandomInt = (max) => {
//   return Math.floor(Math.random() * Math.floor(max));
// };

module.exports.isEmpty = isEmpty;

module.exports.isEmail = (email) => {
  const emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailFormat.test(String(email));
};

// module.exports.validationFields = async (fields, body) => {
//   let feildsCheck = await fields.filter((x) => {
//     if (isNull(body[x])) {
//       return true;
//     }
//   });

//   if (!isEmpty(feildsCheck)) return feildsCheck;
// };






//ADD space for URL
exports.addSpace = (str) =>{
  return str.split(' ').join('%20');
}