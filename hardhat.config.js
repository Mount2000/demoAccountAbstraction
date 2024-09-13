require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    alephTestnet: {
      url: "https://rpc.alephzero-testnet.gelato.digital",
      accounts: ["2804a59cf73a60e1431aeca427322f545a4d5992f3260700c386843f49c9c553"],
    },
    aleph: {
      url: "https://alephzero.drpc.org",
      accounts: ["2804a59cf73a60e1431aeca427322f545a4d5992f3260700c386843f49c9c553"],
    },
    holesky: {
      url: "https://1rpc.io/holesky",
      accounts: ["2804a59cf73a60e1431aeca427322f545a4d5992f3260700c386843f49c9c553"],
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};