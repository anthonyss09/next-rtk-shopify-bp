import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StoreProvider from "../src/app/StoreProvider";
import Navbar from "../src/app/components/Navbar";

test("Navbar", () => {
  render(
    <StoreProvider>
      <Navbar />
    </StoreProvider>
  );

  const heading = screen.getByRole("heading", { level: 3 });

  expect(heading).toBeDefined();
});
