const library = [];

function Book(name, author) {
	if (!new.target) {
		throw Error(`Didn't use 'new' operator!`);
	}
	this.id = self.crypto.randomUUID;
	this.name = name;
	this.author = author;
}
