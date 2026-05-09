import axios from 'axios';
import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(new URL('../config.json', import.meta.url))
);

export async function checkUsername(username, token) {
  try {
    const response = await axios.post(
      config.CHECK_URL,
      { username },
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'User-Agent': config.USER_AGENT,
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'X-Super-Properties': config.X_SUPER_PROPERTIES,
          'X-Discord-Locale': 'en-US',
          'Referer': 'https://discord.com/channels/@me',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Priority': 'u=1, i',
          'Sec-Ch-Ua': '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'X-Debug-Options': 'bugReporterEnabled',
        },
        timeout: 15000,
      }
    );

    if (response.status === 200 && response.data.taken === false) {
      console.log(`✅ @${username} is available!`);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}