export const validateRegisterInput = (email, password, confirmPassword) => {
  const errors = {}
  
  if (email.trim() === '') {
      errors.email = "Email must not be empty."
  } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      if (!email.match(regEx)) {
          errors.email = "Email must be valid email address"
      }
  }

  if (password.trim() === '') {
      errors.password = "Password must not be empty."
  } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password must match."
  }

  return {
      errors, 
      valid: Object.keys(errors).length < 1
  }
}

export const validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
      errors.email = "Email must not be empty.";
  }
  if (password.trim() === '') {
      errors.password = "Password must not be empty.";
  }

  return {
      errors,
      valid: Object.keys(errors).length < 1
  }
}

export const validateAuthInput = (email, token) => {
  const errors = {};
  if (email.trim() === '') {
      errors.email = "Email must not be empty.";
  }
  if (token.trim() === '') {
      errors.password = "Password must not be empty.";
  }

  return {
      errors,
      valid: Object.keys(errors).length < 1
  }
}