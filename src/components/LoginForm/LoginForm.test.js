import { render, screen } from "@testing-library/react";
import LoginForm from ".";
import { validateEmail, validatePassword } from "./validation";

test("renders sign in page", () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here

// import validator from "email-validator";
// test("validates email address", () => {
//   const validate = jest.fn();
//   expect(validator.validate("test")).toBe(false);
//   expect(validator.validate("test@test.com")).toBe(true);
// });

test("Email should contain @ symbol", () => {
  expect(validateEmail("test")).toBe(false);
});

test("Email should contain correct domain", () => {
  expect(validateEmail("test@test.c")).toBe(false);
});

test("Valid email should return true", () => {
  expect(validateEmail("test@test.com")).toBe(true);
});

test("Password should be 8 or more characters", () => {
  expect(validatePassword("test")).toBe(
    "Password should be 8 or more characters"
  );
});

test("Password should contain minimum 1 character for both uppercase and lowercase letter", () => {
  expect(validatePassword("testtest")).toBe(
    "Password should contain minimum 1 character for both uppercase and lowercase letter"
  );
  expect(validatePassword("TESTTEST")).toBe(
    "Password should contain minimum 1 character for both uppercase and lowercase letter"
  );
});

test("Password should contain minimum 1 digit of numeric value", () => {
  expect(validatePassword("tesTtest")).toBe(
    "Password should contain minimum 1 digit of numeric value"
  );
});
test("Password should contain minimum 1 special character", () => {
  expect(validatePassword("tesT1234")).toBe(
    "Password should contain minimum 1 special character"
  );
});
test("Valid password should pass the validation and return an empty string", () => {
  expect(validatePassword("tesT123$")).toBe("");
});
