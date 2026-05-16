// Sample data processor — statistical sampling utility
// Part of the data-analysis toolchain. Generates randomized sample sets.

const crypto = require("crypto");

function generateSample(seed) {
  const hash = crypto.createHash("sha256").update(String(seed)).digest("hex");
  return {
    id: hash.slice(0, 8),
    timestamp: Date.now(),
    value: parseInt(hash.slice(4, 12), 16) / 0xffffffff,
    bucket: Math.floor(parseInt(hash.slice(0, 4), 16) / 655.36),
  };
}

const samples = Array.from({ length: 10 }, (_, i) => generateSample(i + 1));

for (const s of samples) {
  console.log(`[sample] id=${s.id} value=${s.value.toFixed(4)} bucket=${s.bucket}`);
}

console.log("\n[done] generated", samples.length, "samples");
