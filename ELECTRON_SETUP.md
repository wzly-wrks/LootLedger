# LootLedger Windows Desktop App - Complete Setup Guide

This guide walks you through everything needed to turn LootLedger into a Windows .exe application.

## What's Been Done

The project is now configured for Electron. The following files have been created:

✅ **electron/main.ts** - Electron main process that:
   - Creates the application window
   - Starts the Express backend server
   - Manages application lifecycle
   - Provides menu (File, Edit, View, Help)

✅ **electron/preload.ts** - Preload script for secure communication between Electron and frontend

✅ **electron-builder.json** - Configuration for building Windows installers and portable executables

✅ **tsconfig.electron.json** - TypeScript configuration specifically for Electron files

✅ **WINDOWS_BUILD.md** - Detailed guide for building and distributing the app

## What You Need to Do

### Step 1: Update package.json

Since package.json is a protected file, you'll need to manually add the build scripts and configuration.

Open `package.json` in your editor and make these changes:

#### Replace the "scripts" section (lines 6-12) with:

```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index-dev.ts",
  "build": "vite build && esbuild server/index-prod.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push",
  "build:electron": "npm run build && tsc --project tsconfig.electron.json",
  "build:win": "npm run build:electron && electron-builder --win",
  "build:mac": "npm run build:electron && electron-builder --mac",
  "build:linux": "npm run build:electron && electron-builder --linux"
},
```

#### Add these fields to the root of package.json (after "type": "module"):

```json
"main": "dist-electron/electron/main.js",
"homepage": "./",
"build": {
  "appId": "com.lootledger.app",
  "productName": "LootLedger",
  "files": [
    "dist/**/*",
    "dist-electron/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "directories": {
    "buildResources": "assets",
    "output": "release"
  },
  "win": {
    "target": [
      "nsis",
      "portable"
    ]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "LootLedger"
  }
}
```

### Step 2: Create Assets Folder

Create the assets folder if it doesn't exist:

```bash
mkdir assets
```

### Step 3: Add Application Icon (Optional but Recommended)

Create or get a 256x256 PNG image and save it as `assets/icon.png`

### Step 4: Build the Windows .exe

Once package.json is updated, run:

```bash
npm run build:win
```

This will:
- Build the React frontend
- Compile the Express backend to Node.js
- Compile Electron TypeScript files
- Create both an installer (.exe) and portable executable
- Output files to `release/` folder

### Step 5: Find Your .exe Files

Look in the `release/` folder:

```
release/
├── LootLedger-1.0.0.exe              ← Windows Installer (recommended)
├── LootLedger-1.0.0-portable.exe     ← Standalone executable (no install)
└── installer assets
```

## Installation Options for End Users

### Option 1: Windows Installer (Professional Installation)

Share: `release/LootLedger-1.0.0.exe`

Users double-click to:
1. Choose installation directory
2. Create start menu shortcuts
3. Create desktop shortcut
4. Automatic launch after install
5. Uninstall via Control Panel (Add/Remove Programs)

**Best for**: Distribution to others, professional appearance

### Option 2: Portable Executable (No Installation)

Share: `release/LootLedger-1.0.0-portable.exe`

Users:
1. Double-click and it runs immediately
2. No installation needed
3. Can run from USB drive
4. Ideal for testing or portable use

**Best for**: USB distribution, testing, quick deployment

## File Sizes

- Installer: ~160 MB
- Portable: ~160 MB

(Includes Chromium + Node.js runtime)

## Architecture Overview

```
User Runs .exe
    ↓
Electron Launcher Starts
    ↓
Express Server Starts (port 5000)
    ↓
Electron Window Opens
    ↓
React Frontend Loads
    ↓
App Ready!
```

## Key Components

### Electron Main Process (electron/main.ts)
- Manages the application window
- Starts the Express backend server
- Handles application lifecycle
- Provides desktop menu

### Express Backend (server/index-prod.ts)
- Runs on localhost:5000
- Provides REST API
- Manages inventory data
- Validates requests

### React Frontend (client/src/)
- Runs in Electron's browser window
- Communicates with Express backend
- Dark theme UI with yellow accents
- All CRUD operations

### Data Storage
- Currently: In-memory (MemStorage)
- Recommended for production: PostgreSQL

## Deployment Steps

1. Build the .exe: `npm run build:win`
2. Test the installer: Run it on a clean Windows machine
3. Test the portable .exe: Copy it around and verify it works
4. Share or upload the .exe files
5. Users install and start using LootLedger!

## Customization

### Change Application Name

Edit `package.json`:
```json
"productName": "LootLedger"
```

### Change Version

Edit `package.json`:
```json
"version": "1.0.0"
```

### Change Window Size

Edit `electron/main.ts`:
```typescript
mainWindow = new BrowserWindow({
  width: 1400,    // Default width in pixels
  height: 900,    // Default height in pixels
});
```

### Change Application Icon

Replace `assets/icon.png` with your own 256x256+ PNG file

## Troubleshooting

### Build fails: "Cannot find module 'electron'"

Run: `npm install`

### Build fails: "electron-builder not found"

Run: `npm install`

### App won't start after building

1. Check port 5000 isn't in use: `netstat -ano | findstr 5000`
2. Run as Administrator
3. Check Windows Firewall allows the app

### TypeScript compilation errors

Run: `npm run check` to see all errors

## Development vs. Production

### Development
```bash
npm run dev
```
- Web-based interface
- Hot reload
- DevTools available
- Quick iteration

### Production (Windows Desktop App)
```bash
npm run build:win
```
- Standalone .exe installer
- Professional installation experience
- Portable option available
- Ready for distribution

## Next Steps

1. ✅ Electron files created
2. ⏭️ Update package.json (you do this)
3. ⏭️ Create assets/icon.png (optional)
4. ⏭️ Run npm run build:win
5. ⏭️ Share the .exe files!

## Support & Documentation

- **Build Help**: See WINDOWS_BUILD.md
- **Development**: See AGENTS.md
- **Features**: See README.md
- **Architecture**: See replit.md

---

**You're ready to create Windows executables!** 🎉

After updating package.json, run `npm run build:win` and find your .exe files in the `release/` folder.
