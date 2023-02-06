import type { OptionPathsType, OptionType } from 'api/options/option';

export const optionStateKey = 'option';

export function getFetchId(optionPathsType: OptionPathsType, optionType: OptionType, optionQueryString: string) {
  return `${optionPathsType}--${optionType}--${optionQueryString}`;
}
