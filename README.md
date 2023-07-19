### SQL TypeORM sample

### Installation


`npm install`

### Running

This example requires docker or a local MySQL installation.  If using a local MySQL database, see `app.module.ts` for credentials, and make sure there are matching credentials in the database and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`npm run start`

1. Connect with MySQL Workbench
Make sure you have MySQL Workbench installed on your machine.
Open MySQL Workbench and create a new connection to your local MySQL server or a remote server. Note down the connection details, including host, port, username, and password, as you'll need them later.
2. Add Dummy Users to the Database
In your MySQL Workbench, create a new database for the login module.

Use the database query editor to insert some dummy user data into the database. For example:

sql
Copy code
USE login_module;

INSERT INTO users (username, email, password) VALUES

('user1', 'user1@example.com', '$2b$10$eY5./Y1kS/x3Skfot.DrK.m5F9gT.1vRi3VqsYpztLO0nHBGoPh5'),

('user2', 'user2@example.com', '$2b$10$0WNUztdYyTzQ8Nz1fqv3sulXdpxMIJAwG8gxjXTKzQQfLHvjLJtui');


Replace the login_module with your actual database name. The password field should be encrypted using bcrypt. The above example shows encrypted passwords for 'password1' and 'password2'.



3. Start the Nest.js Server

Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

Navigate to the project root directory (where the package.json file is located) using the terminal or command prompt.

Install the project dependencies by running npm install.

Start the Nest.js server by running npm run start or npm run start:dev for development mode.

The server will now be running on port 3000.


4. Access the Login Module

With the Nest.js server running, you can access the login module through your browser at http://localhost:3000 (or the appropriate URL based on your deployment setup).