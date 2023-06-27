#!/usr/bin/env node

import fs from "fs";
import { ConvertSchemaToObject } from "@paljs/schema";
import { generateEnums } from "./generators/enums.mjs";
import { generateModels } from "./generators/models.mjs";
import arg from "arg";

const args = arg({
  // Types
  "--schema": String,
  "--output": String,

  // Aliases
  "-s": "--schema",
  "-o": "--output", // -n <string>; result is stored in --name
});

const schemaLocation = args["--schema"] ?? "./prisma/schema.prisma";

const schemaObject = new ConvertSchemaToObject(schemaLocation).run();

const { enums, models } = schemaObject;

const outputLocation = args["--output"] ?? "./src/Prisma.res";

fs.writeFileSync(
  outputLocation,
  [generateEnums(enums), generateModels(models)].join("\n"),
  "utf8"
);

console.log(`generated: ${outputLocation}`);
