const bookListEl = document.querySelector(".book-list");

function Book(title, author, noOfPages, status) {
	if (!new.target) {
		throw Error(
			"You must use the 'new' operator to call the Book constructor",
		);
	}
	this.id = self.crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.status = status;
	this.changeStatus = function (newStatus) {
		this.status = newStatus;
	};
}

const book1 = new Book("Book1", "Author1", 123, "read");
const book2 = new Book("Book2", "Author2", 234, "unread");
const book3 = new Book("Book3", "Author3", 345, "read");

const library = [book1, book2, book3];

function displayBook(book) {
	const bookSnippetEl = document.createElement("section");
	bookSnippetEl.dataset.id = book.id;
	bookSnippetEl.classList.add("snippet");
	bookListEl.appendChild(bookSnippetEl);

	const bookDetails = ["title", "author", "noOfPages"];

	for (let x of bookDetails) {
		const bookDataEl = document.createElement("div");
		bookDataEl.dataset.id = book.id; // check if this is necessary
		bookDataEl.classList.add(`book-${x}`);
		bookDataEl.innerText = book[x];
		bookSnippetEl.appendChild(bookDataEl);
	}

	const changeStatusBtn = document.createElement("button");
	changeStatusBtn.type = "button";
	changeStatusBtn.innerText = book.status;
	changeStatusBtn.dataset.id = book.id;
	bookSnippetEl.appendChild(changeStatusBtn);
	changeStatusBtn.addEventListener("click", function () {
		const currentStatus = book.status;
		let newStatus = undefined;
		if (currentStatus == "read") {
			newStatus = "unread";
		} else if (currentStatus == "unread") {
			newStatus = "read";
		}
		library.forEach((ele) => {
			if (book.id == ele.id) {
				ele.changeStatus(newStatus);
			}
		});
		this.textContent = newStatus;
	});

	const deleteBtnEl = document.createElement("button");
	deleteBtnEl.type = "button";
	deleteBtnEl.innerText = "delete";
	deleteBtnEl.dataset.id = book.id;
	bookSnippetEl.appendChild(deleteBtnEl);
	deleteBtnEl.addEventListener("click", () => {
		const id = book.id;
		const elements = document.querySelectorAll(`[data-id="${id}"]`);
		elements.forEach((element) => {
			element.remove();
		});
		const library_idx = library.findIndex((ele) => ele.id == id);
		library.splice(library_idx, 1);
	});
}

function displayAvailableBooks() {
	if (library.length == 0) {
		return;
	}
	library.forEach((book) => {
		displayBook(book);
	});
}

displayAvailableBooks();

function getNewBook() {
	const bookInfoEls = document.querySelectorAll(".book-info");

	const title = bookInfoEls[0].value;
	const author = bookInfoEls[1].value;
	const noOfPages = bookInfoEls[2].value;
	const status = bookInfoEls[3].value;

	const newBook = new Book(title, author, noOfPages, status);
	for (let key in newBook) {
		if (newBook[key] == "") {
			alert(`${key} is empty`);
			return;
		}
	}

	bookInfoEls.forEach((el) => {
		el.value = "";
	});

	return newBook;
}

function addNewBook() {
	const newBook = getNewBook();
	if (newBook) {
		library.push(newBook);
		displayBook(newBook);
	}
}

const addBtnEl = document.querySelector("#add-btn");
addBtnEl.addEventListener("click", addNewBook);

const formEl = document.querySelector("form");
const newBookBtnEl = document.querySelector("#new-book-btn");
const closeBtnEl = document.querySelector("#close-btn");
newBookBtnEl.addEventListener("click", () => {
	formEl.classList.remove("display-none");
});
closeBtnEl.addEventListener("click", () => {
	formEl.classList.add("display-none");
});
