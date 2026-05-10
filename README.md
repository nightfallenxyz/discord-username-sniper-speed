# Discord Username Claimer

Monitor and claim a Discord username the moment it becomes available.

## Features 

- supports multiple usernames
- multi token
- ultra fast
- spoof and bypass discords anti-bot detection with JA3 fingerprints 
- safe to use on main tokens
- uses UDP/QUIC3 for claiming and checking ( bypasses ratelimit and insanely faster than TCP/HTTPS )


## Setup

```bash
git clone https://github.com/yutomiwana/discord-username-sniper.git
cd discord-username-sniper
npm install
```

## Configuration

1. Edit `tokens.txt` and set your token and password:
   ```txt
   TOKEN:PASSWORD 
   TOKEN2:PASSWORD2
   ```

2. Add target username(s) to `usernames.txt` (one per line)

> Token count must match username count — each token is paired with the username on the same line.

## Usage

```bash
node index.js
```

## File Structure

```
index.js        — entry point
config.json     — password and API config
tokens.txt      — Discord tokens (one per line)
usernames.txt   — target usernames (one per line)
check.js        — checks username availability using discord internal UDP underlayed api 
claim.js        — claims the username
```

## Notes

- Use Discord's ToS at your own risk
