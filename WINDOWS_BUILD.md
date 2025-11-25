# Building LootLedger for Windows (.exe)

This guide explains how to compile LootLedger into a Windows executable installer and portable .exe file.

## Prerequisites

- **Windows 10 or later** (for building)
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

## Quick Start - Build the .exe

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including Electron and electron-builder.

### Step 2: Build the Application

Run this command to compile everything and create the Windows installer:

```bash
npm run build:win
```

This process will:
1. Build the React frontend
2. Compile the Express backend
3. Package everything with Electron
4. Create a Windows installer (.exe) and portable executable

**Expected time**: 2-5 minutes depending on your system

### Step 3: Find Your .exe Files

After the build completes, look in the `release/` folder:

```
release/
├── LootLedger-1.0.0.exe              ← Windows Installer
├── LootLedger-1.0.0-portable.exe     ← Portable executable (no installation needed)
└── other build artifacts
```

## Installation Methods

### Option 1: Windows Installer (Recommended for End Users)

**File**: `LootLedger-1.0.0.exe`

1. Double-click the installer
2. Choose installation directory
3. Select options for desktop/start menu shortcuts
4. Click Install
5. LootLedger will launch automatically
6. Create a start menu shortcut for easy access

**Advantages**:
- Professional installation experience
- Automatic shortcut creation
- Can be uninstalled via Control Panel
- Better for distribution

### Option 2: Portable Executable (Standalone)

**File**: `LootLedger-1.0.0-portable.exe`

1. Copy the .exe file anywhere on your computer
2. Double-click to run directly
3. No installation needed
4. No registry modifications

**Advantages**:
- No installation required
- Can run from USB drive
- Can be moved to any directory
- Easier to test

## Build Scripts

### Available Commands

```bash
# Development server (hot reload)
npm run dev

# Build frontend and backend
npm run build

# Build Windows installer and portable .exe
npm run build:win

# Build macOS version (if on macOS)
npm run build:mac

# Build Linux version
npm run build:linux

# Check TypeScript for errors
npm run check
```

## What's Included in the .exe

The Windows build includes:
- ✅ Complete React frontend UI
- ✅ Express.js backend API server
- ✅ In-memory data storage (for current version)
- ✅ Dark theme with yellow accents
- ✅ All required dependencies
- ✅ Chromium browser engine
- ✅ Node.js runtime

## First Run

When you launch LootLedger for the first time:

1. **Backend starts** - Express server initializes on port 5000
2. **Window opens** - Electron creates the application window
3. **Frontend loads** - React app loads in the window
4. **You're ready** - Start adding inventory items!

## Running the .exe

### Direct Execution

Simply double-click `LootLedger-1.0.0-portable.exe` to launch.

### Command Line

```bash
# Run from any directory
"C:\path\to\LootLedger-1.0.0-portable.exe"

# Or with custom parameters (if needed in future)
"C:\path\to\LootLedger-1.0.0-portable.exe" --arg value
```

## Data Storage

The current version uses **in-memory storage**, which means:

- ✅ Data persists while the app is running
- ❌ Data resets when you close the app
- ✅ Perfect for inventory viewing/management during sessions

**For production**: Replace MemStorage with PostgreSQL for data persistence (see replit.md for details).

## Troubleshooting

### Issue: "Windows protected your PC" warning

**Solution**: This is normal for unsigned executables. Click:
1. "More info"
2. "Run anyway"

To remove this warning, you can sign the executable with a code signing certificate.

### Issue: Application won't start

**Check**:
1. Port 5000 is not in use: `netstat -ano | findstr 5000`
2. Windows Firewall allows the app
3. Administrator privileges (try running as Admin)

### Issue: "Cannot find module" errors

**Solution**:
1. Delete `node_modules/` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Try building again

### Issue: Build fails

**Try**:
1. Update Node.js to latest LTS version
2. Clear npm cache: `npm cache clean --force`
3. Reinstall dependencies: `npm install --force`
4. Check TypeScript: `npm run check`

## Customization

### Change Application Icon

1. Replace the icon file at `assets/icon.png` (256x256 minimum)
2. Run build again

### Change Application Name/Version

Edit `package.json`:

```json
{
  "name": "lootledger",
  "version": "1.0.0",
  "productName": "LootLedger"
}
```

### Change Window Size

Edit `electron/main.ts`:

```typescript
mainWindow = new BrowserWindow({
  width: 1400,      // Change this
  height: 900,      // And this
  minWidth: 1024,
  minHeight: 600,
});
```

## Distribution

### Sharing the .exe

**For End Users**:
- Share `LootLedger-1.0.0.exe` (installer) for easy installation
- Share `LootLedger-1.0.0-portable.exe` for no-install usage

**File Sizes** (approximate):
- Installer: 150-200 MB
- Portable: 160-210 MB

(Includes Chromium browser engine + Node.js runtime)

### Creating Custom Installation Media

You can:
1. Upload .exe to your website
2. Create installers with custom branding
3. Distribute via USB drives
4. Add to software repositories

## Security Considerations

### Code Signing (Optional but Recommended for Distribution)

For production releases, consider code signing:
- Removes Windows security warnings
- Adds trust indicators
- Required for Windows SmartScreen bypass
- Can be purchased from certificate authorities

### Electron Security Best Practices

The app includes:
- ✅ Node integration disabled
- ✅ Context isolation enabled
- ✅ Sandboxed renderer processes
- ✅ No dangerous preload scripts

## Performance

Typical resource usage:
- **Memory**: 150-250 MB
- **CPU**: Minimal when idle
- **Startup time**: 3-5 seconds
- **Storage**: ~180 MB for installed app

## Next Steps

After building, consider:
1. **Database Integration** - Switch from in-memory to PostgreSQL
2. **Code Signing** - For professional distribution
3. **Auto-Updates** - Implement electron-updater for OTA updates
4. **Analytics** - Track usage with error reporting
5. **Custom Branding** - Add company logos and colors

## Support

For issues:
1. Check the troubleshooting section above
2. Review logs in the app folder
3. Check `AGENTS.md` for development guidelines
4. Reference `README.md` for features and API

## Building for Other Platforms

### macOS

Requires macOS system:
```bash
npm run build:mac
```

### Linux

```bash
npm run build:linux
```

Creates AppImage, .deb, and .snap packages.

---

**You now have a complete Windows desktop application!** 🎉

Distribute `LootLedger-1.0.0.exe` or `LootLedger-1.0.0-portable.exe` to end users.
