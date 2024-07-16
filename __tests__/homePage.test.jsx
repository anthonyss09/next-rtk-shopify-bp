import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../src/app/page";
import StoreProvider from "../src/app/StoreProvider";

test("Home", () => {
  render(
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  );

  const main = screen.getByRole("main");

  expect(main).toBeDefined();
});
