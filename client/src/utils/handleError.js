const handleAuthError = (error) => {
  if (error.response) {
    return error.response.data?.message || "An error occurred";
  } else if (error.request) {
    return "Network error, check your connection";
  } else {
    return "Something went wrong";
  }
};

export default handleAuthError;
