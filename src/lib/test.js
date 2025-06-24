import lodash from "lodash";

export function slugify(str) {
  const n = str.length;
  let i = 0;
  const out = [];
  let sawDash = false;

  while (i < n) {
    const c = str.charCodeAt(i);
    if (((c | 32) >= 97 && (c | 32) <= 122) || (c >= 48 && c <= 57)) break;
    i++;
  }
  for (; i < n; i++) {
    const c = str.charCodeAt(i);
    if ((c | 32) >= 97 && (c | 32) <= 122) {
      // letter
      out.push(c | 32);
      sawDash = false;
    } else if (c >= 48 && c <= 57) {
      // number
      out.push(c);
      sawDash = false;
    } else if (!sawDash) {
      out.push(45); // '-' = 45
      sawDash = true;
    }
  }
  if (out[out.length - 1] === 45) out.pop();
  // convert codes to string
  return String.fromCharCode(...out);
}

export function slugify2(str) {
  const n = str.length;
  let i = 0;
  const out = [];

  // no dashes
  if (str.length < 3) {
    while (i < n) {
      const c = str.charCodeAt(i);
      if ((c | 32) >= 97 && (c | 32) <= 122) break;
      i++;
    }
    for (; i < n; i++) {
      const c = str.charCodeAt(i);
      if ((c | 32) >= 97 && (c | 32) <= 122) {
        out.push(c | 32);
      }
    }
    // convert codes to string
    return String.fromCharCode(...out);
  }

  let sawDash = false;

  while (i < n) {
    const c = str.charCodeAt(i);
    if ((c | 32) >= 97 && (c | 32) <= 122) break;
    i++;
  }
  for (; i < n; i++) {
    const c = str.charCodeAt(i);
    if ((c | 32) >= 97 && (c | 32) <= 122) {
      out.push(c | 32);
      sawDash = false;
    } else if (!sawDash) {
      out.push(45); // '-' = 45
      sawDash = true;
    }
  }
  if (out[out.length - 1] === 45) out.pop();
  // convert codes to string
  return String.fromCharCode(...out);
}

export function regexSlugify(str) {
  return str
    .trim()
    .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "") // strip non-letters at ends
    .replace(/[^a-zA-Z]+/g, "-") // internal non-letters → hyphens
    .toLowerCase();
}

export function onePassSlugify(str) {
  return str
    .toLowerCase()
    .replace(/(^[^a-z]+)|([^a-z]+$)|[^a-z]+/g, (match, leading, trailing) =>
      leading || trailing ? "" : "-",
    );
}

function benchmark(fn, name, test, iters) {
  // warm
  fn(test.value);
  const t0 = performance.now();
  for (let i = 0; i < iters; i++) {
    const res = fn(test.value);
    if (res != test.expect) {
      console.error(
        `Expected "${test.expect}" but got "${res}"!\nMethod: ${name}\n`,
      );
    }
  }
  const t1 = performance.now();
  const opsPerMs = iters / (t1 - t0);
  console.log(
    `Took ${name} ${(t1 - t0).toFixed(3)}ms for "${test.value.substring(0, 7)}"`,
  );
  return opsPerMs;
}

const stats = {};

/**
 * @param {{ value: string, expect: string }[]} inputs
 * @param {{ [s: string]: any; } | ArrayLike<any>} methods
 */
function compareAll(methods, inputs, iterations = 200_000) {
  // Build stats
  Object.keys(methods).forEach((m) => (stats[m] = { ops: [] }));

  inputs.forEach((test, idx) => {
    const label = `Test#${idx + 1} (str=${test.value.substring(0, 7) + (test.value.length > 7 ? "..." : "")} len=${test.value.length})`;
    //console.log(label);
    const res = [];
    for (const [name, fn] of Object.entries(methods)) {
      const opsPerMs = benchmark(fn, name, test, iterations);
      res.push(opsPerMs);
      stats[name].ops.push(opsPerMs);
      // console.log(
      //   `\nMethod: "${name}"\nInput: "${str.substring(0, 7) + (str.length > 7 ? "..." : "")}"\nInput length: ${str.length}\nIterations: ${iterations}\n\t${opsPerMs} ops/ms\n`,
      // );
    }
    // console.log(
    //   Object.keys(methods)
    //     .map((k) => k.padEnd(20))
    //     .join(" || "),
    // );
    // console.log(
    //   res.map((n) => `${n.toFixed(3)} ops/ms`.padEnd(20)).join(" || ") + "\n\n",
    // );
  });
}

function showStats() {
  for (const [name, stat] of Object.entries(stats)) {
    const min = Math.min(...stat.ops);
    const max = Math.max(...stat.ops);
    const avg = stat.ops.reduce((a, b) => a + b, 0) / stat.ops.length;
    const fillerLines = Array(30).fill("=").join("");
    console.log(
      `${fillerLines}\nMethod: ${name}\nMin: ${min.toFixed(3)} ops/ms\nMax: ${max.toFixed(3)} ops/ms\nAverage: ${avg.toFixed(3)} ops/ms\n${fillerLines}\n`,
    );
  }
}

const testStrings = [
  "", // empty
  "abc", // only letters
  "ABC", // uppercase
  "abc123def", // letters + digits
  "123abc", // digits + letters
  "abc123", // letters + digits at end
  "!!!---abc---!!!", // non-letters at both ends
  "Hello World", // space in middle
  "   leading and trailing   ", // spaces at ends
  "mixed--special__chars!!here", // various separators
  "ALLCAPS", // all caps, no separators
  "lowercase", // all lowercase
  "CamelCaseTest", // camelCase
  "multiple   spaces", // multiple spaces
  "--", // only separators
  "a", // single letter
  "Z", // single uppercase
  "AaBbCc", // alternating case
  // long string: 1000 a's, then separators, then 1000 b's
  Array(1000).fill("a").join("") + "!!##**" + Array(1000).fill("b").join(""),
];

const testStrings2 = [
  { value: "", expect: "" },
  { value: "abc", expect: "abc" },
  { value: "ABC", expect: "abc" },
  { value: "abc123def", expect: "abc123def" },
  { value: "123abc", expect: "123abc" },
  { value: "abc123", expect: "abc123" },
  { value: "!!!---abc---!!!", expect: "abc" },
  { value: "Hello World", expect: "hello-world" },
  { value: "   leading and trailing   ", expect: "leading-and-trailing" },
  { value: "mixed--special__chars!!here", expect: "mixed-special-chars-here" },
  { value: "ALLCAPS", expect: "allcaps" },
  { value: "lowercase", expect: "lowercase" },
  { value: "CamelCaseTest", expect: "camelcasetest" },
  { value: "multiple   spaces", expect: "multiple-spaces" },
  { value: "--", expect: "-" },
  { value: "a", expect: "a" },
  { value: "Z", expect: "z" },
  { value: "AaBbCc", expect: "aabbcc" },
  {
    value:
      Array(1000).fill("a").join("") +
      "!!##**" +
      Array(1000).fill("b").join(""),
    expect: Array(1000).fill("a").join("") + Array(1000).fill("b").join(""),
  },
];

// ——— Example usage ———
//compareAll("   ___Hello!@ World***   ", 1_000_000);
const iterations = 1;

function lodashSlugger(str) {
  return lodash.kebabCase(str);
}
const methods = {
  regexSlugify,
  slugify,
  slugify2,
  onePassSlugify,
  lodashSlugger,
};
compareAll(methods, testStrings2, iterations);
//showStats();
