import axios from 'axios';
import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(new URL('../config.json', import.meta.url))
);

export async function claimUsername(username, token, password) {
  console.log(`👤 Claiming @${username}...`);

  try {
    const payload = {
      username,
      password
    };

    await axios.patch(
      config.CLAIM_URL,
      payload,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'User-Agent': config.USER_AGENT,
          'X-Super-Properties': config.X_SUPER_PROPERTIES,
          'X-Discord-Locale': 'en-US',
          'X-Discord-Timezone': 'Asia/Calcutta',
          'Referer': 'https://discord.com/channels/@me',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Priority': 'u=1, i',
          'Sec-Ch-Ua': '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'X-Debug-Options': 'bugReporterEnabled'
        },
        timeout: 15000
      }
    );

    console.log(`🎉 Successfully claimed @${username}!`);
    return true;

  } catch (error) {
    console.log(`❌ Failed to claim @${username}`);
    return false;
  }
}