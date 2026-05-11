import fs from 'fs';
import pLimit from 'p-limit';
import { checkUsername } from './utils/check.js';
import { claimUsername } from './utils/claim.js';

function readLines(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8').trim();
    if (!data) throw new Error(`${filePath} is empty`);

    return data
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  } catch (err) {
    console.error(`❌ Error reading ${filePath}:`, err.message);
    process.exit(1);
  }
}

function parseTokenPassword(line, index) {
  const sep = line.indexOf(':');

  if (sep === -1) {
    console.error(`❌ Invalid tokens.txt format on line ${index + 1}`);
    process.exit(1);
  }

  const token = line.slice(0, sep).trim();
  const password = line.slice(sep + 1).trim();

  if (!token || !password) {
    console.error(`❌ Missing token/password on line ${index + 1}`);
    process.exit(1);
  }

  return { token, password };
}

// 🔥 concurrency control (safe range: 5–15)
const limit = pLimit(10);

let running = false;

async function runCheck(targets) {
  if (running) return; // prevents overlap spam cycles
  running = true;

  try {
    await Promise.all(
      targets.map(t =>
        limit(async () => {
          const available = await checkUsername(t.username, t.token);

          if (available) {
            await claimUsername(t.username, t.token, t.password);
          }
        })
      )
    );
  } finally {
    running = false;
  }
}

async function main() {
  const tokenLines = readLines('tokens.txt');
  const usernames = readLines('usernames.txt');

  if (tokenLines.length !== usernames.length) {
    console.error('❌ Token count must match username count');
    process.exit(1);
  }

  const targets = usernames.map((username, i) => {
    const { token, password } = parseTokenPassword(tokenLines[i], i);
    return { username, token, password };
  });

  console.log(`🌐 Monitoring ${targets.length} username(s)\n`);

  await runCheck(targets);

  console.log(
    `⏳ Monitoring: ${targets.map(t => `@${t.username}`).join(', ')}\n`
  );

  setInterval(() => {
    runCheck(targets).catch(console.error);
  }, 5000);
}

main().catch(console.error);
