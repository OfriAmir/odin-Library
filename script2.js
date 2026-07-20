let myLibrary = []
let newBook = false
let body = document.querySelector("body")
let booksContainer = document.createElement("div")
booksContainer.classList.toggle("books-container")
body.appendChild(booksContainer)
let bookCardsDisplayed = 0

function Book(title, author, numberOfPages, readAlready){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
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
    //When adding or removing a card, displayBooks will be called, removing all cards and creating new display that will suit the altered library.
    if (bookCardsDisplayed > 0){
        let allCards = document.querySelectorAll(".book-card")
        allCards.forEach(item => {
            booksContainer.removeChild(item)
        })
        bookCardsDisplayed = 0
    }
    
    let currentBookRef

    // if (arr.length > 1){
    //     console.log(arr.length)
    //     let i = arr.length - 1
    // } else {
    //     console.log("hekk")
    //     let i = 0
    // }
    for (let i = 0; i < arr.length; i++){
        // if (newBook){
        //     i = arr.length - 1
        //     newBook = false
        // }
        myLibrary[i].ref = document.createElement("div")
        currentBookRef = myLibrary[i].ref
        currentBookRef.classList.toggle("book-card")
        booksContainer.appendChild(currentBookRef)
        // let infoList = document.createElement("ul")
        let isFirstIteration = true
        let infoList
        for (let key in myLibrary[i]){
            let bookInfo
            // let bookInfo = document.createElement("li")
            if (key == "title"){
                bookInfo = document.createElement("h2")
                currentBookRef.appendChild(bookInfo)
                bookInfo.textContent = `${myLibrary[i][key]}`
            }
            if (key == "author"){
                bookInfo = document.createElement("h3")
                currentBookRef.appendChild(bookInfo)
                bookInfo.textContent = `${myLibrary[i][key]}` 
            }
            if (key == "numberOfPages") {
                infoList = document.createElement("ul")   
                currentBookRef.appendChild(infoList)
                isFirstIteration = false
            }
            if (key == "numberOfPages"){ 
                bookInfo = document.createElement("li")
                bookInfo.textContent = `Pages: ${myLibrary[i][key]}`
                infoList.appendChild(bookInfo)
            }
            if (key == "readAlready"){
                bookInfo = document.createElement("li")
                if (myLibrary[i][key]) bookInfo.textContent = `Finished`
                else bookInfo.textContent = `Not Finished`
                infoList.appendChild(bookInfo)
            }
            bookCardsDisplayed ++

            // else if (key == "author"){
            //     bookInfo.textContent = `${myLibrary[i][key]}`
            // } else if (key == "numberOfPages"){
            //      bookInfo.textContent = `Pages: ${myLibrary[i][key]}`
            // } else if (key == "readAlready"){
            //     if (myLibrary[i][key]) bookInfo.textContent = `Finished`
            //     else bookInfo.textContent = `Not Finished`
            // }
            
            // if (!document.querySelector("ul")) currentBookRef.appendChild(infoList)
            // if (key == "id" || key == "ref") continue
            
            // infoList.appendChild(bookInfo)
            // if (key == "author"){
            //     bookInfo.textContent = `${myLibrary[i][key]}`
            // } else if (key = numberOfPages) {
            //    bookInfo.textContent = `Pages:${myLibrary[i][key]}` 
            // }
            
        }
        // let removeButton = document.createElement("button")
        // removeButton.classList.toggle("remove-btn")
        // removeButton.textContent = "Remove"
    }
}



addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")
addBookToLibrary("h","hfa afafa fafafaaf aafafa fafaafafaaf aafaf aa","h","h")


displayBooks(myLibrary)

let newBtn = document.createElement("button")
newBtn.textContent = "New"
newBtn.classList.toggle("new-button")
body.appendChild(newBtn)

const dialog = document.querySelector(".form-dialog")
const cancelBtn = document.querySelector(".cancel-btn")
const addBtn = document.querySelector(".add-btn")
const titleInput = document.querySelector(".title-input")
const authorInput = document.querySelector(".author-input") 
const pagesInput = document.querySelector(".pages-input") 
const readInput = document.querySelector(".read-input")
newBtn.addEventListener('click', () => {
    dialog.showModal()
})
cancelBtn.addEventListener('click', () => {
    dialog.close()
})
addBtn.addEventListener('click', () => {
    addNewBook()
    dialog.close()
})
function addNewBook () {
    let title = titleInput.value
    let author = authorInput.value
    let pages = pagesInput.value
    let read = readInput.value
    addBookToLibrary(title, author, pages, read)
    // newBook = true
    displayBooks(myLibrary)
}

function removeBook ()