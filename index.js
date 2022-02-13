const restaurants = require('./restaurants.json')
const menus = require('./menus.json')

const express = require('express')
const app = express()
const port = process.env.PORT

const models = require('./models.js')

 app.use(express.json())

// Kommaa jos teet lokaalisti:
/*
app.use(express.static(path.join(__dirname, 'build')))
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
*/
 

  app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
/*
app.use(express.static(path.join(__dirname, 'build')))*/

app.get('/', (req, res) => {
  res.send("Home")
});

app.get('/restaurants', (req, res) => {
  models.getRestaurants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

  app.get('/menus/:id', (req, res) => {
    console.log(req.params.id)
    models.getMenuById(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

  app.get('/menus', (req, res) => {
    res.send(menus)
  });

/*
app.get('/restaurants', (req, res) => {
    console.log('api')
  models.getRestaurants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/menu', (req, res) => {
    console.log("req"+JSON.stringify(req.body))
    models.getMenuById(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
*/
  app.listen(port, () =>
  console.log(`App listening on port ${port}`),
);