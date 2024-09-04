const validation = (values) => {
  let errors = {};

  // Validate email
  if (!values.email) {
    errors.email = "Email is required"; // Error if email is empty
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid"; // Error if email format is incorrect
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password is required"; // Error if password is empty
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more"; // Error if password is too short
  }

  return errors;
};

export default validation;
