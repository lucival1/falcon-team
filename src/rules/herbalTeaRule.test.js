import { HerbalTeaRule } from "./herbalTeaRule";

const updated = (expiresIn, benefit) => {
  const drug = { expiresIn, benefit };
  new HerbalTeaRule().update(drug);
  return drug;
};

describe("HerbalTeaRule", () => {
  it.each([
    {
      label: "increases in benefit as it gets older",
      expiresIn: 10,
      benefit: 20,
      expected: { expiresIn: 9, benefit: 21 },
    },
    {
      label: "increases twice as fast once the expiration date has passed",
      expiresIn: 0,
      benefit: 20,
      expected: { expiresIn: -1, benefit: 22 },
    },
    {
      label: "never increases above 50",
      expiresIn: 0,
      benefit: 49,
      expected: { expiresIn: -1, benefit: 50 },
    },
  ])("$label", ({ expiresIn, benefit, expected }) => {
    expect(updated(expiresIn, benefit)).toEqual(expected);
  });
});
