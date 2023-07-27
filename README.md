# CarCar

CarCar is a starter application that consists of microservices 

Team:

* Julius Pagtakhan - Service API
* John An - Sales API

## How to Run this App

**Make sure you have Docker, Git, and Node.js 18.2 or above**
​
1. Fork this repository : https://gitlab.com/sjp19-public-resources/sjp-2022-april/project-beta
​
2. Clone the forked repository onto your local computer:
git clone <<respository.url.here>>
​
3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running
​
- View the project in the browser: http://localhost:3000/


- To log into the Admin application for any microservice, create a superuser by connecting to a running container that contains an api service with this command : docker exec -it «api-container-name» bash 
    - Run : python manage.py createsuperuser 
    - Complete the form 
    - Open the correct URL for the microservice that you created the superuser


- When changing models, make and run migrations:
  - Run docker exec -it «api-container-name» bash to connect to the running service that contains your API service.
  - Run : python manage.py makemigrations
  - Run : python manage.py migrate
  - Stop and restart your poller service.
  
​
## Diagram
 - Project-beta Diagram : 
  ![Img] (/images/project-beta diagram.png)
​
## API Documentation
### Inventory API (Optional)

The Inventory API houses the RESTful endpints for the following entities :
    - Manufacturer : contains information pertaining to company that manufactures the automobile
    - VehicleModel : contains information pertaining to the model of a vehicle created by the manufacturer
    - Automobile : contains information pertaining to the actual automobile of a specific vehicle model
​

**CRUD Route for Inventory API**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/<int:id>/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/<int:id>/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/<int:id>/


JSON body to send data:

Create and Update a manufacturer (SEND THIS JSON BODY):
- You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/<int:id>/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/<int:id>/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/<int:id>/

Create and update a vehicle model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or picture URL:
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
}
```
Return value of creating or updating a vehicle model:
- This returns the manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a List of Vehicle Models Return Value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

### Automobiles:
- The **'vin'** at the end of the detail urls represents the VIN for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/<str:vin>/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/<str:vin>/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/<str:vin>/


Create an automobile (SEND THIS JSON BODY):
- You cannot make two automobiles with the same vin
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Return Value of Creating an Automobile:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "777",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "image.yourpictureurl.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	}
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}


### Service API

The Service microservice allows the user to create and view service appointments, as well as technicians. It has models for Technician, Appointment, and AutomobileVO. These models respond to API endpoints on the backend, while webpages on the frontend also allow the user to send different types of requests. 

Two special features implemented are managing both VIP and appointment status. If the VIN of an appointment, matches a VIN in inventory, the Service Appointment page will flag the appointment as VIP. The user may also control the appointment status with the 'cancel' and 'finish' buttons on the Service Appointment page. The Service Appointment page allows the user to search for appointments through filtering with a VIN.

## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Technicians:


| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Create a technicians | POST | http://localhost:8080/api/technicians/
| Show a specific technicians | GET | http://localhost:8080/api/technicians/<int:id>/

To create a Technician (SEND THIS JSON BODY):
```
{
	"first_name": "John",
	"last_name": "Doe",
	"employee_id": 1
}
```
Return Value of Creating a Technician:
```
{
	"first_name": "John",
	"last_name": "Doe",
	"employee_id": 1,
	"id": 1
}
```
Return value of Listing all Technician:
```
{
	"technicians": [
		{
			"first_name": "John",
			"last_name": "Doe",
			"employee_id": "1",
			"id": 1
		},
		{
			"first_name": "Jane",
			"last_name": "Doe",
			"employee_id": "2",
			"id": 2
		},
	]
}
```
### Appointments:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List appointments | GET | http://localhost:8080/api/appointments/
| Appointment details | GET | http://localhost:8080/api/appointments/<int:id>
| Create an appointment | POST | http://localhost:8080/api/appointments/
| Delete an appointment | DELETE | http://localhost:8080/api/appointments/<int:id>
| Cancel an appointment | PUT | http://localhost:8080/api/appointments/<int:id>/cancel
| Finish an appointment | PUT | http://localhost:8080/api/appointments/<int:id>/finish


To create an appointment (SEND THIS JSON BODY):
```
{
	"date_time": "2023-07-30T12:00:00+00:00",
	"reason": "Oil Change",
	"status": "Submitted",
	"vin": "12345678910121314",
	"customer": "John Doe",
	"technician": 1
}
```
Return Value of creating an appointment:
```
{
	"date_time": "2023-07-30T12:00:00+00:00",
	"reason": "Oil Change",
	"status": "Submitted",
	"vin": "12345678910121314",
	"customer": "John Doe",
	"technician": "1",
	"id": 1
}
```
List all appointments Return Value:
```
{
	"appointments": [
		{
			"date_time": "2023-07-31T14:12:00+00:00",
			"reason": "Oil Change",
			"status": "finished",
			"vin": "1C3CC5FB2AN120174",
			"customer": "John Doe",
			"technician": "1",
			"id": 1
		},
		{
			"date_time": "2023-07-31T12:00:00+00:00",
			"reason": "Oil Change",
			"status": "created",
			"vin": "12345678910121315",
			"customer": "Jane Doe",
			"technician": "2",
			"id": 2
		},
	]
}
```

​
### Sales API

The Sales microservice allows the user to create an automobile sale transaction involving an unsold car that is listed in the inventory. This microservice has 4 models:

    - Salesperson : This model contains first name, last name, and employee id fields
    - Customer : This model contains first name, last name, address, and phone number fields
    - Sale : This model contains a price field and instances of the automobile, customer, and salesperson models.
    - Automobile Value Object (VO) : This model contains vin and sold field, indicating whether the vehicle has been sold or not.

These models respond to API endpoints on the backend, while webpages on the frontend also allow the user to send different types of requests.



The features implemented are CRUD operations for salepeople, customers, as well as recording a new sale. When recording a new sale, the application filters automobiles that have been marked as sold.

The Salesperson History feature displays a list of the sales transaction history for a salesperson, which can be selected via the dropdown. When the dropdown selection changes, show all of the sales associated with the selected salesperson. The list of sales should contain the salesperson, the customer, the automobile VIN, and the price of the sale.

The AutomobileVO is a value object that gets data about the automobiles in the inventory using a poller. The sales poller automotically polls the inventory microservice for data, so the sales microservice is constantly getting the updated data.

The reason for integration between these two microservices is that when recording a new sale, you'll need to choose which car is being sold and that information lives inside of the inventory microservice.


## Accessing Endpoints to Send and View Data - Access through Insomnia:

### Customers:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List customers | GET | http://localhost:8090/api/customers/
| Create a customer | POST | http://localhost:8090/api/customers/
| Show a specific customer | GET | http://localhost:8090/api/customers/<int:id>/

To create a Customer (SEND THIS JSON BODY):
```
{
	"name": "John Johns",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return Value of Creating a Customer:
```
{
	"id: "1",
	"name": "John Johns",
	"address": "1212 Ocean Street",
	"phone_number": 9804357878
}
```
Return value of Listing all Customers:
```
{
	"customers": [
		{
			"id",
			"name": "Martha Stewart",
			"address": "1313 Baker Street",
			"phone_number": "980720890"
		},
		{
			"id",
			"name": "John Johns",
			"address": "1212 Ocean Street",
			"phone_number": "9804357878"
		}
	]
}
```
### Salespeople:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List salespeople | GET | http://localhost:8090/api/salespeople/
| Salesperson details | GET | http://localhost:8090/api/salesperson/<int:id>/
| Create a salesperson | POST | http://localhost:8090/api/salespeople/
| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/<int:id>/


To create a salesperson (SEND THIS JSON BODY):
```
{
	"name": "Jane Doe",
	"employee_number": 1
}
```
Return Value of creating a salesperson:
```
{
	"id": 1,
	"name": "Liz",
	"employee_number": 1
}
```
List all salespeople Return Value:
```
{
	"salespeople": [
		{
			"id": 1,
			"name": "Jane Doe",
			"employee_number": 1
		}
	]
}
```
### Salesrecords:
- the id value to show a salesperson's salesrecord is the **"id" value tied to a salesperson.**

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List all salesrecords | GET | http://localhost:8090/api/salesrecords/
| Create a new sale | POST | http://localhost:8090/api/salesrecords/
| Show salesperson's salesrecords | GET | http://localhost:8090/api/salesrecords/<int:id>/
List all Salesrecords Return Value:
```
{
	"sales": [
		{
			"id": 1,
			"price": 111000,
			"vin": {
				"vin": "111"
			},
			"salesperson": {
				"id": 1,
				"name": "Liz",
				"employee_number": 1
			},
			"customer": {
				"name": "Martha Stewart",
				"address": "1313 Baker Street",
				"phone_number": "980720890"
			}
		}
	]
}
```
Create a New Sale (SEND THIS JSON BODY):
```
{
	"salesperson": "Liz",
	"customer": "John Johns",
	"vin": "888",
	"price": 40000
}
```
Return Value of Creating a New Sale:
```
{
	"id": 4,
	"price": 40000,
	"vin": {
		"vin": "888"
	},
	"salesperson": {
		"id": 1,
		"name": "Liz",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "John Johns",
		"address": "1212 Ocean Street",
		"phone_number": "9804357878"
	}
}
```
Show a Salesperson's Salesrecord Return Value:
```
{
	"id": 1,
	"price": 111000,
	"vin": {
		"vin": "111"
	},
	"salesperson": {
		"id": 1,
		"name": "Liz",
		"employee_number": 1
	},
	"customer": {
		"id",
		"name": "Martha Stewart",
		"address": "1313 Baker Street",
		"phone_number": "980720890"
	}
}
​
## Value Objects

**AutomobileVO Model:

Both the Sales and Service microservices utilize AutomobileVO models, which are value objects. AutomobileVO contains 'VIN' and 'sold' fields which are polled every 60 seconds from the Automobile model in the Inventory API.

