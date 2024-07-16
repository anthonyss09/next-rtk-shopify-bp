import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StoreProvider from "../src/app/StoreProvider";
import CartPage from "../src/app/cart/page";

test("Home", () => {
  render(
    <StoreProvider>
      <CartPage />
    </StoreProvider>
  );

  const main = screen.getByRole("main");

  expect(main).toBeDefined();
});
