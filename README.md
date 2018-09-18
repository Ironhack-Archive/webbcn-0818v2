# Project Name


## Description
Describe your project in one/two lines.
 

## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user I want to access the homepage so that I see the list of students
- **Student page** - As a user I want to see each student page so that i can learn about them
- **Sign up** - As a user I want to sign up on the webpage so that I can use the private features
- **Login** - As a user I want to log in on the webpage so that I can get back to my account
- **Logout** - As a user I want to log out from the webpage so that I can make sure no one will access my account
- **Images list** - As a user I want to see all the images available so that I can see all the images
- **Image create** - As a user I want to upload an image so that I can share it with others
- **Image delete** - As a user I want to delete an image so that I can correct a mistake
- **Events list** - As a user I want to see all the events, past and future, so I can decide whether I want to attend an event, or review past events
- **Event create** - As a user I want to create an event so that people know about my event
- **Event detail** - As a user I want to see the event details so that I can decide if I want to attend and/or review the details of previous´ events
- **Event delete** - As a user I want to keep my events up-to-date
- **Projects list** - As a user I want to see all the projects that have been done so that I can see the presentations, know which student did it, and see the project online.
- **Project create** - As a user I want to create and post my projects  
- **Project delete** - As a user I want to delete a project
- **Resource list** - As a user I want to see all the resources available so that I can choose which ones I want to access
- **Resource create** - As a user I want to create an resource so that I can share it with the community

## Sprint 2
 - **See project students** - As a user I want to see the project students so that i know who did what.  
 - **See events attendees** - As a user I want to see the events attendees so that i know if i want to attend. 
 - **See events projects** - As a user I want to see the events projects so that i know if i want to attend. 

## Backlog
List of other features outside of the MVPs scope

Images:
- Add comments to images

Events: 
- Include mandatory field type completion
- Insert events description in model
- Update events
- Review past events
- Link to images of events
- Include a search bar to filter events 
- Attendents form
- Location field

Projects:
- project detailed page

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of projects built by the users


## Routes:
- GET / 
  - renders the homepage

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)

- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - password
    - name
    - role
  - validation
    - fields not empty
    - user not exists
  - create user with encrypted password
  - store user in session
  - redirect to /

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)

- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty
    - user exists
    - passdword matches
  - store user in session
  - redirect to /

- POST /auth/logout
  - body: (empty)
  - redirect to /

- GET /images
  - renders the image list
  - show the create button if user is logged in

- GET /images/create
  - redirects to /auth/login if user is anonymous
  - renders the image create form
  
- POST /images/create 
  - redirects to /auth/login if user is anonymous
  - body: 
    - title
    - url
    - category
  - validation
    - fields not empty
  - upload file to cloudinary
  - create image
  - redirect to /images

- POST /images/:id/delete 
  - redirects to /auth/login if user is anonymous
  - validation
    - id is !valid (redirects to /images)
    - id !exists (redirects to /images)
  - body: empty
  - deletes the image
  - redirect to /images

- GET /events
  - renders the event list 

- GET /events/create
  - redirects to /auth/login if user is anonymous
  - renders the event create form

- POST /events/create 
  - redirects to /auth/login if user is anonymous
  - body: 
    - name
    - date
    - type
  - validation
    - fields not empty
  - create event
  - redirect to event list

- GET /events/:id
  - redirects to /auth/login if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - renders the event detail page

- POST/events/:id/delete
  - redirects to /auth/login if user is anonymous
  - validation
    - id is valid (redirects to /events)
    - id exists (redirects to /events)
  - body: empty
  - deletes the event
  - redirect to /events

- GET /projects
  - renders the projects list

- GET /projects/create
  - redirects to /auth/signup if user is anonymus
  - renders the project create form

- POST /projects/create 
  - redirects to /auth/login if user is anonymous
  - body: 
    - name
    - studentName
    - presentationURL
    - projectURL
    - imageURL
  - validation
    - fields not empty
    - if validation fails redirect to form (with a flash msg)
  - create project
  - redirect to projects list

- GET /resources
  - renders the resources page

- GET /resources/create
  - renders the resource createform

- POST /resources/create 
  - redirects to /auth/login if user is anonymous
  - body: 
    - title
    - url
    - category
  - validation
    - all fields required
    - if data is valid = create a new resource and redirect to /resources
    - if data is invalid = create an error message and redirect to /resources/create

- POST /resources/:id/delete

  - find a resource by id and remove it from db
  - validation
    - id is !valid (redirects to /resources)
    - id !exists (redirects to /resources)
  - delete a resource
  - redirect to /resources

- GET /student/*
  - show the student page
  - use student layout


## Models
User model
 
```
username: String (required)
password: String (required)
name: String (required)
role: String (enum: student, teacher) (required)
```

Image model

```
createdBy: ObjectId<User> (required)
title: String (required)
url: String (required)
category: String (enum: people, calendar, activity) (required)
```

Event model

```
name: String (required)
type: String (enum: party, presentation, talk) (required)
date: Date (required)

```

Resource model

```
title: String (required)
url: String (required)
category: String (enum: documentation, exercises, events) (required)

```

Project model

```
name: String (required)
studentName: String (required)
presentationUrl: String (required)
projectUrl: String (required)
imageUrl: String (required)

```

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
