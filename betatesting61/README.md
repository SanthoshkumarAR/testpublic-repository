# About the App

  The "ToDo" App is a simple application which will do basic CRUD operations. It allows to add and persist ToDos
  that you need to get done. As you complete different  tasks in todo list you can delete or edit them from the list.
  The  tasks in the todo list are stored in a database.

  - UI contains the following components:
    - A text box to get input from the user. The input is sent in a POST request to the  server component, which inserts the text to the database.
    - The list of To-do’s inserted in the database is displayed. This data is retrieved using GET service call to the server component.
    - Edit icon along with each To-do entry to update the input in the text box.
	  - On saving, this data is sent as a PUT request to the server component, which updates the text in the database.
	  - On cancelling, no operation takes place.
    - Delete icon with each To-do entry to delete the entry from database using the DELETE service call.



# AngularJS

AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. Angular's data binding and dependency injection eliminate much of the code you would otherwise have to write.

### Client File Structure
```
└── client
│      ├── assets
│      │   └── css
│      │   	    └── toDo.css
│      │   └── img
│      │   	    └── logo.png
│      ├── controllers
│      │   └── toDo.js
│      └── services
│      │   └── toDo.js
│      ├── tests
│      │   └── test.js
|      └── index.html
├── karma.conf.json
├── Gulpfile.js
├── manifest.yml
└── package.json

```
### Files related to AngularJS
The application folder structure is modular, so that our controller and all of our $http requests are in separate files. Having all of the functionality in different modules helps to understand the overall layout of the application, hence the re-use and testing of code is easy.

```
index.html  # Includes all the scripts and styles and contains the HTML code to render the To Do application.
```
**assets**
```
css         # Contains the styles information required for the UI
img         # Contains the static images which are displayed in the UI
```

**controller**
```
toDo.js     # This is the Angular module containing the button actions and assigning of scope variables. This has all the code to get, create, update or delete a to-do inside our service.
```

**services**
```
toDo.js     # This is the service module and is meant to interact with our Node API. All the service calls are present in this file. This ensures that we can test this code separate of our overall application.
```


### Unit Testing and Code Coverage

The unit tests in this application are written using jasmine and karma tools. In this project, gulp is the task runner used to execute all the test cases and code coverage.

```
karma.conf.js   # Contains the configuration for the karma tool to execute the jasmine test cases.
```
**tests**
```
test.js         # Contains all the test cases to test the CRUD operations present in the controller. It also tests all the actions of buttons and if the data is reflected appropriately in DOM elements.
```

In order to execute the UI Test cases, the following command must be executed in command prompt. This command uses the GulpFile present in the root folder of the project. It takes the configuration from karma.conf.json present in the root folder. This file contains the list of files to be included for testing and other plugin information.

```sh
$ gulp test_UI
```
After executing the above command, the test results will be displayed in the command prompt and the coverage report will be present in the *\client\tests\results\coverage* folder.
# Node Server
In this project, express module is used to create a server and the basic CRUD operations for a simple To Do application is given as node services. The following sections explain the technologies used and the usage of some of the important files present in the server code.


## Prerequisite Technologies

* *Cassandra* - <a href="http://cassandra.apache.org/download/">Download</a> and Install Cassandra - <a href="http://wiki.apache.org/cassandra/GettingStarted">Checkout their manual</a> if you're just starting.

### Linux
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.


For using ubuntu, this is the preferred repository to use...

```bash
$ curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get update
$ sudo apt-get install nodejs
```


### Windows
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.



### OSX
* *Node.js* -  <a href="http://nodejs.org/download/">Download</a> and Install Node.js or use the packages within brew or macports.

## Prerequisite packages

This application currently uses gulp as a build and test runner tool which needs to be installed globally.
```
$ npm install -g gulp
```
## Server File Structure
  ```
└── server
│       ├── config
│       │  └── node_starter_kit_config.json
│       ├── controllers
│       │  └── DBHandler.js
│       │  └── ToDoHandler.js
│       │  └── LogHandler.js
│       ├── tests
│       │  └── DBTest.js
│       │  └── server_test.js
│       └── vcap_parser
│       │  └── environment_parser.js
│       └── routes.js
├── app.js
├── Gulpfile.js
├── manifest.yml
└── package.json
```
**app.js**

This file contains the server object and is the base of the project. It is the starting point of the application and starts the server.
By default, the server listens at the port which is defined in the environment variable named *PORT*. If this is not defined, *3000* is taken as the default port.
The server port can be set to either the environment variable or some other value of choice.
  ```
    app.set('port', process.env.PORT || 3000);
  ```

  In case of malicious attacks or mistyped URLs, the error is handled and *404 Page Not Found Error* is thrown. 
  
    app.use(function (req, res) {
      res.status(404);
      res.send({error: 'Page Not found'});
      return;
    });
  


**route.js**

This file contains all the routes and matches them with the appropriate handler function.
The server code implements GET, POST, PUT, and DELETE services. The following sections explain the request and response JSON which is sent in this sample.


##### GET Request - Gets all To-dos

**Request URL:** 

    GET /api/todos

**Response:**  JSON object containing Array of all todos
```
{
  "status": "Success",
  "data": [
    {
      "id": "001fbbe7bd708a34624b47526cd6ac89",
      "task_name": "one"
    },
    {
      "id": "4d6153cf4bc3bdaf9c6c7eebf42d67a6",
      "task_name": "two"
    },
    {
      "id": "be3855e004dd5d74c802992c09ea8d28",
      "task_name": "three"
    }
  ]
}
```

##### POST Request - Creates a new To-do

**Request URL:**  
```
POST /api/todos/
```
**Request Body:**  

    {"task_name":"two"}

**Response:** 
The response is a JSON representation of a To-do with the id field
populated.
```
{
  "status": "Success",
  "data": {
    "id": "f76424cc41f1ee8c2682a37069098794",
    "task_name": "sample"
  }
}
```

##### PUT Request - Updates a To-do

  **Request URL:**   
  ```
  PUT /api/todos/[id]
```
**Request Body:**  

    {"task_name":"sample"}

**Response:** 
The response is a JSON representation of the updated To-do.
```
{
  "status": "Success",
  "data": {
    "id": "4d6153cf4bc3bdaf9c6c7eebf42d67a6",
    "task_name": "sample"
  }
}
```

##### DELETE Request - Deletes a To-do

  **Request URL:**  
  ```
  DELETE /api/todos/[id]
```
**Response:** 

The response is a JSON containing the *Success* message.

    {"status": "Success","data": "Deleted Successfully"}


### Cassandra

Apache Cassandra is a highly scalable, high-performance distributed database designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. It is a type of NoSQL database. The sample application provided performs basic CRUD operations, for managing data in a simple "To Do" application.



#### Files related to Cassandra

The crux of the DB operations are present in the DBHandler file, present in the controllers directory. The database connection establishment and the CRUD operations are given in this file. The "cassandra-driver" node module is used to connect to the database.

**controller**
```
DBHandler       # Database operations are done here.
LogHandler      # Logging operations are done here.
ToDoHandler     # Business logic like response handling and error handling operations are done here.
```

## Deploying the application

The Application can be run locally or deployed in cloud foundry and in both scenarios Cassandra service has to be integrated with the application.

### Deploying the application locally

In order to run the application locally, the *local_environment_parser.js* file, present in the *vcap_parser* directory, has to be changed according to the local DB information.

Replace the following line accordingly and rename the file to "environment_parser.js"

`    return  { contactPoints: ['localhost'], keyspace: 'keyspace_name'};
`

### Deploying to Cloud Foundry
The following denotes the steps required to deploy the application to PAAS. When deployed in the cloud foundry through starter kit, there are no changes to be done in the code. When deploying to the Cloud foundry manually, the node_starter_kit_config.json (present in the config folder) must contain the required “service instance name”  which was created in cloud foundry .

`  "service_name":"service_instance_name", `  // The service instance name created in cloud foundry 

##### Creating Cassandra DB service
In order to create a service instance for cassandra, the service broker must be created in the marketplace. Using this, an instance can be created which can be used in our application.
```sh
$ cf create-service service_name_in_marketplace service_plan service_instance_name 
$ cf bind-service app_name service_instance_name
```


##### Pushing the application to cloud foundry

The following command has to be executed to push the application to cloud foundry.

```sh
$ cf push <application name>
```
## Unit Testing And Code Coverage

In order to run the test cases and coverage the *gulp* task runner tool is used. The test cases are written in *mocha* and *gulp_mocha* module is used to execute the test cases.

To run the database test cases, the following command is executed in the command prompt/terminal

```
$ gulp test_DB
```
The output of the test cases is displayed in the terminal, displaying the number of cases passed and failed. The test cases are written to test the database for its structure and integrity.

To run the server test cases, the following command is executed.

```
$ gulp test_server
```

The output of the test cases along with code coverage is displayed in the terminal. These test cases test the response for all the requests by hitting the server. The coverage is present in the *server/test/results/coverage* folder. In order to view the coverage , the *index.html* file should be opened in browser.
