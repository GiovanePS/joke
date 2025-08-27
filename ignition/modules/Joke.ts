// Just trying ignition
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("JokeModule", (m) => {
    const joking = m.contract("Joking")

    m.call(joking, "someFuncOfTheContract", [2n])

    return { joking };
})
