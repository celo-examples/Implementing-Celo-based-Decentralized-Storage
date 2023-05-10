# Implementing Celo-based Decentralized File Storage

This repository contains the source code for a decentralized file storage system built on the Celo blockchain. The application allows users to upload files onto IPFS and keep track of these files using a smart contract on the Celo network. Users can select whether their file is public or private.

The system utilizes smart contracts written in Solidity, a frontend built using React, IPFS for decentralized file storage, and integration with the Celo network through ethers.js and the Celo Extension Wallet.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Built With](#built-with)
- [Next Steps](#next-steps)

## Getting Started

These instructions will guide you through the process of setting up and running the decentralized file storage system on your local machine for development and testing purposes.

### Prerequisites

Before you proceed, ensure that you have the following software installed on your system:

- Node.js (v12.0.1 or later) - https://nodejs.org/
- A Celo account with some test CELO or cUSD for transactions.
- Celo Extension Wallet - https://chrome.google.com/webstore/detail/celo-extension-wallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh
- An Infura account for IPFS integration - https://infura.io/

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/celo-decentralized-file-storage.git
cd celo-decentralized-file-storage
```

2. Install the dependencies

```bash
npm install
```

### Running the Application

1. Compile and deploy the smart contracts

```bash
truffle compile
truffle migrate --network celo
```

2. Start the React development server

```bash
npm start
```

3. Open a browser and navigate to `http://localhost:3000`. Make sure you have the Metamask Extension Wallet installed and configured with a Celo account.

4. Interact with the application to upload files and manage their visibility settings.

## Built With

- [Celo](https://celo.org/) - The blockchain platform
- [Solidity](https://soliditylang.org/) - The smart contract programming language
- [React](https://reactjs.org/) - The frontend library
- [Truffle](https://www.trufflesuite.com/) - The development and testing framework
- [OpenZeppelin](https://openzeppelin.com/contracts/) - The library for reusable smart contract components
- [IPFS](https://ipfs.io/) - The decentralized file storage system
- [Infura](https://infura.io/) - The IPFS provider

## Next Steps

Refer to the [Next Steps](#next-steps) section in the tutorial for ideas on how to expand and improve the application.
