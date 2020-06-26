const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {

return pool.query(`
  SELECT * FROM users
  WHERE email = $1;
  `, [email.toLowerCase()])
  .then(res => {
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      return null
    }
  });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1;
  `, [id])
  .then(res => {
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      return null
    }
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  return pool.query(`
    INSERT INTO users 
    (name, email, password)
    VALUES ($1, $2, $3);
  `, [user.name, user.email, user.password]);

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

    return pool.query(`
    SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;    
    `, [guest_id, limit])
    .then(res => res.rows);

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  //owner id filter
  if (options.owner_id) {
    
    if (queryParams.length) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }

    queryParams.push(`${options.owner_id}`);
    queryString += `owner_id = $${queryParams.length} `;   
  }

  //minimum price per night filter
  if (options.minimum_price_per_night) {
    
    if (queryParams.length) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }

    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `cost_per_night >= $${queryParams.length} `;   
  }

  //maximum price per night filter
  if (options.maximum_price_per_night) {
    
    if (queryParams.length) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }

    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `cost_per_night <= $${queryParams.length} `;   
  }

  // minimum rating filter
  if (options.maximum_price_per_night) {
    
    if (queryParams.length) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }

    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `cost_per_night <= $${queryParams.length} `;   
  }

  queryString += 'GROUP BY properties.id ';

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;

  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
