export default `
CREATE TABLE IF NOT EXISTS roles (
   _id serial PRIMARY KEY,
   type VARCHAR (255) UNIQUE NOT NULL
 );
 
 CREATE TABLE IF NOT EXISTS users (
   _id serial PRIMARY KEY, 
   username VARCHAR (255) UNIQUE NOT NULL,
   role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles (_id),
   access_key_id INT,
    FOREIGN KEY (access_key_id)
    REFERENCES access_keys (_id)
);
 
 CREATE TABLE IF NOT EXISTS access_keys (
   _id serial PRIMARY KEY,
   value VARCHAR (255) UNIQUE NOT NULL
);
 
 CREATE TABLE IF NOT EXISTS sexes (
   _id serial PRIMARY KEY,
   type VARCHAR (255) UNIQUE NOT NULL
 );
 
 CREATE TABLE IF NOT EXISTS size_chart_clothes(
   _id serial PRIMARY KEY,
   eu float NOT NULL,
   uk float NOT NULL,
   usa float NOT NULL,
   sex_id INT,
    FOREIGN KEY (sex_id)
    REFERENCES sexes (_id),
   international VARCHAR (255) NOT NULL,
   bustCm float NOT NULL,
   bustInch float NOT NULL,
   waistCm float NOT NULL,
   waistInch float NOT NULL,
   hipsCm float NOT NULL,
   hipsInch float NOT NULL
 );

 CREATE TABLE IF NOT EXISTS size_chart_shoes(
   _id serial PRIMARY KEY,
   eu float NOT NULL,
   uk float NOT NULL,
   usa float NOT NULL,
   sex_id INT,
    FOREIGN KEY (sex_id)
    REFERENCES sexes (_id),
   cm float NOT NULL,
   inch float NOT NULL
 );

 CREATE TABLE IF NOT EXISTS size_chart_shoes_reebok(
   _id serial PRIMARY KEY,
   eu float NOT NULL,
   uk float NOT NULL,
   usa float NOT NULL,
   ru float NOT NULL,
   sex_id INT,
    FOREIGN KEY (sex_id)
    REFERENCES sexes (_id),
   cm float NOT NULL,
   inch float NOT NULL,
   created_date date DEFAULT now(),
   expired_date date NOT NULL
 );

 CREATE TABLE IF NOT EXISTS size_chart_shoes_adidas(
   _id serial PRIMARY KEY,
   eu VARCHAR (255) NOT NULL,
   uk float NOT NULL,
   usa float NOT NULL,
   ru float NOT NULL,
   sex_id INT,
    FOREIGN KEY (sex_id)
    REFERENCES sexes (_id),
   cm float NOT NULL,
   inch float NOT NULL,
   created_date date DEFAULT now(),
   expired_date date NOT NULL
 );
 
 CREATE TABLE IF NOT EXISTS size_chart_clothes_reebok(
   _id serial PRIMARY KEY,
   ru float NOT NULL,
   eu VARCHAR (255) NOT NULL,
   bustcm float NOT NULL,
   bustinch float NOT NULL,
   waistcm float NOT NULL,
   waistinch float NOT NULL,
   hipscm float NOT NULL,
   hipsinch float NOT NULL,
   sex_id INT,
    FOREIGN KEY (sex_id)
    REFERENCES sexes (_id),
   created_date date DEFAULT now(),
   expired_date date NOT NULL
 );
 
 CREATE TABLE IF NOT EXISTS size_chart_clothes_adidas(
   _id serial PRIMARY KEY,
   ru float NOT NULL,
   eu VARCHAR (255) NOT NULL,
   bustcm float NOT NULL,
   bustinch float NOT NULL,
   waistcm float NOT NULL,
   waistinch float NOT NULL,
   hipscm float NOT NULL,
   hipsinch float NOT NULL,
   sex_id INT,
    FOREIGN KEY (sex_id)
    REFERENCES sexes (_id),
   created_date date DEFAULT now(),
   expired_date date NOT NULL
 );
 `;
