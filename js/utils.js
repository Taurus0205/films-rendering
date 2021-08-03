const makeElement = (selector) => document.querySelector(selector);
const createDOM = (element) => document.createElement(element);

const normalizeDate = (time) => {
  var day = String(new Date(time).getDate()).padStart(2, "0");
  var month = String(new Date(time).getMonth() + 1).padStart(2, "0");
  var year = new Date(time).getFullYear();

  return day + "." + month + "." + year;
};
