let myLibrary = []

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
    let currentBookRef
    let body = document.querySelector("body")
    let booksContainer = document.createElement("div")
    booksContainer.classList.toggle("books-container")
    body.appendChild(booksContainer)
    for (let i = 0; i < arr.length; i++){
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
let body = document.querySelector("body")
body.appendChild(newBtn)

function addNewBook () {
    let dialog = document.createElement("dialog")
    body.appendChild(dialog)
    let form = document.createElement("form")
    form.setAttribute("action", "#")
    form.setAttribute("method", "get")
    //You will have to manually create labels and inputs elements, and use input type of "radio" for the user to choose - if the book was read or not.
}