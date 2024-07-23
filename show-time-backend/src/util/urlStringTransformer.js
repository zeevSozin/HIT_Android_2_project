const charDict = {
  " ": "%20",
  "!": "%21",
  '"': "%22",
  "#": "%23",
  $: "%24",
  "%": "%25",
  "&": "%26",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "*": "%2A",
  "+": "%2B",
  ",": "%2C",
  "-": "%2D",
  ".": "%2E",
  "/": "%2F",
  ":": "%3A",
  ";": "%3B",
  "<": "%3C",
  "=": "%3D",
  ">": "%3E",
  "?": "%3F",
  "@": "%40",
  "[": "%5B",
  "\\": "%5C",
  "]": "%5D",
  "^": "%5E",
  _: "%5F",
  "`": "%60",
  "{": "%7B",
  "|": "%7C",
  "}": "%7D",
  "~": "%7E",
};

function encode(str) {
  console.log("About to endcode the string:", str);
  const strArr = [...str];
  console.log(strArr);
  const outputArr = strArr.map((char) =>
    charDict[char] ? charDict[char] : char
  );
  const output = outputArr.reduce((acc, cur) => acc + cur, "");
  console.log("Returned output:", output);
  return output;
}

module.exports = encode;
