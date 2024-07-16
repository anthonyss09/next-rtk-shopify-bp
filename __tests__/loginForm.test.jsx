import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StoreProvider from "../src/app/StoreProvider";
import LoginForm from "../src/app/customers/login/LoginForm";

test("Home", () => {
  render(
    <StoreProvider>
      <LoginForm />
    </StoreProvider>
  );

  const heading = screen.getByRole("heading", { level: 3 });
  const button = screen.getByRole("button");

  expect(heading).toBeDefined();
  expect(button).toBeDefined();
});
