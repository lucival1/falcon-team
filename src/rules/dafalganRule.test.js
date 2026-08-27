import { DafalganRule } from "./dafalganRule";

const updated = (expiresIn, benefit) => {
  const drug = { expiresIn, benefit };
  new DafalganRule().update(drug);
  return drug;
};

describe("DafalganRule", () => {
  it.each([
    {
      label: "degrades twice as fast as a regular drug",
      expiresIn: 10,
      benefit: 20,
      expected: { expiresIn: 9, benefit: 18 },
    },
    {
      label: "degrades four times as fast once the expiration date has passed",
      expiresIn: 0,
      benefit: 20,
      expected: { expiresIn: -1, benefit: 16 },
    },
    {
      label: "never degrades below 0",
      expiresIn: 0,
      benefit: 3,
      expected: { expiresIn: -1, benefit: 0 },
    },
  ])("$label", ({ expiresIn, benefit, expected }) => {
    expect(updated(expiresIn, benefit)).toEqual(expected);
  });
});
