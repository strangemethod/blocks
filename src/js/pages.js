/*
 * Sends data to express app to write JSON data for pages.
 */
class Pages {
	constructor () {
		this.endpoint = 'http://localhost:4000/pages';
		this.pageButton = document.getElementById('addPage');

		this.bindEventListeners();
	}

	bindEventListeners() {
		if (this.pageButton) {
			this.pageButton.addEventListener('click', () => {
				this.postPage();
			});
		}
	}

	postPage() {
		const pageData = {
	    "id": "page-2",
	    "title": "Page 2",
	    "text": "This is a new page."
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
		.then(function(res){ console.log(res) })
		.catch(function(res){ console.log(res) })
	}
}

export default Pages