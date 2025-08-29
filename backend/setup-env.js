// setup-env.mjs
import fs from 'fs';
import os from 'os';

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

const ip = getLocalIP();

if (!fs.existsSync('../.env')) {
  fs.writeFileSync('../.env', `VITE_LOCAL_IP=${ip}\n`);
  console.log(`.env created with VITE_LOCAL_IP=${ip}`);
}
