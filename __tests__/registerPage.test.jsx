import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "../src/app/customers/register/page";
import StoreProvider from "../src/app/StoreProvider";

test("Home", () => {
  render(
    <StoreProvider>
      <RegisterPage />
    </StoreProvider>
  );

  const main = screen.getByRole("main");

  expect(main).toBeDefined();
});
