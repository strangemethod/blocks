/*
 * Sends data to express app to write JSON data for blocks.
 */
class Blocks {
	constructor () {
		this.endpoint = 'http://localhost:4000/blocks';
		this.blockButton = document.getElementById('addBlock');

		this.bindEventListeners();
	}

	bindEventListeners() {
		if (this.blockButton) {
			this.blockButton.addEventListener('click', () => {
				this.postBlock();
			});
		}
	}

	postBlock() {
		const blockData = {
			type: 'text-image',
			text: 'This is a block from the API.'
		}

		this.postData(blockData)
	}

	postData(data) {
		fetch(this.endpoint, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		})
		.then(function(res){ console.log(res) })
		.catch(function(res){ console.log(res) })
	}
}

export default Blocks