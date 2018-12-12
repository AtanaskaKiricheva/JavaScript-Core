class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        if (room !== 'livingRoom' && room !== 'bedRoom' && room !== 'closet') {
            throw (`Cannot have book shelf in ${room}`);
        }
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.shelfCapacity = shelfCapacity;
    }

    addBook(bookName, bookAuthor, genre) {
        if (this.shelf.length >= this.shelfCapacity) {
            this.shelf.shift();
        }
        if (genre) {
            this.shelf.push({bookName, bookAuthor, genre})
        } else {
            this.shelf.push({bookName, bookAuthor});
        }
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
    }

    throwAwayBook(bookName) { //remove book by given book name
        this.shelf = this.shelf.filter(book => book.bookName !== bookName)
    }

    showBooks(genre) { //print all books with genre but don't remove other books
        let filtered = this.shelf.filter(x => x.genre === genre);
        filtered = filtered.map(m => " \uD83D\uDCD6 " +m.bookAuthor + " - "+'"' + m.bookName+'"').join("\n");
        return  `Results for search "${genre}":\n`+filtered;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    toString() {
        if (this.shelf.length > 0) {
            let booksStr = this.shelf.map(m => " \uD83D\uDCD6 " + '"' + m.bookName + '"' + ' - ' + m.bookAuthor).join("\n");
            return '"' + this.shelfGenre + '" shelf in ' + this.room + ' contains: \n' + booksStr;
        } else {
            return "It's an empty shelf"
        }
    }
}
