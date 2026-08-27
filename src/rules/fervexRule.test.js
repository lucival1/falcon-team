import { FervexRule } from "./fervexRule";

const updated = (expiresIn, benefit) => {
  const drug = { expiresIn, benefit };
  new FervexRule().update(drug);
  return drug;
};

describe("FervexRule", () => {
  it.each([
    {
      label: "increases by 1 with more than 10 days left",
      expiresIn: 11,
      benefit: 20,
      expected: { expiresIn: 10, benefit: 21 },
    },
    {
      label: "increases by 2 with 10 days or less",
      expiresIn: 10,
      benefit: 20,
      expected: { expiresIn: 9, benefit: 22 },
    },
    {
      label: "still increases by 2 with 6 days left",
      expiresIn: 6,
      benefit: 20,
      expected: { expiresIn: 5, benefit: 22 },
    },
    {
      label: "increases by 3 with 5 days or less",
      expiresIn: 5,
      benefit: 20,
      expected: { expiresIn: 4, benefit: 23 },
    },
    {
      label: "still increases by 3 on the last day before expiration",
      expiresIn: 1,
      benefit: 20,
      expected: { expiresIn: 0, benefit: 23 },
    },
    {
      label: "never increases above 50",
      expiresIn: 5,
      benefit: 49,
      expected: { expiresIn: 4, benefit: 50 },
    },
    {
      label: "drops to 0 once the expiration date has passed",
      expiresIn: 0,
      benefit: 20,
      expected: { expiresIn: -1, benefit: 0 },
    },
  ])("$label", ({ expiresIn, benefit, expected }) => {
    expect(updated(expiresIn, benefit)).toEqual(expected);
  });
});
