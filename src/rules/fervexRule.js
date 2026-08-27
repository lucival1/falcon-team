import { DrugRule } from "./drugRule";
import { MIN_BENEFIT } from "../constants";

export class FervexRule extends DrugRule {
  updateBenefit(drug, expired) {
    return expired ? MIN_BENEFIT : super.updateBenefit(drug, expired);
  }

  benefitDelta(drug) {
    if (drug.expiresIn <= 5) return 3;
    if (drug.expiresIn <= 10) return 2;
    return 1;
  }
}
