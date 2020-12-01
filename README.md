## COVID-19 Soltions
* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## Contributors
* Kaleb Afseth
* Steven Gellert
* Faiz Hassany

## General Info
This browser based web application connects business owners with solutions to COVID-19 problems.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase

## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── create-post.html         # HTML file, a page to create a new post
├── home.html                # home page HTML file, this is what users see after login
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # HTML file, this is what users see when they try to login
├── post-list.html           # HTML file, this is what users see when they enter a search term
├── post.html                # HTML file, this is what users see when they view a post
├── profile.html             # HTML file, this is what users see when they view their profile
└── README.md                # A document outlining the project directories

It has the following subfolders and files:
├── scripts                  # Folder for scripts
    /attach-posts.js         # Create html elements for one post in the postList.html page
    /create-post.js          # Create a new post in the database from the user's input
    /loginTrigger.js         # Open the login page if the user is not logged in
    /logout.js               # Logs the user out
    /post.js                 # Populate a post with it's variables from the database
    /search.js               # Passes the search terms to the attach-posts script
├── styles                   # Folder for styles
    /bootstrap.css           # Modifications of the default bootstrap style
└── templates                # Partial html elements that are used as templates by procedural renderers
    /comment.html            # A comment on a post
    /post-list-card.html     # A post in a list

Firebase hosting files: 
├── .firebase                # Folder for firebase elements
    /hosting..cache          # Cache of hosting data
├── 404.html                 # File not found page.
├── .firebaserc...
├── database.rules.json      # Firebase Rule File
├── firebase.json            # Firebase Config File
```