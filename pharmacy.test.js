import { Drug, Pharmacy } from "./pharmacy";

import expectedOutput from "./output.json";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("holds no drug by default", () => {
    expect(new Pharmacy().updateBenefitValue()).toEqual([]);
  });

  it("applies the rule of each drug it holds", () => {
    const drugs = [
      new Drug("Doliprane", 5, 10),
      new Drug("Herbal Tea", 5, 10),
      new Drug("Fervex", 5, 10),
      new Drug("Magic Pill", 5, 10),
      new Drug("Dafalgan", 5, 10),
    ];

    expect(new Pharmacy(drugs).updateBenefitValue()).toEqual([
      new Drug("Doliprane", 4, 9),
      new Drug("Herbal Tea", 4, 11),
      new Drug("Fervex", 4, 13),
      new Drug("Magic Pill", 5, 10),
      new Drug("Dafalgan", 4, 8),
    ]);
  });

  it.each(["Unknown Drug", "constructor"])(
    "falls back to the regular drug behaviour for %p",
    (name) => {
      expect(
        new Pharmacy([new Drug(name, 10, 20)]).updateBenefitValue(),
      ).toEqual([new Drug(name, 9, 19)]);
    },
  );

  it("matches the committed output.json over 30 days", () => {
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
