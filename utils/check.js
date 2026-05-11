import axios from 'axios';
import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(new URL('../config.json', import.meta.url))
);

export async function checkUsername(username, token) {
  try {
    const res = await axios.post(
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

    if (res.status === 200 && res.data?.taken === false) {
      console.log(`✅ @${username} available`);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
