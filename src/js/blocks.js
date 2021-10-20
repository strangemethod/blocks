/*
 * Sends data to express app to write JSON data for blocks.
 */
class Blocks {
	constructor () {
		this.endpoint = 'http://localhost:4000/blocks';
		this.blockButton = document.getElementById('addBlock');
		this.dialog = document.getElementById('blockDialog');
		this.submitButtons = document.querySelectorAll('.submit');
		this.page = document.getElementById('page');
		this.pageId = page.dataset.page;
		this.closeButton = document.getElementById('closeBlock');
		this.editBlockTriggers = document.querySelectorAll('.edit-block');
		this.newBlocks = document.querySelectorAll('.new-block');

		this.dialogs = {
			'image': document.getElementById('imageDialog'),
			'text': document.getElementById('textDialog'),
		}

		this.formFields = {
			'image': document.getElementById('imageField'),
			'text': document.getElementById('textField'),
		}

		this.fieldData = {};

		this.bindEventListeners();
	}

	bindEventListeners() {
		// if (this.blockButton) {
		// 	this.blockButton.addEventListener('click', () => {
		// 		this.showDialog();
		// 	});
		// }

		this.submitButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.getFieldData();
			});
		});

		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => {
				this.hideDialogs();
			});
		}

		this.editBlockTriggers.forEach((block) => {
			block.addEventListener('click', () => {
				this.fieldData = block.dataset;
				this.showDialog();
			});
		});

		// this.newBlocks.forEach((block) => {
		// 	block.addEventListener('click', () => {
		// 		const blockId = block.dataset.afterBlock;
		// 		this.showDialog('add', blockId);
		// 	});
		// });
	}

	showDialog() {
		const dialog = this.dialogs[this.fieldData.fieldType];
		dialog.classList.remove('hidden');
	}

	hideDialogs() {
		const dialogKeys = Object.keys(this.dialogs);
		dialogKeys.forEach((dialogKey) => {
			this.dialogs[dialogKey].classList.add('hidden');
			setTimeout(() => {
				window.location.reload();
			}, 400);
		});
	}

	getFieldData() {
		const fieldInput = this.formFields[this.fieldData.fieldType].value;
		const pathedInput = fieldInput.replace("C:\\fakepath\\", "/img/");

		const blockData = {
			page: this.pageId,
			blockId: this.fieldData.blockId,
			blockType: this.fieldData.blockType,
			fieldId: this.fieldData.fieldId,
			fieldType: this.fieldData.fieldType,
			fieldInput: pathedInput,
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
			this.hideDialogs();
		})
		.catch((res) => {
			console.log(res)
		})
	}
}

export default Blocks