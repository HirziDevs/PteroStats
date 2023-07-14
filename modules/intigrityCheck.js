const fs = require("node:fs");
const child = require("node:child_process");
const path = require("node:path");

const REQUIRED_PACKAGES = [
  {
    name: "axios",
    version: "1.4.0",
  },
  {
    name: "axios-retry",
    version: "3.5.1",
  },
  {
    name: "chalk",
    version: "4.1.2",
  },
  {
    name: "discord.js",
    version: "14.11.0",
  },
  {
    name: "js-yaml",
    version: "4.1.0",
  },
];
const NODE_VERSION = 16;

function InstallPackages() {
  console.log("Required nodejs packages not found!");
  console.log("Please wait... starting to install all required node packages.");
  console.log(
    "If the bot can't install the packages please install them manually."
  );

  try {
    let packagesList = "";

    for (const package of REQUIRED_PACKAGES) {
      packagesList += ` ${package.name}@${package.version}`;
    }

    child.execSync(`npm i${packagesList}`);
    console.log('Install complete!, please run "node index" command again!');

    process.exit();
  } catch (err) {
    console.log("Error! ", err);
    console.log("Support Server: https://discord.gg/zv6maQRah3");

    process.exit();
  }
}

module.exports = () => {
  if (Number(process.version.split(".")[0]) < NODE_VERSION) {
    console.log(
      `Unsupported NodeJS Version!, Please use NodeJS ${NODE_VERSION}.x or higher.`
    );

    process.exit();
  }

  const nodeModulesFolderPath = path.join(__dirname, "../", "node_modules");

  if (fs.existsSync(nodeModulesFolderPath)) {
    let success = false;
    let errorMessage = "";

    for (const package of REQUIRED_PACKAGES) {
      const packageFilePath = path.join(
        __dirname,
        "../",
        "node_modules",
        package.name,
        "package.json"
      );

      if (fs.existsSync(packageFilePath)) {
        let packageFile = fs.readFileSync(packageFilePath, 'utf-8');

        if (packageFile) {
          packageFile = JSON.parse(packageFile);

          if (
            Number(packageFile.version.split(".")[1]) !==
            Number(package.version.split(".")[1])
          ) {
            console.log(
              `Unsupported "${package.name}" version!.\nPlease delete your "node_modules" and "package-lock.json".\nAnd restart the bot.\nPlease make sure to check and remove "npm install" command from your startup params.`
            );

            process.exit();
          } else {
            success = true;

            continue;
          }
        } else {
          success = false;

          errorMessage = `Unknown package version- "${package.name}@${package.version}".`;

          break;
        }
      } else {
        success = false;

        errorMessage = `Missing package- "${package.name}".`;

        break;
      }
    }

    if (!success) {
      if (errorMessage) {
        console.log(errorMessage);
      }

      InstallPackages();
    }
  } else {
    InstallPackages();
  }

  return true;
};
