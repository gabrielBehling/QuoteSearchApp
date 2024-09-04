async function search(){
    let inputText = document.querySelector("#search-bar").value
    let url = `https://api.quotable.io/search/quotes?query=${inputText}&limit=10`
    let response = await fetch(url).then(res => res.json())

    console.log(response);

    if (response.statusCode == 422){ return }

    let results = response.results
    changeResults(results)
}

function createResultElement(author, quote = undefined){
    let div = document.createElement("div")
    div.classList.add("result")

    let authorElement = document.createElement("h4")
    authorElement.classList.add("author")
    let authorText = document.createTextNode(author)
    authorElement.appendChild(authorText)
    div.appendChild(authorElement)

    let quoteElement = document.createElement("p")
    quoteElement.classList.add("quote")
    let quoteText = document.createTextNode(quote)
    quoteElement.appendChild(quoteText)
    div.appendChild(quoteElement)

    return div
}

function changeResults(results){
    if(results.length == 0){
        document.querySelector("#results").innerHTML = "No quote was found"
        return
    }

    document.querySelector("#results").innerHTML = ''
    results.forEach(result => {
        let author = result.author
        let quote = result.content
        
        let resultElement = createResultElement(author, quote)
        document.querySelector("#results").appendChild(resultElement)
    });
}