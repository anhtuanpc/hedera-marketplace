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
const { upgrades } = require("hardhat");

async function main() {
  //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
  let wallet = (await ethers.getSigners())[0];

  //Initialize a contract factory object
  //name of contract as first parameter
  //wallet/signer used for signing the contract calls/transactions with this contract
  const MarketplaceContract = await ethers.getContractFactory(
    "RLFMarketplaceUpgradeable",
    wallet
  );
  //Using already intilized contract facotry object with our contract, we can invoke deploy function to deploy the contract.
  //Accepts constructor parameters from our contract
  //   const marketplaceContract = await MarketplaceContract.deploy();
  const marketplaceContract = await upgrades.deployProxy(
    MarketplaceContract,
    []
  );
  //We use wait to recieve the transaction (deployment) receipt, which contrains contractAddress

  await marketplaceContract.deployed();

  console.log(`Marketplace deployed to: ${marketplaceContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
