import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { network } from "hardhat"

describe("Joke", async function() {
    const { viem } = await network.connect()
    const [owner, client] = await viem.getWalletClients()

    it("Should read correctly a Joke", async function() {
        const expectedJoke = "Why did the scarecrow win an award? Because he was outstanding in his field!"
        const contract = await viem.deployContract("Joking", [], { client: { wallet: owner } })
        await contract.write.claimToken({ account: client.account.address })

        const receivedJoke = await contract.read.myJoke({ account: client.account.address })
        assert(receivedJoke === expectedJoke)
    })

    it("reverts with 'already claimed' if caller already owns one", async function() {
        const contract = await viem.deployContract("Joking", [], { client: { wallet: client } })

        await contract.write.claimToken({ account: client.account.address }) // first claim should work

        await assert.rejects(
            contract.write.claimToken({ account: client.account.address }), // second claim should fail
            { message: /already claimed/ }
        )
    })

    it("reverts with 'sold out' when all the jokes are already claimed", async function() {
        const contract = await viem.deployContract("Joking", [], { client: { wallet: owner } })
        const clients = await viem.getWalletClients()
        const numberOfJokes = 10 // TODO: Try get this from the contract instead of hardcoding it

        for (let i = 0; i < numberOfJokes-1; i++) {
            await contract.write.claimToken({ account: clients[i].account.address })
        }

        await assert.rejects(
            contract.write.claimToken({ account: clients[numberOfJokes].account.address }),
            { message: /sold out/ }
        )
    })
})
