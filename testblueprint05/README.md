# AngularJS

AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. Angular's data binding and dependency injection eliminate much of the code you would otherwise have to write.

### Client File Structure
```
└── client
│      ├── assets
│      │   └── css
│      │   	    └── style.css
│      │   └── img
│      │
│      ├── controllers
│      │   └── controller.js
│      └── services
│      │   └── service.js
│      ├── tests
│      │   └── test.js
|      └── index.html
├── manifest.yml
└── package.json

```
### Files related to AngularJS
The application folder structure is modular, so that our controller and all of our $http requests are in separate files. Having all of the functionality in different modules helps to understand the overall layout of the application, hence the re-use and testing of code is easy.

```
index.html  # Includes all the scripts and styles and contains the HTML code to render the application.
```
**assets**
```
css         # Contains the styles information required for the UI
img         # Contains the static images which are displayed in the UI
```

**controller**
```
controller.js     # This is the Angular module containing the button actions and assigning of scope variables. This has all the code to get, create, update or delete an object inside our service.
```

**services**
```
service.js     # This is the service module and is meant to interact with our Node API. All the service calls are present in this file. This ensures that we can test this code separate of our overall application.
```


### Unit Testing

The unit tests in this application are written using jasmine . A sample template is given in the tests folder. This can be executed using *karma* tools or other testing tools and task runners can also be used.