INDEX
Introduction……………………………….. 4

Backend Functionality…………………... 4
2.1. Application…………………………… 5
2.2. Routes………………………………... 6
2.3. Controllers…………………………… 7
2.4. Model…………………………………. 8
2.5. Database……………………………... 9
2.6. Initialization…………………………. 10

Frontend Functionality………………….. 11
3.1. Design and Dynamic Generation…… 11
3.2. Dynamic Behavior………………….. 12

Future Uses and Possible Improvements… 13

1. Introduction.
   The sticker tracking API is a great tool that allows users to track and manage their World Cup sticker collection.
   With this, users can see all the stickers they own, the ones they don't have, and the ones they have duplicates of, giving them a complete view of their collection at all times.

It features an easy-to-use interface that allows users to make queries through different endpoints. These endpoints include functions to add stickers to a collection, reset the quantity possessed, and obtain statistics about a user's collection, such as the number possessed of each.

Developers can customize the API to fit the specific needs of their platform or application, meaning endpoints and functions can be added or removed as needed.

In summary, the World Cup sticker tracking API is a powerful tool for soccer fans and sticker collectors. With its easy-to-use interface, it is an ideal choice for anyone wanting to keep a complete track of their World Cup sticker collection.

2. Backend Functionality.
   The API uses a PostgreSQL database to store information about the World Cup stickers, including details about the stickers, players, and represented countries, as well as the quantity possessed of each, their player number, ID, a boolean value about possession status, and an image for each player.

2.1. Application.
This program uses the Express.js framework to create a RESTful API that handles World Cup sticker data.
Express.js is the most popular backend framework for Node.js and is a significant part of the JavaScript ecosystem.
It is designed to build single-page, multi-page, and hybrid web applications and has become the standard for developing backend applications with Node.js.
In the app.js file, the necessary dependencies are imported, including the Figurita model that defines the structure of the sticker table in the database.

An instance of the Express application is then created, the EJS template engine is configured to render views, and the route for serving static files is established.

Next, the routes that interact with the database are defined. The '/' route responds to a GET request and returns a view that shows all stickers and their quantities, ordered by ID.
The '/figuritas/
/cantidad' route responds to a PUT request and updates the quantity of a sticker in the database. If the quantity is greater than or equal to 1, it marks that the user has the sticker.
The '/reset' route responds to a POST request and resets the quantity and status of all stickers in the database.

If any server error occurs, an error response with a descriptive message is sent to the client. Finally, the Express application is exported for use in other modules.

2.2. Routes.
Each route is associated with a controller function that handles requests for that specific route.

GET /figuritas: This route is used to get all stickers stored in the database. This route is associated with the getFiguritas function in the sticker controller.

GET /figuritas/:id: This route is used to get a specific sticker by its ID. This route is associated with the getFigurita function in the sticker controller.

POST /figuritas: This route is used to create a new sticker in the database. This route is associated with the createFiguritas function in the sticker controller.

PUT /figuritas/
/cantidad: This route is used to update the quantity of a sticker by its ID. This route is associated with the updateFiguritaCantidad function in the sticker controller.

DELETE /figuritas/:id: This route is used to delete a sticker by its ID. This route is associated with the deleteFiguritas function in the sticker controller.

PUT /figuritas: This route is used to reset all stickers in the database. This route is associated with the resetearFiguritas function in the sticker controller.

Each route is defined using the Express router object and the corresponding route function (get, post, put, or delete). Routes that include a dynamic parameter (such as /
) allow the controller to access that parameter using req.params.id.

Once all routes are defined, the router is exported for use in other modules.

2.3. Controllers.
Controllers are an essential part of the Model-View-Controller pattern architecture in web applications. Their primary function is to handle user requests and provide an appropriate response.

Each controller follows a similar structure, beginning with a try-catch block to handle errors and a series of operations to interact with the database through the Figurita model. Depending on the request, controllers can read, update, create, or delete records in the database and provide an appropriate response to the user in JSON format.

In this case, we work with the following controllers:

updateFiguritaCantidad: This controller is used to increment the quantity of a sticker. It first finds the sticker by its ID and then increments the value in the "cantidad" table and saves it.

getFiguritas: This controller is used to get all stickers. It finds all stickers and orders them in ascending order.

getFigurita: This controller is used to get a sticker by its ID.

createFiguritas: This controller is used to create a new sticker (for possible future use). It defines the necessary parameters and creates a new sticker.

deleteFiguritas: This controller is used to delete a sticker by its ID (for possible future use). It finds the sticker by its ID and deletes it.

resetearFiguritas: This controller is used to reset the "cantidad" value to 0 and the "tengo" value to false. It updates the "cantidad" and "tengo" values where {} (all).

2.4. Model. (NOT USED ANYMORE)
The data model for the sticker table is defined using Sequelize.
Sequelize is an ORM (Object-Relational Mapping) library for Node.js that allows interaction with relational databases.

In the model, the structure of the database table is specified, i.e., the fields the table will have and the data types of those fields.

In this case, the stickers table has six fields: id, nombre, país, número, tengo, cantidad, and imagen.

Each field has an associated data type, such as INTEGER for id and número, STRING for nombre, país, and imagen, and BOOLEAN for tengo. Other properties for the fields are also established, such as whether they will be default values, primary keys, auto-incremented, and whether null values are allowed.

It is specified that the created_At and updated_At columns will not be created by default in the table through the timestamps: false option, meaning the creation and update dates of each row will not be automatically recorded.

2.5. Database.
Supabase is an open-source alternative to Firebase that provides a suite of tools to manage databases, authentication, and more. It is built on top of PostgreSQL, which allows for a robust and scalable database management system.

In this case, the "figuritas" database has been created using Supabase, leveraging its PostgreSQL instance. This database contains a table called "figuritas," which stores information related to World Cup stickers.

The table contains six columns: "id," "nombre," "pais," "numero," "tengo," "cantidad," and "imagen." The "id" column is the primary key of the table and is used to uniquely identify each record in the table. The "nombre," "pais," "numero," "tengo," "cantidad," and "imagen" columns store related information, such as name, country, number, possession status, quantity, and an image of each player.

Supabase provides an efficient and scalable way to store and manage information related to World Cup stickers. It also offers real-time capabilities, making it easy to sync and update sticker information as users interact with the API.

An instance of the Sequelize class is created to establish a connection with the Supabase PostgreSQL database. The instance is called sequelize and takes three arguments: the database name, username, and password. Some options are then specified, such as the host address and the database dialect (in this case, 'postgres'). This setup ensures that the API can efficiently interact with the database to perform CRUD operations on the sticker data.

2.6. Initialization.
The application is started using an index.js file.
This code is the main function of the application. Here, the database connection is established through Sequelize, the models are synchronized with the database, and the server is started.

First, the main function uses sequelize.sync() to synchronize the models defined in the database. The {force: false} option indicates that the database tables should not be forcibly dropped and recreated.

Next, the routes defined in figuritasRoutes are added to the express app.

Finally, the server is started with app.listen(PORT). The application will listen on the port specified in PORT, or on port 3000 by default if no port is specified.
If everything works correctly, a message indicating that the server is running on the specified port will be printed to the console. In case of errors, the exception is caught and an error message is displayed in the console.

3. Frontend Functionality.
   On the client side, a composition of front-end files has been created to generate a friendly and easy-to-understand interface.
   This has been done using EJS, JavaScript, and CSS.

EJS (Embedded JavaScript) is a template engine for JavaScript that allows dynamic generation of HTML and other types of files that are sent to the browser.

3.1. Design and Dynamic Generation.
Using EJS and CSS, an attractive design has been created for the user.
In the EJS files, a dynamic template has been created to generate stickers with their respective names, countries, numbers, possession status, quantity, and images.
Each sticker has an input that allows users to add or remove the number of stickers owned and a button to reset their collection.

3.2. Dynamic Behavior.
To achieve the dynamic behavior of the stickers, an EJS template file has been used, which loops through the stickers obtained from the database and renders them in HTML format.
JavaScript has been used to make PUT requests to the API and update the quantity of stickers in the database.

4. Future Uses and Possible Improvements.
   Although the API already fulfills its purpose of managing World Cup sticker collections, there are some additional features and improvements that can be made in the future:

User Authentication: Adding an authentication system that allows each user to have their own collection and keep it private.
Search and Filter: Adding a search and filter function so that users can easily find specific stickers within their collection.
Statistics and Progress: Adding a statistics and progress page where users can see how many stickers they have, how many they need, and how many they have duplicates of.
Mobile Version: Developing a mobile version of the app to make it more accessible to users on different devices.
Sticker Trading: Adding a sticker trading system where users can exchange duplicate stickers with other users to complete their collection.
In summary, the World Cup sticker tracking API is a powerful and flexible tool, and by implementing these improvements, it can become an even more useful tool for sticker collectors worldwide.
