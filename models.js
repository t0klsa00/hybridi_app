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

  const getMenuById = (conn_id) => {
    return new Promise(function(resolve, reject) {
      console.log(conn_id)
      const { id } = conn_id
      console.log("id"+id)
      client.query("SELECT * FROM menus WHERE conn_id = $1", [id], (error, results) => {
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