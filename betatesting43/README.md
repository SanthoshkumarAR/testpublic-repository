# About the App

  The "ToDo" App is created using Seneca framework in order to showcase a Microservice that will do Insert, Select, Update & Delete operations using a text box from the database.
. It allows to add and persist ToDos
  that you need to get done. As you complete different  tasks in todo list you can delete or edit them from the list.
  The  tasks in the todo list are stored in a database.

  - UI contains the following components:
    - A text box to get input from the user. The input is sent in a POST request to the server component, which inserts the text to the database.
    - The list of To-do’s inserted in the database is displayed. This data is retrieved using GET service call to the server component.
    - Edit icon along with each To-do entry to update the input in the text box. 
	  - On saving, this data is sent as a PUT request to the server component, which updates the text in the database.
	  - On cancelling, no operation takes place.
    - Delete icon with each To-do entry to delete the entry from database using the DELETE service call.
  
  # KnockoutJS
Knockout is a JavaScript library that helps you to create rich, responsive display and editor user interfaces with a clean underlying data model. Any time you have sections of UI that update dynamically (changing depending on the user’s actions or when an external data source changes), KO helps you implement it more simple and maintainable.

### Client File Structure
```
└── client
│      ├── assets
│      │   └── css
│      │      └── toDo.css
│      │   └── img
│      │      └── logo.png
│      ├── controllers
│      │   └── toDo.js
│      ├── tests
│      │   └── test.js
|      └── index.html
├── karma.conf.json
├── Gulpfile.js
├── manifest.yml
└── package.json

```
### Files related to KnockoutJS 
The application folder structure is modular, so that our controller and all of our $http requests are in separate files. Having all of the functionality in different modules helps to understand the overall layout of the application, hence the re-use and testing of code is easy.

```
index.html  # Includes all the scripts and styles and contains the HTML code to render the To-Do application. Uses (http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.4.0.js) in script tag to use the functions of knockoutJS(version-3.4.0)
```
**assets**
```
css         # Contains the styles used for UI
img         # Contains the static images displayed in the UI
```
**controller**
```
toDo.js     # This is the knockout module containing the button actions and assigning of scope variables. This contains the code and functionalities to perform CRUD operations of the app.
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

### Linux
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *MySQL* - <a href="http://dev.mysql.com/downloads/os-linux.html">Download</a> and Install MySQL - <a href="http://dev.mysql.com/doc/">Checkout their manual</a> if you're just starting.

For using ubuntu, this is the preferred repository to use...

```bash
$ curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get update
$ sudo apt-get install nodejs
```


### Windows
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *MySQL* - Follow the great tutorial from the MySQL site - <a href="https://dev.mysql.com/downloads/windows/">"Install MySQL On Windows"</a>


### OSX
* *Node.js* -  <a href="http://nodejs.org/download/">Download</a> and Install Node.js or use the packages within brew or macports.
* *MySQL* - Follow the tutorial here - <a href="https://dev.mysql.com/downloads/mysql/">Install MySQL on OSX</a>

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
│       │  └── QueryConstants.json
│       ├── controllers
│       │  └── DBHandler.js
│       │  └── ToDoHandler.js
│       │  └── LogHandler.js
│       ├── tests
│       │  └── test.js
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


### MySQL

MySQL is a database system that runs on server and uses standard SQL. The data in MySQL database are stored in tables. A table is collection of related data, and it consists of columns and rows. The sample app provided performs basic CRUD operations, for managing data in a simple "To Do" app.
In this application the seneca plugins are used to connect to MySQL. The storage engine named "seneca-mysql-store" is used to persist data in MySQL.


#### Files related to MySQL

The crux of the DB operations are present in the DBHandler file, present in the controllers directory. The database connection establishment and the CRUD operations are given in this file.


**QueryConstant**   
This file contains the constant values of the store name and the initial queries (create table queries) to be called after connecting to the database. It is present in the config directory.

**DBHandler**   
Database operations are done here. The operations are done based on the events received from the ToDoHandler.

**LogHandler**      
Logging operations are done here.

**ToDoHandler**     
Business logic like response handling and error handling operations are done here. This file creates events for each action type which is caught by the DBHandler.


## Deploying the application

The Application can be run locally or deployed in cloud foundry and in both scenarios MySQL service has to be integrated with the application.

### Deploying the application locally

In order to run the app locally, the *local_environment_parser.js* file, present in the *vcap_parser* directory, has to be changed according to the local DB information.

Replace the following line accordingly

`    return {
         name: 'Database_Name',
         host: 'localhost',
         username: 'username',
         password: '****',
         port: 3306
     };`

Rename the *local_environment_parser* to *environment_parser*.


### Deploying to Cloud Foundry

The following denotes the steps required to deploy the application to PAAS systems like Pivotal and Bluemix.
When deployed in the cloud foundry through starter kit, there are no changes to be done in the code. When deploying to the Cloud foundry manually, the node_starter_kit_config.json (present in the config folder) must contain the required “service instance name”  which was created in cloud foundry .

`  "service_name":"cleardb", `  // The service instance name created in cloud foundry 


##### Logging in to Cloud Foundry
  - For Pivotal Web Services follow the below CLI commands for login :

```sh
$ cf login -a api.run.pivotal.io
```
  - For IBM Bluemix Web Services follow the below CLI commands :
```sh
$ cf login -a api.ng.bluemix.net
```

##### Creating MySQL DB service

 IBM Bluemix & Pivotal Web Services offer a free MySQL service.
  - If you are using IBM Bluemix or Pivotal, run
```sh
$ cf create-service cleardb spark service_instance_name 
$ cf bind-service AppName service_instance_name
```


##### Manifest


Application manifests tell cf push what to do with applications. This includes everything from how many instances to create and how much memory to allocate to what services applications should use.

A manifest can help you automate deployment, especially of multiple applications at once.

By default, the cf push command deploys an application using a manifest.yml file in the current working directory.


###### Example Manifest:


Manifests are written in YAML. The manifest below illustrates some YAML conventions, as follows:

* The manifest may begin with three dashes.
* The applications block begins with a heading followed by a colon.
* The application name is preceded by a single dash and one space.
* Subsequent lines in the block are indented two spaces to align with name.


```
applications:

- name: nifty-gui
  memory: 512M
  host: nifty
```

A minimal manifest requires only an application name. To create a valid minimal manifest, remove the memory and host properties from this example.


###### Disk quota attribute:


Use the disk_quota attribute to allocate the disk space for your app instance. 


```
disk_quota: 1024M
```


###### Domain attribute:


Every cf push deploys applications to one particular Cloud Foundry instance. Every Cloud Foundry instance may have a shared domain set by an admin. Unless you specify a domain, Cloud Foundry incorporates that shared domain in the route to your application.

You can use the domain attribute when you want your application to be served from a domain other than the default shared domain.


```
domain: unique-example.com
```


###### Instances attribute:


Use the instances attribute to specify the number of app instances that you want to start upon push:


```
instances: 2
```


###### Memory attribute:


Use the memory attribute to specify the memory limit for all instances of an app.  For example:

```
  memory: 1024M
```


The default memory limit is 1G. You might want to specify a smaller limit to conserve quota space if you know that your app instances do not require 1G of memory.


###### Host attribute:


Use the host attribute to provide a hostname, or subdomain, in the form of a string. This segment of a route helps to ensure that the route is unique. If you do not provide a hostname, the URL for the app takes the form of APP-NAME.DOMAIN.


```
host: my-app
```

##### Pushing the application to cloud foundry

The following command has to be executed to push the application to cloud foundry.

```sh
$ cf push <app name>
```
Use the following command from your root directory to push the application to cloud foundary using the *manifest.yml*.

```sh
$ cf push
```


## Unit Testing And Code Coverage

In order to run the test cases and coverage the *gulp* task runner tool is used. The test cases are written in *mocha* and *gulp_mocha* module is used to execute the test cases.


To run the server test cases, the following command is executed.

```
$ gulp test_server
```

The output of the test cases along with code coverage is displayed in the terminal. These test cases test the response for all the requests by hitting the server. The coverage is present in the *server/test/results/coverage* folder. In order to view the coverage , the *index.html* file should be opened in browser.