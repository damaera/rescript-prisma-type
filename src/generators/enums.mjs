import { pascalCase } from "change-case";

export const generateEnums = (enums) => {
  const enumsStr = enums
    .map(({ name, fields }) => {
      return `
  /** Enum ${name} */
  module ${pascalCase(name)} = {
    type t =
      //
${fields.map((f) => `      | @as("${f}") ${pascalCase(f)}`).join("\n")}
  }
`;
    })
    .join("\n");

  return `module Enum = {${enumsStr}}`;
};
