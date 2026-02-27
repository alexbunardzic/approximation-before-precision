const fs = require("fs");
const path = require("path");

const DOMAIN_PATH = path.join(__dirname, "../../src/domain");

const forbidden = [
  "axios",
  "node-fetch",
  "fetch(",
  "http.",
  "https.",
  "XMLHttpRequest"
];

function scan(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scan(fullPath);
    } else if (file.endsWith(".js")) {
      const content = fs.readFileSync(fullPath, "utf8");

      forbidden.forEach(token => {
        if (content.includes(token)) {
          throw new Error(
            `Forbidden network dependency "${token}" in ${file}`
          );
        }
      });
    }
  }
}

test("domain layer must not depend on network libraries", () => {
  expect(() => scan(DOMAIN_PATH)).not.toThrow();
});

