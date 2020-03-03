export default (block, element, modifier) => `${block}${element ? `__${element}` : ''}${modifier ? ` ${modifier}` : ''}`;

export const element = className => (name, mod) => cn(className, name, mod);