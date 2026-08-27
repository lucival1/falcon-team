import { DRUG_NAMES } from "../shared/constants";
import { DafalganRule } from "./dafalganRule";
import { DrugRule } from "./drugRule";
import { FervexRule } from "./fervexRule";
import { HerbalTeaRule } from "./herbalTeaRule";
import { MagicPillRule } from "./magicPillRule";

const defaultRule = new DrugRule();

const rules = new Map([
  [DRUG_NAMES.HERBAL_TEA, new HerbalTeaRule()],
  [DRUG_NAMES.FERVEX, new FervexRule()],
  [DRUG_NAMES.MAGIC_PILL, new MagicPillRule()],
  [DRUG_NAMES.DAFALGAN, new DafalganRule()],
]);

export const ruleFor = (drug) => rules.get(drug.name) ?? defaultRule;
