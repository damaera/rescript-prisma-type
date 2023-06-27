import { pascalCase, camelCase } from "change-case";

import { isFirstLowerCase, rescriptArray, prismaToRescript } from "./utils.mjs";

export const generateModels = (models) => {
  const modelsStr = models
    .map(({ name, fields, map }) => {
      const filteredFields = fields.filter(
        (f) =>
          (f.kind == "scalar" || f.kind == "enum") &&
          !f.type.startsWith("Unsupported")
      );

      const typeStr = filteredFields
        .map((f) => {
          const fieldName =
            (isFirstLowerCase(f.name) && !f.map
              ? f.name
              : `@as("${f.map ?? f.name}")  ${camelCase(f.name)}`) +
            (f.required ? "" : "?");

          const fieldType = rescriptArray(
            //
            f.list,
            prismaToRescript(f.type) ?? `Enum.${pascalCase(f.type)}.t`
          );

          return `      ${fieldName}: ${fieldType},`;
        })
        .join("\n");

      const fieldStr = filteredFields
        .map((f) => {
          return `      let ${camelCase(f.name)} = "${f.map ?? f.name}"`;
        })
        .join("\n");

      return `  /** Model ${name} */
  module ${pascalCase(name)} = {
    let name = "${map ?? name}"

    type t = {
      //
${typeStr}
    }
    
    module Field = {
${fieldStr}
    }
  }`;
    })
    .join("\n");

  return `
module Model = {
${modelsStr}
}
  `;
};
