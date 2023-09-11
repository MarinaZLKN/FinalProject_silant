You can find instructions on how to run the project in the README.md file located in the project root.

# Authorization
When you start the project, the main page opens. Immediately under the header, you'll find a search field for machine
serial numbers. Unauthorized users can enter a serial number to receive limited information about the machine
(you can try 0017, 0003, 0008).
Fields 2 to 10 are displayed in a tabular format, while the 1st field (machine serial number) appears in an information
message above the table. If a machine with the entered serial number doesn't exist, a notification message will be
displayed. I have also added a "Reset" button to clear the search results.

For authorized users, an authorization sign appears in the upper-right corner. Users can't register themselves; 
all user data is provided by the administrator. In the project root, next to the manage.py file, there's a users.txt
file that lists all users with their logins and passwords.

If you enter incorrect data, you'll receive a notification indicating that the information was entered incorrectly.

Upon authorization, the Search component is replaced by a panel displaying the authorized user's details—nickname, role,
and the name of the service. Below this panel, three buttons appear, allowing you to switch between different tables.

# Functionality
All data from the database is displayed in a tabular format. To access all database data, I recommend logging in as a 
manager, as other user roles have limited access. When you go to any table, you can immediately apply filters as needed.
Each table has its own set of filtering criteria. Multi-layer filtering is also possible; for example, you can filter
by vehicle number and then further filter those results by another criterion. There's also a "Reset Filter" button 
that restores the table to its original state.

Data sorting is carried out according to the fields specified in the technical specifications.

Each row in the table is clickable and directs you to a page with a full description of the entity, including the
"description" field from the directory. I've designed it this way to fit all necessary details into a single component. 
The main tables don't display 100% of the information to make the detailed page meaningful.

# Access
The manager role has full access to all data and is the only role that can create all new instances. In addition to the 
main three instances, the manager also sees a "Catalogue" button in the Machines table, allowing the creation of new
directories that will be immediately available for selection when creating one of the main instances. Other roles do
not have access to this button.

All other users only have access to information directly related to their machines.

Although not all roles can create new instances, everyone sees the "Add" button. If a user role doesn't have permission
to add an instance, a notification will appear stating the lack of permission. The same applies to the "Edit"
button—everyone sees it, but it's functional only for those with the required access. The "Delete" button, however,
is visible only to those who have the necessary permissions. While I don't have extensive experience in UI design, 
I've tried to make it clear who has access to what, thereby demonstrating my ability to handle different user scenarios.
This is part of an educational process for me.