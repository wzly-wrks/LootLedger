# Build Windows .exe - Quick Start

This is the fastest way to get your Windows executable.

## 3 Simple Steps

### Step 1: Update package.json

Open the `package.json` file in the root directory and make these edits:

**Find this section** (around line 6):
```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index-dev.ts",
  "build": "vite build && esbuild server/index-prod.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
},
```

**Replace with this**:
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

**Then find** (around line 4):
```json
"type": "module",
```

**Add these lines right after it**:
```json
"type": "module",
"main": "dist-electron/electron/main.js",
"homepage": "./",
```

**Then scroll to the very end before the closing `}`** and add:
```json
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

**Save package.json**

### Step 2: Create Assets Folder (Optional but Recommended)

Create a new folder named `assets` in the project root:

```bash
mkdir assets
```

Add a Windows icon (256x256 or larger PNG) at `assets/icon.png`

If you skip this, the app will use the default Electron icon.

### Step 3: Build for Windows

Run this command in your terminal:

```bash
npm run build:win
```

This will take 2-5 minutes and will:
- ✅ Build your React frontend
- ✅ Compile your Express backend
- ✅ Package everything with Electron
- ✅ Create Windows installer and portable .exe

## Find Your .exe Files

After the build completes, open the `release/` folder. You'll see:

- **LootLedger-1.0.0.exe** ← Professional installer (use this for distribution)
- **LootLedger-1.0.0-portable.exe** ← Standalone executable (run anywhere, no install)

## Share or Install

### To Install on Your Computer:
Double-click `LootLedger-1.0.0.exe` and follow the installer

### To Distribute to Others:
Share `LootLedger-1.0.0.exe` - they'll get a professional installation experience

### For Portable Use:
Share `LootLedger-1.0.0-portable.exe` - works on any Windows without installation

## That's It! 🎉

You now have a complete Windows desktop application with:
- ✅ Dark theme UI (#111111 black, #F4E43D yellow)
- ✅ Full inventory management
- ✅ Dashboard with stats
- ✅ Filtering and search
- ✅ Item CRUD operations
- ✅ Professional Windows installer

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails with "npm ERR" | Run `npm install` |
| "Cannot find module 'electron'" | Run `npm install` |
| TypeScript errors | Run `npm run check` to see details |
| App won't start | Make sure port 5000 is available |
| Windows warning about app | This is normal - click "Run anyway" |

## Files You Created

These Electron configuration files are ready to use:
- ✅ electron/main.ts
- ✅ electron/preload.ts
- ✅ electron-builder.json
- ✅ tsconfig.electron.json

## Build for Other Platforms

```bash
npm run build:mac      # macOS
npm run build:linux    # Linux
```

## For More Details

See these documentation files:
- `ELECTRON_SETUP.md` - Complete setup guide
- `WINDOWS_BUILD.md` - Advanced build options
- `electron-builder-setup.md` - Detailed configuration

---

**Now build your Windows app: `npm run build:win`**

The .exe files will be in the `release/` folder ready to share! 🚀
