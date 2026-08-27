import { MagicPillRule } from "./magicPillRule";

const updated = (expiresIn, benefit) => {
  const drug = { expiresIn, benefit };
  new MagicPillRule().update(drug);
  return drug;
};

describe("MagicPillRule", () => {
  it.each([
    {
      label: "never expires nor decreases in benefit",
      expiresIn: 5,
      benefit: 40,
      expected: { expiresIn: 5, benefit: 40 },
    },
    {
      label: "stays untouched even past its expiration date",
      expiresIn: -5,
      benefit: 40,
      expected: { expiresIn: -5, benefit: 40 },
    },
  ])("$label", ({ expiresIn, benefit, expected }) => {
    expect(updated(expiresIn, benefit)).toEqual(expected);
  });
});
