const fs = require("fs");

const rmObjectOfArray = (arr, index) => {
  return arr.filter((data) => data.quotes !== index).save();
};
