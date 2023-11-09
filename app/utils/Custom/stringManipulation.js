const camelToKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const kebabToCamel = (str) =>
  str
    .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
    .replace(/^-/, '');
const camelToTitle = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z])([a-z])/g, '$1 $2$3')
    .replace(/\b\w/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));

export { camelToKebab, kebabToCamel, camelToTitle };
