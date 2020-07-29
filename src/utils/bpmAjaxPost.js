const axios = require("axios");

const sendAjaxWithParams = async function sendAjaxWithParams(url, params) {
  const data = new URLSearchParams();
  data.append("params", JSON.stringify(params));
  console.log(params);
  try {
    const res = await axios.post(url, data);
    console.log("res", res);
    return res.data.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { sendAjaxWithParams };
