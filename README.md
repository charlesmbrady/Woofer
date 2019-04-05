[![Build Status](https://travis-ci.com/alperg/project2-starter-auth.svg?branch=master)](https://travis-ci.com/alperg/project2-starter-auth)

# Woofer

A web app that allows users to meet fellow dog moms and dog dads and schedule playdates for their pups.

## Live link:

## About
As a team of dog lovers, we wanted to create an app that would allow dog owners to connect and plan playdates. 
When visiting the site, the user is greeted by a landing page. From here, they can either log in or register.
Upon registration, the user's information is sent to the database (MySQL), and they can view their user console. This serves as a homepage for the user. Here, they can view a tidbit of the information they provide to others (username, image, and their dog(s)). We used the Google Maps API to grab the user's geolocation and display nearby dog parks. This provides a bit of context for meeting for a playdate. At the bottom of the user's homepage, they can view playmates (the dogs of other user's on the site).

## Coming Soon
We are currently working on our MVP, but we have several ideas to improve the app!
- Expand locations to include all sorts of dog-friendly establishments, like breweries and restaurants. We would also like to display nearby veterinary clinics and pet stores.
- Display different dog-related quotes on the landing page.

## Dependencies

## Testing

## Requirements:

* Add `.env` file with the following content:

```
SEQUELIZE_USER=your_mysql_db_user
SEQUELIZE_PASSWORD=your_mysql_db_password
SEQUELIZE_HOST=your_mysql_db_host
AUTH_SECRET=your_auth_secret_key
ADMIN_USER_PWD=admin_password
USER_PWD=user_pwd
FORCE_SYNC=true_or_false
```
