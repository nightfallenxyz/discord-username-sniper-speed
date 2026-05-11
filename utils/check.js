import axios from 'axios';
import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(new URL('../config.json', import.meta.url))
);

export async function checkUsername(username, token) {
  try {
    console.log(`🔎 Checking @${username}...`);

    const response = await axios.post(
      config.CHECK_URL,
      { username },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          'User-Agent': config.USER_AGENT,
          Accept: '*/*',
          'X-Super-Properties': config.X_SUPER_PROPERTIES,
          'X-Discord-Locale': 'en-US',
        },
        timeout: 10000,
      }
    );

    if (response.status === 200) {
      if (response.data?.taken === false) {
        console.log(`🟢 @${username} is AVAILABLE`);
        return true;
      } else {
        console.log(`🔴 @${username} is taken`);
        return false;
      }
    }

    console.log(`⚠️ @${username} unexpected response`);
    return false;

  } catch (error) {
    console.log(`❌ @${username} check failed`);
    return false;
  }
}
