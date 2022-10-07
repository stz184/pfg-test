# PFG React Test

Build a simple React app with the following screens:

1. Login screen with username and password fields + validation
   * Valida user names are: User: test@pfgbulgaria.com, Pass: test@pfgbulgaria.com
   * To get a login token: https://localhost:9420/login
2. Home page that displays a grid with news articles a search bar on top that filters based on the article title
   * To get the news articles use the following API: https://localhost:9420/news
   * You need to provide the token returned from the login API
   * Every article should have a view button, text preview (max 400 characters) and a date
3. Article page that displays the full article
   * To get the article use the following API: https://localhost:9420/news/{id}
   * You need to provide the token returned from the login API
   * The article should have a title, text and a date and a comment section
       * Use 3 pages of comments (pagination) 
       * The commands can be retrieved using the following API: https://localhost:9420/news/{id}/comments/{page}
4. Profile page with user details and a form with prefilled user details

All pages must have a header with PFG TEST as title and a profile menu that includes the user avatar fom the response, the rest if the design is as you like, the requirements sare that the app can be navigated and used

Requirements:
   * use tailwind css ot sass/less for styling (tailwind is preferred and included in the project)
   * must use TypeScript and define interfaces for data and props
   * for state management use react contexts
   * use fetch api of the browser to make the API calls and use await/async where possible

### To start the test backend
1. The server starts on port 9420 so when calling form the app use https://localhost:9420
```bash 
cd backend
npm start
```
2. The data is not 

### example requests

```
### Login
POST http://localhost:9420/login
Content-Type: application/json

{
    "username": "test@pfgbulgaria.com",
    "password": "test@pfgbulgaria.com"
}

### GetNews

GET http://localhost:9420/news
Content-Type: application/json
Authorization: Bearer wq7a3kkxs0o70s1athc17e9pzxg4g4cgha8g3xhvwqagcl2ekx95cdsdzadom2iv

### GetArticle

GET http://localhost:9420/news/796101
Content-Type: application/json
Authorization: Bearer wq7a3kkxs0o70s1athc17e9pzxg4g4cgha8g3xhvwqagcl2ekx95cdsdzadom2iv

### GetArticle Comments

GET http://localhost:9420/news/796101/comments/11
Content-Type: application/json
Authorization: Bearer wq7a3kkxs0o70s1athc17e9pzxg4g4cgha8g3xhvwqagcl2ekx95cdsdzadom2iv
```