import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../src/app/components/ErrorMessage";

test("ErrorMessage", () => {
  render(<ErrorMessage />);

  const p = screen.getByRole("div");

  expect(p).toBeDefined();
});
