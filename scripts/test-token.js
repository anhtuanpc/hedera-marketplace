/*-
 *
 * Hedera Hardhat Example Project
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const { ethers } = require("hardhat");

// //This function accepts two parameters - address and msg
// //Retrieves the contract from the address and set new greeting
// module.exports = async (address, msg) => {
//   //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
//   const wallet = (await ethers.getSigners())[0];

//   //Assign the greeter contract object in a variable, this is used for already deployed contract, which we have the address for. ethers.getContractAt accepts:
//   //name of contract as first parameter
//   //address of our contract
//   //wallet/signer used for signing the contract calls/transactions with this contract
//   const greeter = await ethers.getContractAt("Greeter", address, wallet);

//   //using the greeter object(which is our contract) we can call functions from the contract. In this case we call setGreeting with our new msg
//   const updateTx = await greeter.setGreeting(msg);

//   console.log(`Updated call result: ${msg}`);

//   return updateTx;
// };

async function main() {
  //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
  const wallet = (await ethers.getSigners())[0];
  const address = "0x7D9c8Fa9B9279C820453858a85C9311517c94735";

  //Assign the greeter contract object in a variable, this is used for already deployed contract, which we have the address for. ethers.getContractAt accepts:
  //name of contract as first parameter
  //address of our contract
  //wallet/signer used for signing the contract calls/transactions with this contract
  const tokenContract = await ethers.getContractAt("Token", address, wallet);

  //using the greeter object(which is our contract) we can call functions from the contract. In this case we call setGreeting with our new msg
  // const mintTx = await tokenContract.mint(
  //   wallet.address,
  //   ethers.utils.parseEther("100000")
  // );

  // await mintTx.wait();

  // const approveTx = await tokenContract.approve(
  //   "0xf3e3f1Bab07CDA6f3e6801a3A7c4e422Dd0FA79F",
  //   ethers.utils.parseEther("10")
  // );
  // await approveTx.wait();

  const balance = await tokenContract.balanceOf(
    "0xff69d201c52109cd1e6a780e211c3fb79613b597"
  );
  console.log(`token balance of marketplace: ${balance.toString()}`);

  console.log(`Successfully!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
