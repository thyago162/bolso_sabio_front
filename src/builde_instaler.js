import { MSICreator } from 'electron-wix-msi';

const APP_DIR = path.resolve(__dirname, './BolsoSabio-win32-x64')
const OUT_DIR = path.resolve(__dirname, './windows_installer')

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  description: 'Organiza investimentos',
  exe: 'Bolso Sábio',
  name: 'Bolso Sábio',
  manufacturer: 'Thyago Brasileiro',
  version: '0.1.0',
  outputDirectory: OUT_DIR
});

// Step 2: Create a .wxs template file
const supportBinaries = await msiCreator.create();

// 🆕 Step 2a: optionally sign support binaries if you
// sign you binaries as part of of your packaging script
supportBinaries.forEach(async (binary) => {
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
  await signFile(binary);
});

// Step 3: Compile the template to a .msi file
await msiCreator.compile();