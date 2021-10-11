/*
 * Blocks API
 * Sends data to express app to write JSON data that builds page.
 */
class BlocksApi {
	constructor () {
		this.endpoint = 'http://localhost:4000/blocks';
		this.button = document.getElementById('addBlock');

		this.bindEventListeners();
	}

	bindEventListeners() {
		this.button.addEventListener('click', () => {
			this.postBlock();
		});
	}

	postBlock() {
		const blockData = {
			type: 'text-image',
			text: 'This is a block from the API.'
		}

		fetch(this.endpoint, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(blockData)
		})
		.then(function(res){ console.log(res) })
		.catch(function(res){ console.log(res) })
	}
}

export default BlocksApi