export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};

export const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const isFirstLowerCase = (str) => {
  return str[0] === str[0].toLowerCase();
};

const prismaToRescriptMap = {
  Boolean: "bool",
  Int: "int",
  Float: "float",
  String: "string",
  //
  Bytes: "Node.Buffer.t",
  Decimal: "float",
  BigInt: "Js.Bigint.t",
  Json: "Js.Json.t",
  DateTime: "Js.Date.t",
};

export function prismaToRescript(prismaType) {
  return prismaToRescriptMap[prismaType];
}

export const rescriptArray = (isTrue, str) => (isTrue ? `array<${str}>` : str);
export const rescriptNull = (isTrue, str) =>
  isTrue ? `Js.Option.t<${str}>` : str;
