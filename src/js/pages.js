/*
 * Sends data to express app to write JSON data for pages.
 */
class Pages {
	constructor () {
		this.endpoint = 'http://localhost:4000/pages';
		this.pageButton = document.getElementById('addPage');
		this.pageDialog = document.getElementById('pageDialog');
		this.submitPage = document.getElementById('submitPage');
		this.pageTitle = document.getElementById('pageTitle');
		this.pageSlug = document.getElementById('pageSlug');
		this.pageText = document.getElementById('pageText');

		this.bindEventListeners();
	}

	bindEventListeners() {
		if (this.pageButton) {
			this.pageButton.addEventListener('click', () => {
				this.showDialog();
			});
		}

		if (this.submitPage) {
			this.submitPage.addEventListener('click', () => {
				this.getPageData();
			});
		}
	}

	showDialog() {
		this.pageDialog.classList.remove('hidden');
	}

	hideDialog() {
		this.pageDialog.classList.add('hidden');
		this.pageTitle.value = '';
		this.pageSlug.value = '';
		this.pageText.value = '';
		setTimeout(() => {
			window.location.reload();
		}, 400);
	}

	getPageData() {
		const title = this.pageTitle.value;
		const slug = this.pageSlug.value;
		const text = this.pageText.value;

		if (!title || !slug) return;

		const pageData = {
			"id": slug,
			"title": title,
			"text": text
		}

		this.postData(pageData)
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

export default Pages