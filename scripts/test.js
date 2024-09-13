const hre = require("hardhat")

const AF_ADDR = "0xfd521578511e7f2F1aA51b4111fEd603D6C4161a";

async function main(txHash) {
    const provider = new hre.ethers.JsonRpcProvider("https://rpc.alephzero-testnet.gelato.digital")
    const wallet = new hre.ethers.Wallet("2804a59cf73a60e1431aeca427322f545a4d5992f3260700c386843f49c9c553", provider)
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "x",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const contractAddress = "0xFffcda49F17ff7065f2B40Cfa80eAFB9d5C63f20";
    const contract = await new hre.ethers.Contract(contractAddress, contractABI, provider);
    const iface = new hre.ethers.Interface(contractABI);
    provider.getTransaction(txHash).then((transaction) => {
        const decodedData = iface.parseTransaction({ data: transaction.data });
        console.log(decodedData.fragment.inputs);
    }).catch((err) => {
        console.error("Error fetching transaction:", err);
    });


    
}

main("0x63de9ee61a841e5f382cf2d1628176533b255cb8df00f6019eee3fd15491115d").catch(console.error);
