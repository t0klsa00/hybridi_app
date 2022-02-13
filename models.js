const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }})

client.connect()

const getRestaurants = () => {
    return new Promise(function(resolve, reject) {
      client.query('SELECT * FROM restaurants', (error, results) => {
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
      client.query("SELECT * FROM menus WHERE owner_id = $1", [id], (error, results) => {
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