const express = require ('express')
const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, ()=> {
    console.log(`express server running on ${PORT}`)
})

// Be Polite, Greet the User
app.get ('/greetings/:username', (req,res) => {
    const username = req.params.username
    res.send(`Hello there, ${username}! Nice to see you.`)
    })

// Rolling the Dice
app.get ('/roll/:number', (req,res) => {
    const number = req.params.number

    const num = Number(number)
    if (isNaN(num)) {
        return res.send('You must specify a number.')
    }

    const randomRoll = Math.floor(Math.random() * (num + 1))
    res.send(`You rolled a ${randomRoll}!`)
})

// I want THAT One!
app.get ('/collectibles/:index', (req,res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ]
const index = Number(req.params.index)

if (index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!')
}

const item = collectibles[index]
res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`) 
})

//Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

// this starts with full list
app.get('/shoes', (req, res) => {
    let filteredShoes = shoes; 

    // Filter by min-price - EX = localhost:3001/shoes?min-price=100
    if (req.query['min-price']) {
        const minPrice = Number(req.query['min-price'])
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice)
    }

    // Filter by max-price - EX = localhost:3001/shoes?max-price=300
    if (req.query['max-price']) {
        const maxPrice = Number(req.query['max-price'])
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice)
    }

    // Filter by type if specified - EX = localhost:3001/shoes?type=sneaker
    if (req.query.type) {
        const type = req.query.type.toLowerCase() // Normalize to lower case
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type)
    }

    // Respond with the filtered list of shoes - EX = localhost:3001/shoes
    res.json(filteredShoes)
})
