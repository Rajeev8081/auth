# auth
Back-End Development:
a. Use Express.js to handle HTTP requests and responses.
b. Set up a MongoDB database to store user information securely.
c. Implement user registration functionality by validating and saving user data to the database.
d. Develop a login mechanism that verifies user credentials against the stored data.
e: Generate JWT token and Store it into cache
Security:
a. Hash and salt user passwords before storing them in the database to enhance security.
b. Protect sensitive routes and ensure that only authenticated users can access them.
Documentation
a. Provide clear and concise documentation on how to set up and run the application.



Description & Api Endpoint:

Backend:
“/signup” → create a signUp routes which takes {name,username,bio,email,password} as response
and hash password and then store data in database
“signupDataValidate” → create a middleware which checks if user has provided required data or not
based on that send response or move further
“/login” → create a login routes which takes {user,password} as response, generate jwt token and set to
cookie and response with success message
“loginDataValidate” → create a middleware which checks if user has provided required data or not
based on that send response or move further
Assignment

Requirements:
“/” → create home route which will authenticate(hint: use authenticateUser middleware to achieve it )
user and will send user data
”authenticateUser” → create authenticate user which verify token given by user through cache then
then proceed based on the output
