const { Client } = require('pg')
const client = new Client({
  // kommaa jos teet lokaalisti
 /* connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
}*/

//unkommaa jos teet lokaalisti
user: 'local_u',
  host: 'localhost',
  database: 'restaurant_menu_db',
  password: '1234',
  port: 5432,
});


client.connect()

const getRestaurants = () => {
    return new Promise(function(resolve, reject) {
      client.query('SELECT * FROM restaurant', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getMenuById = (body) => {
    return new Promise(function(resolve, reject) {
      body = JSON.parse(JSON.stringify(body[0]))
      const { id } = body
      client.query("SELECT * FROM restaurant_menu WHERE owner_id = $1", [id], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows)
        resolve(results.rows)
      })
    })
  }

  module.exports = {
    getRestaurants,
    getMenuById
  }