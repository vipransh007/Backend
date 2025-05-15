import express from 'express'

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/products', (req, res) => {
    const products = [
        {
            "id": 1,
            "name": "table wooden",
            "price": 200,
            "image": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id": 2,
            "name": "leather sofa",
            "price": 450,
            "image": "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id": 3,
            "name": "modern chair",
            "price": 120,
            "image": "https://images.pexels.com/photos/276534/pexels-photo-276534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id": 4,
            "name": "bookshelf oak",
            "price": 180,
            "image": "https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            "id": 5,
            "name": "coffee table",
            "price": 150,
            "image": "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
    ]

    if(req.query.search){
       const filterProducts = products.filter(products => 
        products.name.includes(req.query.search))
        res.send(filterProducts);
        return
    }

    setTimeout(() => {
        res.send(products);
    }, 3000)
})


app.listen(port, (req, res) => {
    console.log(`Servere Running On Port ${3000}`);
})
