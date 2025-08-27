import { network } from "hardhat";

const { viem } = await network.connect();

async function main() {
    const [ownerClient, aliceClient, bobClient] = await viem.getWalletClients();
    const contract = await viem.deployContract("Joking", [], { client: { wallet: ownerClient } });

    await contract.write.claimToken({ account: aliceClient.account.address })
    // await contract.write.claimToken({ account: aliceClient.account.address }) // should trhows error
    await contract.write.claimToken({ account: bobClient.account.address })

    const aliceJoke = await contract.read.myJoke({ account: aliceClient.account.address })
    const bobJoke = await contract.read.myJoke({ account: bobClient.account.address })
    console.log(aliceJoke)
    console.log(bobJoke)
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

