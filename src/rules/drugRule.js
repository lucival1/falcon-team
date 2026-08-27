import { MAX_BENEFIT, MIN_BENEFIT } from "../constants";

import { clamp } from "../clamp";

export class DrugRule {
  update(drug) {
    // expiresIn is read before being moved a day closer, so a drug is only
    // expired the day after its expiration date.
    const expired = drug.expiresIn < 1;

    drug.benefit = this.updateBenefit(drug, expired);
    drug.expiresIn -= 1;
  }

  updateBenefit(drug, expired) {
    return clamp(
      drug.benefit + this.benefitDelta(drug, expired),
      MIN_BENEFIT,
      MAX_BENEFIT,
    );
  }

  benefitDelta(drug, expired) {
    return expired ? -2 : -1;
  }
}
