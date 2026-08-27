import { DrugRule } from "./drugRule";

export class DafalganRule extends DrugRule {
  benefitDelta(drug, expired) {
    return expired ? -4 : -2;
  }
}
