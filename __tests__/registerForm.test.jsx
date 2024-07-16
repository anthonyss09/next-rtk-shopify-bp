import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StoreProvider from "../src/app/StoreProvider";
import RegisterForm from "../src/app/customers/register/RegisterForm";

test("Home", () => {
  render(
    <StoreProvider>
      <RegisterForm />
    </StoreProvider>
  );

  const heading = screen.getByRole("heading", { level: 3 });
  const button = screen.getByRole("button");

  expect(heading).toBeDefined();
  expect(button).toBeDefined();
});
