import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductPreview from "../src/app/components/ProductPreview";
import mockImage from "../src/app/assets/svgs/cartIcon.svg";

test("FormRow", () => {
  render(
    <ProductPreview
      title="test title"
      description="test description"
      price="0"
      imageUrl={mockImage}
    />
  );

  const image = screen.getByRole("image");
  const p1 = screen.getByRole("p-1");
  const p2 = screen.getByRole("p-2");

  expect(image).toBeDefined();
  expect(p1).toBeDefined();
  expect(p2).toBeDefined();
});
