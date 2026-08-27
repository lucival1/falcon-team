import { DrugRule } from "./drugRule";

export class HerbalTeaRule extends DrugRule {
  benefitDelta(drug, expired) {
    return expired ? 2 : 1;
  }
}
