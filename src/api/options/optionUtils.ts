import { runOption as runDetailsOption } from './detailsOption';
import type { OptionType } from './option';
import { OptionPathsType } from './option';

export function runOption(optionPathsType: OptionPathsType, optionType: OptionType, query: string) {
  let result;
  switch (optionPathsType) {
    case OptionPathsType.detailsOption:
      result = runDetailsOption(optionType, query);
      break;
  }
  return result;
}
