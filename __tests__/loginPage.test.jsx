import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "../src/app/customers/login/page";
import StoreProvider from "../src/app/StoreProvider";

test("Home", () => {
  render(
    <StoreProvider>
      <LoginPage />
    </StoreProvider>
  );

  const main = screen.getByRole("main");

  expect(main).toBeDefined();
});
