const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".json");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
