
## About the App

  This is an application which does Album Management functionality. User can add an Album, which will be added to his Album list. User can read the list of his Albums, edit any of the Album in the Album list. User can delete any of his Album from the Album list.
  
# About the Framework - Spring REST

  REST stands for Representational State Transfer. It relies on a stateless, client-server, cacheable communications protocol -- and in virtually all cases, the HTTP protocol is used.
  
  REST is an architecture style for designing networked applications. The idea is that, rather than using complex mechanisms such as CORBA, RPC or SOAP to connect between machines, simple HTTP is used to make calls between machines.
  
  Spring REST is a framework provided by Spring to provide REST based architectural support. Using Spring REST, REST based applications can be created in a seamless way, using annotations. 
  
  
# About the DB - MySQL

 If the business requirements include complex transactions that demand pre-defined database schema and rules to govern the relationships between fields, then MySQLDB is the best choice. The MySQL™ software delivers a very fast, multi-threaded, multi-user, and robust SQL (Structured Query Language) database server.  Provides transactional and nontransactional storage engines and other storage engines can be added. MySQL uses a standard form of the well-known SQL data language and works on many operating systems and with many languages including PHP, PERL, C, C++, JAVA and so on.
  
- JpaRepository provided by Spring handles the VCAP parsing for DB connection details, of MySQL and Postgresql
- Spring Boot usage in collaboration with the above Repository classes, abstracts the DB connection details parsing from the developer, thus reducing considerable effort for the developer
 
  
# Application Build

  This application uses Maven as the build tool.
  
# Dependency Management

  This application uses Maven to manage the dependent libraries. Maven’s pom.xml specifies the dependent libraries. 
 
# Prerequisite for enhancing the code locally
  
  * IDE like Eclipse
  * JDK should be installed 
  * CloudFoundry Eclipse Plugin or suitable IDE plugin
  * DB service instance should be created 
  * Maven setup 

# High level steps for building the application

  Go the directory where pom.xml is placed
  * Run the below commands:
            mvn clean
            mvn install
  * The application will be packaged as a war/jar file 

# High level steps for deploying the application in PaaS
    
## Using Eclipse: 
  - Install cloud foundry plugin in.
  - Login into your pivotal(api.run.pivotal.io)/bluemix(api.ng.bluemix.net) account
  - Drag and drop app to push an app into CF
  - Select and bind a service to your app 
  - Click finish button to complete your deployment
  
## Using Command line tool: 
  - Install the Cloud Foundry command line tool

  - For Pivotal CF login follow the below CLI command :
```sh
  $ cf login -a api.run.pivotal.io
```
  - For IBM Bluemix CF login follow the below CLI command :
```sh
  $ cf login -a api.ng.bluemix.net
```
  - For DigiFabricPAAS CF login follow the below CLI command :
```sh
  $ cf login -a api.mvp2.cognizantone.org
```
- Push the app :
```sh
  $ cf push <APPNAME> --no-start
```
 - Create a DB service :

```sh
  $ cf create-service <SERVICE> <PLAN> <SERVICE_INSTANCE>
```
 - Bind the service to the app :

```sh
  $ cf bind-service <YOUR-APP> <YOUR-SERVICE-INSTANCE>
```
 - Restage the the app :

```sh
  $ cf restage <APPNAME>
```
# Unit test case execution

  Junit test cases have been written for this app, and it is placed inside the /src/test/java package. 
  Using Eclipse and STS:
  Right click on the test, you will get a option as Run as Junit Test. Select the option to run it. 
  
# Code Analysis
  Code analysis tools like PMD, Findbugs can be run on the code. Simple way, is to, add these plugins to the IDE, and then generate the report from the IDE.

# Package Description

  The App has the below prominent layers:
  - Controller: Acting as a routing layer to receive incoming requests
  - Service: Acting as a layer to handle the business logic
  - Repositories: Acting as a layer to handle database connection
  - Domain: A POJO object to hold the domain data

 
## How to Run Application in local:
 - Uncomment the connection properties in application property file
 - Update the connection properties like host , port , username ,password and DB name
 - Remove the CloudConfig class, in order to avoid cloud DB connection.

## SendGrid
SendGrid is a cloud-based SMTP provider that allows you to send email without having to maintain email servers. SendGrid manages all of the technical details, from scaling the infrastructure to ISP outreach and reputation monitoring to whitelist services and real time analytics.

### Using SendGrid
The SendGrid related tasks are present in the file

`com\starterkit\config\SendGridConfig.java`
This file will make SMTP connection with Sendgrid service available in CF environment.
If the Sendgrid service is available as native service or external instance exposed through CUPS, then it will connect to the SMTP service using Spring Cloud connector API.
In order to distinguish the Sendgrid service in CUPS, the service name should contain the **sendgrid** key.


The code can be run in local machine by making an entry in Application.properties. 

sendgrid.hostname=
sendgrid.username=
sendgrid.password=

`com\starterkit\controller\SendGridController.java`
The above file will expose a REST API to send mail based on the request 

##### Request details to send an email using SendGrid

**Request URL:**
```
POST /sendmail
```
**Request Body:**

    {
		"from":"xxxx@xxxx.com",
		"to":["xxxx@xxxx.com","xxxx@xxxx.com"],
		"cc":["xxxx@xxxx.com"],
		"bcc":[],
		"subject":"sample message",
		"text":"sample message"
	}

**Response:**
The response contains the success or error message.
```
**success message:**
{
  "message": "Mail Sent Successfully",
  "status": "failure"
}

**error message:**
{
  "message": <will get appropriate error message from mail server>,
  "status": "success"
}
```