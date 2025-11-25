# Electron Setup Instructions

This file contains the build scripts that need to be added to package.json. Since package.json is protected, follow these steps:

## Step 1: Update package.json Scripts

Open `package.json` and replace the "scripts" section with:

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
}
```

## Step 2: Configure Main Entry Point

Also in `package.json`, add these fields at the root level:

```json
{
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
}
```

## Step 3: Create Assets Folder

Create a folder for the application icon:

```bash
mkdir -p assets
```

Then add an icon file:
- Place a 256x256 or larger PNG image at `assets/icon.png`
- This will be used for the application icon and installer

## Step 4: Build for Windows

Once package.json is updated, run:

```bash
npm run build:win
```

This will:
1. Build the React frontend
2. Compile the Express backend
3. Compile Electron TypeScript files
4. Create Windows installer and portable .exe in the `release/` folder

## Alternative: Single Command Build

You can also run the full build manually:

```bash
# Build frontend and backend
npm run build

# Compile Electron files
tsc --project tsconfig.electron.json

# Build Windows executable
electron-builder --win
```

## Files That Were Created

- ✅ `electron/main.ts` - Main Electron process
- ✅ `electron/preload.ts` - Preload script
- ✅ `electron-builder.json` - Build configuration
- ✅ `tsconfig.electron.json` - TypeScript config for Electron
- ✅ `WINDOWS_BUILD.md` - Complete build guide

## Troubleshooting

### npm ERR! Cannot find module 'electron'

Run: `npm install`

### Build fails with TypeScript errors

Run: `npm run check` to see all errors, then fix them

### Port 5000 already in use

The app uses port 5000 internally. Make sure nothing else is using it or the app will fail to start.

## Next Steps

1. Update `package.json` with the scripts and build configuration above
2. Run `npm run build:win`
3. Find your .exe files in the `release/` folder
4. Share the installer with users!
