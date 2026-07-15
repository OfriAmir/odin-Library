let myLibrary = []

function Book(title, author, numberOfPages, readAlready){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readAlready = readAlready;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, numberOfPages, readAlready){
    let book = new Book(title, author, numberOfPages, readAlready)
    myLibrary.push(book)
    return
}

function displayBooks(arr){
    let refArr = [] // array of all books references
    let currentBookRef
    let body = document.querySelector("body")
    let booksContainer = document.createElement("div")
    booksContainer.classList.toggle("books-container")
    body.appendChild(booksContainer)
    for (let i = 0; i < arr.length; i++){
        refArr[i] = {
            [arr[i]["title"]]: document.createElement("div")
        }
        currentBookRef = refArr[i][arr[i]["title"]]
        currentBookRef.classList.toggle("book-card")
        booksContainer.appendChild(currentBookRef)
    }
}

addBookToLibrary("h","h","h","h")

displayBooks(myLibrary)