import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StoreProvider from "../src/app/StoreProvider";
import ProductsPage from "../src/app/products/page";

test("Home", () => {
  render(
    <StoreProvider>
      <ProductsPage />
    </StoreProvider>
  );

  const main = screen.getByRole("main");

  expect(main).toBeDefined();
});
