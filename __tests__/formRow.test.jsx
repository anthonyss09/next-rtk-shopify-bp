import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import FormRow from "../src/app/components/FormRow";

test("FormRow", () => {
  render(<FormRow />);

  const div = screen.getByRole("div");
  const label = screen.getByRole("label");
  const input = screen.getByRole("input");

  expect(div).toBeDefined();
  expect(label).toBeDefined();
  expect(input).toBeDefined();
});
