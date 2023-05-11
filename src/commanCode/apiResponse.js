
const success = (statusCode, body = {}) => {
    return {
      statusCode,
      status: "success",
      ...body
    };
  };
  

const error = (statusCode, body = {}) => {
    return {
        statusCode,
        status: "error",
      ...body
    }
}

module.exports={
    success,
    error
}