# About the Customer and the Project

Your customer is the Cheboksary Power Unit Plant (ChZSA). This plant produces components for road construction 
equipment, such as cooling systems for tractor engines and chassis parts.
In 2021, the plant began producing its own forklifts, under the brand name "Silant." You are responsible for executing
a project for this brand.

# About the Service That Needs to Be Implemented

Customers who buy forklifts must maintain them. All parts have specific service lifetimes, and it is essential to 
replace them on time. Failure to replace a part in time could result in the forklift breaking down, causing the 
business using it to partially shut down and lose money.

Tracking the replacement of parts is not an easy task, given the variety of components and their varying service 
lifetimes. Therefore, ChZSA decided to assist their clients in solving this issue.

ChZSA aims to develop a service where customers can monitor the condition of each purchased vehicle and all its
components. Anyone who has purchased a Silant forklift can log into the website under their profile and determine 
which machines need servicing soon.

Additionally, the service will offer the ability to track the maintenance status of the equipment.
This will enable customers to know when the next loader will leave the service center and return to operation.

# Service Requirements

The service must store the following data about Silant warehouse equipment:

Loader equipment
Place of use
History of maintenance, breakdowns, and repairs
The service must implement authorization, including various roles: guest, client, service organization, and manager.
Each role must have its level of access for viewing and editing data.

Clients have access to data from specific machines. Each machine is associated with only one client.
Service organizations have access to the data of specific machines, each of which is also associated 
with only one service organization. Managers have access to data on all machines and have the ability 
to edit directories.

# Who Will Use the Service

The target audience for the service includes everyone involved in working with forklifts:

Equipment operators: those who buy the equipment (customers)
Service organizations: those who repair it
Representatives of the equipment manufacturer: ChZSA themselves
For each type of user, specific functions and interfaces must be implemented


# Key Functionality

Displaying information from the machine database in table form
The service should display data from the database in a table, depending on the user's level of access rights.
Rows in the table should be clickable and lead to a page displaying complete data, including the "description" 
field for entities specified in directories.
Authorization must be performed using a login/password provided by the system administrator. Users cannot
independently change their login and/or password or register.

Users without authorization can obtain limited information about a machine's equipment by entering its serial number.
This type of user has access to a field for entering the serial number of the machine and a search button.

