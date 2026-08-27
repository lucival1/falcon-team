import { Drug, Pharmacy } from "./pharmacy";

import expectedOutput from "./output.json";

const updateOnce = (name, expiresIn, benefit) => {
  const drug = new Drug(name, expiresIn, benefit);
  new Pharmacy([drug]).updateBenefitValue();
  return drug;
};

const behavesAs =
  (name) =>
  ({ expiresIn, benefit, expected }) => {
    expect(updateOnce(name, expiresIn, benefit)).toEqual(
      new Drug(name, expected.expiresIn, expected.benefit),
    );
  };

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("updates every drug it holds", () => {
    const drugs = [new Drug("Doliprane", 5, 10), new Drug("Herbal Tea", 5, 10)];

    expect(new Pharmacy(drugs).updateBenefitValue()).toEqual([
      new Drug("Doliprane", 4, 9),
      new Drug("Herbal Tea", 4, 11),
    ]);
  });

  it("holds no drug by default", () => {
    expect(new Pharmacy().updateBenefitValue()).toEqual([]);
  });
});

describe("a regular drug", () => {
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
  ])("$label", behavesAs("Doliprane"));

  it("is the behaviour applied to any unknown drug", () => {
    expect(updateOnce("Unknown Drug", 10, 20)).toEqual(
      new Drug("Unknown Drug", 9, 19),
    );
  });
});

describe("Herbal Tea", () => {
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
  ])("$label", behavesAs("Herbal Tea"));

  it("normalises a benefit above 50 down to the maximum", () => {
    expect(updateOnce("Herbal Tea", 10, 60)).toEqual(
      new Drug("Herbal Tea", 9, 50),
    );
  });
});

describe("Fervex", () => {
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
  ])("$label", behavesAs("Fervex"));
});

describe("Magic Pill", () => {
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
  ])("$label", behavesAs("Magic Pill"));
});

describe("the 30 day simulation", () => {
  it("matches the committed output.json", () => {
    const pharmacy = new Pharmacy([
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40),
    ]);

    const result = [];
    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
      result.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
    }

    expect({ result }).toEqual(expectedOutput);
  });
});
