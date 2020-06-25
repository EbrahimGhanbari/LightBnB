SELECT city, SUM(reservations.id) AS total_reservations
FROM properties
JOIN reservations ON properties.id = reservations.property_id
GROUP BY city
ORDER by total_reservations DESC;