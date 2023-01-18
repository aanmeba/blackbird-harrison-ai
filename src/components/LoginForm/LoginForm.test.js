import { render, screen } from "@testing-library/react";
import LoginForm from ".";
import validator from "email-validator";

test("renders sign in page", () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here

it("validates email address", () => {
  const validate = jest.fn();
  const email1 = "test";
  const email2 = "test@test.com";
  expect(validator.validate(email1)).toBe(false);
  expect(validator.validate(email2)).toBe(true);
});

it("returns error message", () => {
  const pwRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]).{8,}$/;
  const letterCase = /^(?=.*[a-z])(?=.*[A-Z])/;
  const digit = /^(?=.*\d)/;
  const special = /^(?=.*[!@#$%^&*()_+\-=\]{};':"\\|,.<>?])/;

  const validatePassword = jest.fn((password) => {
    if (!pwRegex.test(password)) {
      if (password.length < 8) {
        return "Password should be 8 or more characters";
      } else if (!letterCase.test(password)) {
        return "Password should contain minimum 1 character for both uppercase and lowercase letter";
      } else if (!digit.test(password)) {
        return "Password should contain minimum 1 digit of numeric value";
      } else if (!special.test(password)) {
        return "Password should contain minimum 1 special character";
      }
    }
    return null;
  });

  expect(validatePassword("test")).toBe(
    "Password should be 8 or more characters"
  );
  expect(validatePassword("testtest")).toBe(
    "Password should contain minimum 1 character for both uppercase and lowercase letter"
  );
  expect(validatePassword("tesTtest")).toBe(
    "Password should contain minimum 1 digit of numeric value"
  );

  expect(validatePassword("tesT1234")).toBe(
    "Password should contain minimum 1 special character"
  );

  expect(validatePassword("tesT123$")).toBeNull();
});
