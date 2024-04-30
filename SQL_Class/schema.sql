CREATE TABLE user (
    id varchar(50) Primary Key,
    username varchar(50),
    email varchar(50) UNIQUE NOT NULL,
    password varchar(50) NOT NULL

)