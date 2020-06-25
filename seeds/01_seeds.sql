INSERT INTO users (name, email, password) 
VALUES ('Mario Speedwagon','sriha@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Petey Cruiser','malvar@optonline.net','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Anna Sthesia','nasor@comcast.net','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Paul Molive','ghaviv@me.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Anna Mull','hampton@aol.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Gail Forcewind','vsprintf@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Paige Turner','pthomsen@comcast.net','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bob Frapples','smeier@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code) 
VALUES
(1, 'Speed Lam','descriptions', 'https//www.google.com', 'https//www.google.ca', 'Canada', '7272', 'Calgary', 'AB', 'T2N 0A2'),
(2, 'Blank Corner','descriptions', 'https//www.google.com', 'https//www.google.ca', 'Canada', '7272', 'Calgary', 'AB', 'T2N 0A2'),
(3, 'Habit Mix','descriptions', 'https//www.google.com', 'https//www.google.ca', 'Canada', '7272', 'Calgary', 'AB', 'T2N 0A2');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES
('2020-09-11', '2020-11-12', 1, 1),
('2020-09-11', '2020-11-12', 2, 2),
('2020-09-11', '2020-11-12', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES
(1, 1, 1, 4, 'messages'),
(1, 1, 1, 4, 'messages'),
(1, 1, 1, 4, 'messages');
