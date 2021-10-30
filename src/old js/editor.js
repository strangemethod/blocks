/*
 * Sends data to express app to write JSON data for blocks.
 */
class Editor {
	constructor () {
		this.endpoint = 'http://localhost:4000/blocks';
		this.page = document.getElementById('page');
		this.pageId = page.dataset.page;
		this.dialogGrids = document.querySelectorAll('.dialog .grid');

		this.triggers = {
			'add': document.querySelectorAll('.new-block'),
			'close': document.querySelectorAll('.close'),
			'edit': document.querySelectorAll('.edit-block'),
			'submitBlock': document.querySelectorAll('.submit-block'),
			'submitField': document.querySelectorAll('.submit-field'),
		}

		this.dialogs = {
			'add': document.getElementById('blockDialog'),
			'image': document.getElementById('imageDialog'),
			'text': document.getElementById('textDialog'),
		}

		this.formFields = {
			'blockType': document.getElementById('blockType'),
			'image': document.getElementById('imageField'),
			'text': document.getElementById('textField'),
		}

		this.fieldData = null;

		this.bindEventListeners();
	}

	bindEventListeners() {
		this.triggers.add.forEach((block) => {
			block.addEventListener('click', () => {
				this.showDialog();
			});
		});

		this.triggers.close.forEach((button) => {
			button.addEventListener('click', () => {
				this.hideDialogs();
			});
		});

		this.dialogGrids.forEach((grid) => {
			grid.addEventListener('click', (e) => {
				e.stopPropagation();
			});
		});

		this.triggers.edit.forEach((block) => {
			block.addEventListener('click', () => {
				this.fieldData = block.dataset;
				this.showDialog();
			});
		});

		this.triggers.submitBlock.forEach((button) => {
			button.addEventListener('click', () => {
				this.addBlock();
			});
		});

		this.triggers.submitField.forEach((button) => {
			button.addEventListener('click', () => {
				this.getFieldData();
			});
		});
	}

	showDialog() {
		const blockExists = this.fieldData;
		const dialog = blockExists ? this.dialogs[this.fieldData.fieldType] : this.dialogs.add;
		
		dialog.classList.remove('hidden');
	}

	hideDialogs() {
		const dialogKeys = Object.keys(this.dialogs);
		this.fieldData = null;

		dialogKeys.forEach((dialogKey) => {
			this.dialogs[dialogKey].classList.add('hidden');
			setTimeout(() => {
				window.location.reload();
			}, 400);
		});
	}

	addBlock() {
		const fieldInput = this.formFields.blockType.value;

		console.log(fieldInput);
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

		console.log(blockData);
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

export default Editor