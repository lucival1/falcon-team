import { DrugRule } from "./drugRule";

const updated = (expiresIn, benefit) => {
  const drug = { expiresIn, benefit };
  new DrugRule().update(drug);
  return drug;
};

describe("DrugRule", () => {
  it.each([
    {
      label: "degrades by 1 a day before the expiration date",
      expiresIn: 10,
      benefit: 20,
      expected: { expiresIn: 9, benefit: 19 },
    },
    {
      label: "still degrades by 1 on the expiration date itself",
      expiresIn: 1,
      benefit: 20,
      expected: { expiresIn: 0, benefit: 19 },
    },
    {
      label: "degrades twice as fast once the expiration date has passed",
      expiresIn: 0,
      benefit: 20,
      expected: { expiresIn: -1, benefit: 18 },
    },
    {
      label: "never degrades below 0",
      expiresIn: 0,
      benefit: 1,
      expected: { expiresIn: -1, benefit: 0 },
    },
    {
      label: "normalises a benefit above 50 down to the maximum",
      expiresIn: 10,
      benefit: 60,
      expected: { expiresIn: 9, benefit: 50 },
    },
  ])("$label", ({ expiresIn, benefit, expected }) => {
    expect(updated(expiresIn, benefit)).toEqual(expected);
  });
});
