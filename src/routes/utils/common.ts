// Remove invalid chars -- see https://issues.redhat.com/browse/HCS-199
//
// Our final recommendation is that the client disables the following symbols, which are disallowed by the StrictHttpFirewall
//
// Semicolon: ; , url-encoded: %3B
// Double slash: //, url-encoded double slash: %2F%2F
// Percent: %, url-encoded percent: %25
// Back slash: \, url-encoded back slash: %5C
// Null sign: \0, url-encoded null sign: %00
export const cleanInput = (value: string) => {
  // Todo: Use HelperText component (from PatternFly v5) to display helper text for highlighting invalid chars
  const val = value.replace(/;|%|\/|\\/g, '');
  return val;
};
