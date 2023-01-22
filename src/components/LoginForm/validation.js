import EmailValidator from "email-validator";

const hasUpperCase = (str) => {
  return str.toLowerCase() !== str;
};

const hasLowerCase = (str) => {
  return str.toUpperCase() !== str;
};

const hasNumber = (str) => {
  return /^(?=.*\d)/.test(str);
};

const hasSpecialChar = (str) => {
  return /^(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?])/.test(str);
};

export const validatePassword = (password) => {
  if (password.length < 8) return "Password should be 8 or more characters";
  else if (!hasUpperCase(password) || !hasLowerCase(password))
    return "Password should contain minimum 1 character for both uppercase and lowercase letter";
  else if (!hasNumber(password))
    return "Password should contain minimum 1 digit of numeric value";
  else if (!hasSpecialChar(password))
    return "Password should contain minimum 1 special character";
  else return "";

  // const pwRegex =
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).{8,}$/;
  // const letterCase = /^(?=.*[a-z])(?=.*[A-Z])/;
  // const digit = /^(?=.*\d)/;
  // const special = /^(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?])/;

  // if (!pwRegex.test(password)) {
  //   if (password.length < 8) {
  //     return "Password should be 8 or more characters";
  //   } else if (!letterCase.test(password)) {
  //     return "Password should contain minimum 1 character for both uppercase and lowercase letter";
  //   } else if (!digit.test(password)) {
  //     return "Password should contain minimum 1 digit of numeric value";
  //   } else if (!special.test(password)) {
  //     return "Password should contain minimum 1 special character";
  //   }
  // }
  // return null;
};

export const validateEmail = (email) => {
  /** If statement just returns true / false
   * To make it reusable component, it returns the value as is
   * not converting the value using (!)
   * 
   * if (!EmailValidator.validate(email)) {
        return setEmailError(true);
      }
      return setEmailError(false);
   */

  return EmailValidator.validate(email);
};
