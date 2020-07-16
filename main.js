/**
 * js blockchain (from Youtube)
 */

const SHA256 = require('js-sha256')  // npm install js-sha256

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = '';
	}
	
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class BlockChain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	// Need a manual genesis block, the data doesn't matter
	createGenesisBlock() {
		let tmp = new Block(0, "01/01/2020", "Genesis block", "0");
		tmp.hash = tmp.calculateHash();
		return tmp;
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid() {
		for(let i=1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			// Make sure the current hash hasn't changed
			if(currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			// Make sure the hash tracking is not broken
			if(currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

/*
 *  Here's an example to run...
 *
 *  Features that are still missing from a real-world implementation:
 *   - need to check if funds are available
 *   - no p2p (peer-to-peer) handling
 *   - no proof of work
 *   - needs to rollback changes if chain is found to be invalid
 */

let boloCoin = new BlockChain();
boloCoin.addBlock(new Block(1, "07/01/2020", {amount:100}));
boloCoin.addBlock(new Block(2, "07/03/2020", {amount:500}));

console.log("Is the blockchain valid? " + boloCoin.isChainValid());

boloCoin.chain[1].data = {amount:99999};  // Let's get rich!
boloCoin.chain[1].hash = boloCoin.chain[1].calculateHash();  // Can I trick it? No.

console.log("Is the blockchain valid? " + boloCoin.isChainValid());

// TODO add something to roll back the invalid changes if the chain is not valid

//console.log(JSON.stringify(boloCoin, null, 4));