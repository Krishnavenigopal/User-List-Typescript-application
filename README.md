# How to setup run and test this Typescript application

## Setting up Application

# To set up this application, 
    1. Clone the repo to your system and install npm , typescript etc using the following commands 
### `npm install`  
### `npm install -g typescript` 

    2. The package.json has all the required dependencies specified so that npm i will install all teh required dependencies  

    Now go to the users folder and type npm start to start the application. 

### `npm start`

Runs the app in the development mode. \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 


The page will reload if you make edits.
You will also see any lint errors in the console. 

# To test application

## unit testing of entire application

### `npm test`

Launches the test runner in the interactive watch mode. 
Here jest testing is being used. There are two test files one for app and other for userlist compoenet. 
It should pass all tests the the below screenshot shown.

![alt text](<complete unit test pass screenshot.PNG>)

## Cypress end to end testing of entire application

Prerequisite: Install cypress to your application . 
Also make necessary changes to the tscinfig and package,json file( Here i have already made the required changes like type specification, babel preset issues resolving etc). 
I have added 2 cypress files for end to end testing of application. app spec and user spec. 
Now run the following command to view the cypress tests for entire application. 
Make sure your app is running when you run cypress test.  
### `npx cypress run`

If everything goes good, the cypress test shoould show the following pass result:

![alt text](<Cypress end toend test success screen shot.PNG>)

# Application work flow:

The application has an App component from which we navigate to Userlist component. 
The user list component, lists the users with their names and address. 
The name field has a tooltip which shows to select the name section to view more details like album and photo of that particular user. 
On selecting, the name field backgroud color changes and it expands with album title and photo information. 
At a time one user details can be seen. 

Also a filter input section is provided at the top which filters the names of all the users based on the value entered at the input. 
Pagination feature is also added and currently items per page is hard coded with 10 as shown in the question. 

The output screen shots of the application is shwon below. 

![alt text](<Working app photo 1.PNG>)  



![alt text](<working app photo 2.PNG>)

# Build the application
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

