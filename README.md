It has a Signup and Login form on its homepage.
New users can signup and already users can Login.
After login or signup users will be directed to a dashboard which only registed users can go as its a protected route.
On our dashboard there are two functionality 
- either to add an order by filling up the form.
- and to see all the orders made by a particular user

I have bult 3 POST and 1 GET API which is connected to the Mongodb database.
There is a LOGOUT functionality button on the dashboard which a user can click and kill the JWT token.
All the routes will be authenticated using JWT tokens.
Get Order and Add Order  - users need to be authorised in a middleware
The password is encypted before sending and storing to our Database.

Here is our HomePage

![image](https://github.com/kanishka-G/Signup/assets/74129331/8beabcd1-001c-4db8-9995-83d979a83696)

Here is the dashboard
![image](https://github.com/kanishka-G/Signup/assets/74129331/fa1e6366-2a70-42b0-b48b-adf1cd2b51e8)


Order details are fetched from the db when a get-order request is made for a particular user by provide it in the text feild.
Meanwhile the loggin user cannot change his userID in the dashboard to submit a order. 
Logout button is present on the bottom left.

![image](https://github.com/kanishka-G/Signup/assets/74129331/cc94a03e-ba54-41f2-a59c-3c7e4334b9c8)

