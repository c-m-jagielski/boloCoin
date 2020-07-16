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
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString);
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
}

let boloCoin = new BlockChain();
boloCoin.addBlock(new Block(1, "07/01/2020", {amount:100}));
boloCoin.addBlock(new Block(2, "07/03/2020", {amount:500}));

console.log(JSON.stringify(boloCoin, null, 4));