# Local Chat App 🚀

A simple real-time web chat application built with Node.js, Socket.IO, and Vite.
This project is designed for **local network usage**, so all users must be connected to the same Wi-Fi to interact.

**After running the quick setup**, you can copy the link provided and open it in your favorite browser. 
Share this link with friends or family connected to your home Wi-Fi to start chatting.

The app works on any device, but make sure your machine is running the app first, as it acts as the local server for everyone else.
---

## Features

- Real-time chat between multiple users on the same local network.
- **Delete button**: clears the chat for all users (both client and server messages). 
- Automatic setup of environment variables.
- Easy start with a single setup script.
- ASCII art branding with dynamic creation and last updated timestamps.

---

## Setup

### Requirements on your local machine

- Node.js v18+  
- npm v9+  
- A local Wi-Fi network (es: Home Wi-Fi)

If you do not have them installed 
# Follow this steps : 
## Install Node.js, npm & nodemon on your local machine

### macOS
```bash
brew install node
npm install -g nodemon
```

## Ubuntu / Debian Linux
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g nodemon

```
### Windows

- Download and install Node.js LTS from Node.js official site
- Open Command Prompt or PowerShell and install nodemon globally:

```bash
`
npm install -g nodemon

```

### Quick Start

1. Clone the repository:

```bash
git clone git@github.com:manuel-crispino/Local_Chat-.git
cd Local_Chat-/

#Run the setup script:

./set.sh

```

## This script will:

- Check and install dependencies if missing (node_modules)
- Set up backend environment (.env with your local IP)
- Start the backend and frontend dev servers
- Display the app URL for devices on the same network

## Usage

### After running ./set.sh, you will see an output like:
```bash
 _    _   ____ 
/ \  / | /   _|
|  `´  | |  / 
| |\/| | |  \_
\_/  \_| \____|

© Manuel Crispino
created : 2025-08-29
last updated : 2025-08-29 + time

🔗 App running on:
http://your-local-ip:5173/

⚠ Attention: The chat works only for devices on your local Wi-Fi.
Share the URL to let them connect.
Copy the URL shown under App running on: and open it on any device connected to the same Wi-Fi to start chatting.
```
### Script Behavior
Press CTRL+C to safely stop servers and free occupied ports.

The setup script automatically detects missing dependencies and installs them.

.env stores your local IP to allow frontend connection from other devices.

License
© Manuel Crispino