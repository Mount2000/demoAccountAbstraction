const hre = require("hardhat")

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x2655A8F3B0bb34fE6c2dF7d48a6ecaE08A6Cf73C";
const EP_ADDRESS = "0x1102191d42fbF2F1759bFb19a7DB7516DE5A9393";

async function main() {
    const provider = await new hre.ethers.JsonRpcProvider("https://rpc.alephzero-testnet.gelato.digital")
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const sender = await hre.ethers.getCreateAddress(
        {
            from: FACTORY_ADDRESS,
            nonce: FACTORY_NONCE
        }
    )
    console.log(sender);
    // await entryPoint.depositTo(sender, {value: "10000000000000000"});
    const accountFactory = await hre.ethers.getContractFactory("AccountFactory");
    // const initCode = FACTORY_ADDRESS + accountFactory.interface.encodeFunctionData("createAccount", ["0x17bFd12216B3AA64B379B69A7fE97e5C60282462"]).slice(2);
    const Account = await hre.ethers.getContractFactory("Account")

    const userOp1 = {
        sender,
        nonce: await entryPoint.getNonce(sender, 0),
        initCode:"0x",
        callData: Account.interface.encodeFunctionData("execute"),
        callGasLimit: 200000,
        verificationGasLimit: 2000000,
        preVerificationGas: 50000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: "0x",
        signature: "0x",
    }
    const userOp2 = {
        sender,
        nonce: await entryPoint.getNonce(sender, 1),
        initCode: "0x",
        callData: Account.interface.encodeFunctionData("execute"),
        callGasLimit: 200000,
        verificationGasLimit: 2000000,
        preVerificationGas: 50000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: "0x",
        signature: "0x",
    }
    const userOp3 = {
        sender,
        nonce: await entryPoint.getNonce(sender, 3),
        initCode: "0x",
        callData: Account.interface.encodeFunctionData("execute"),
        callGasLimit: 200000,
        verificationGasLimit: 2000000,
        preVerificationGas: 50000,
        maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
        maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
        paymasterAndData: "0x",
        signature: "0x",
    }
    
    const tx = await entryPoint.handleOps([userOp1,userOp2,userOp3],"0x17bFd12216B3AA64B379B69A7fE97e5C60282462")
    const receipt = await tx.wait();
    console.log(receipt);
    
}

main().catch(console.error);




async function deposit (sender, value) {

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const tx = await entryPoint.depositTo(sender, {value});
    await tx.wait();
    const balance = await entryPoint.balanceOf(sender);
    console.log(balance)
}

// deposit("0x40556efdC0740DAE1d7b991fC34468F255E24715","1000000000000000000")

async function checkDeposit(wallet) {
    const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const deposit = await ep.balanceOf(wallet);
    console.log(deposit);
}

// checkDeposit("0x40556efdC0740DAE1d7b991fC34468F255E24715")
