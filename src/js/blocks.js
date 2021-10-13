/*
 * Sends data to express app to write JSON data for blocks.
 */
class Blocks {
	constructor () {
		this.endpoint = 'http://localhost:4000/blocks';
		this.blockButton = document.getElementById('addBlock');
		this.dialog = document.getElementById('blockDialog');
		this.blockType = document.getElementById('blockType');
		this.submitBlock = document.getElementById('submitBlock');
		this.page = document.getElementById('page');
		this.pageId = page.dataset.page;
		this.bindEventListeners();
	}

	bindEventListeners() {
		if (this.blockButton) {
			this.blockButton.addEventListener('click', () => {
				this.showDialog();
			});
		}

		if (this.submitBlock) {
			this.submitBlock.addEventListener('click', () => {
				this.getBlockData();
			});
		}
	}

	showDialog() {
		this.dialog.classList.remove('hidden');
	}

	hideDialog() {
		this.dialog.classList.add('hidden');
		setTimeout(() => {
			window.location.reload();
		}, 400);
	}

	getBlockData() {
		const blockType = this.blockType.value;

		if (!blockType) return;

		const blockData = {
			page: this.pageId,
			type: blockType
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
		.then((res) => {
			this.hideDialog();
		})
		.catch((res) => {
			console.log(res)
		})
	}
}

export default Blocks