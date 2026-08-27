export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const MIN_BENEFIT = 0;
const MAX_BENEFIT = 50;

const fervexBenefitDelta = (expiresIn) => {
  if (expiresIn <= 5) return 3;
  if (expiresIn <= 10) return 2;
  return 1;
};

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      if (drug.name === "Magic Pill") {
        continue;
      }

      // expiresIn is read before being moved a day closer, so a drug is only
      // expired the day after its expiration date.
      const expired = drug.expiresIn < 1;

      if (drug.name === "Herbal Tea") {
        drug.benefit = Math.min(MAX_BENEFIT, drug.benefit + (expired ? 2 : 1));
      } else if (drug.name === "Fervex") {
        drug.benefit = expired
          ? MIN_BENEFIT
          : Math.min(
              MAX_BENEFIT,
              drug.benefit + fervexBenefitDelta(drug.expiresIn),
            );
      } else {
        drug.benefit = Math.max(MIN_BENEFIT, drug.benefit - (expired ? 2 : 1));
      }

      drug.expiresIn -= 1;
    }

    return this.drugs;
  }
}
