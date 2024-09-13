const hre = require("hardhat")
async function main() {
const ep = await hre.ethers.deployContract("EntryPoint");
await ep.waitForDeployment();
  console.log(`Entrypoint deployed to: ${ep.target}`);
}

main().catch(console.error);