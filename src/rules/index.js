import { DRUG_NAMES } from "../constants";
import { DrugRule } from "./drugRule";
import { FervexRule } from "./fervexRule";
import { HerbalTeaRule } from "./herbalTeaRule";
import { MagicPillRule } from "./magicPillRule";

const defaultRule = new DrugRule();

const rules = {
  [DRUG_NAMES.HERBAL_TEA]: new HerbalTeaRule(),
  [DRUG_NAMES.FERVEX]: new FervexRule(),
  [DRUG_NAMES.MAGIC_PILL]: new MagicPillRule(),
};

export const ruleFor = (drug) => rules[drug.name] ?? defaultRule;
