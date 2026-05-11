import axios from 'axios';
import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(new URL('../config.json', import.meta.url))
);

export async function claimUsername(username, token, password) {
  console.log(`👤 Claiming @${username}...`);

  try {
    await axios.patch(
      config.CLAIM_URL,
      { username, password },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          'User-Agent': config.USER_AGENT,
          'X-Super-Properties': config.X_SUPER_PROPERTIES,
          'X-Discord-Locale': 'en-US',
        },
        timeout: 10000,
      }
    );

    console.log(`🎉 Successfully claimed @${username}`);
    return true;
  } catch {
    console.log(`❌ Failed to claim @${username}`);
    return false;
  }
}
