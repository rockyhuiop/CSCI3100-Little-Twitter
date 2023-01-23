# CSCI3100-Little-Twitter
- This is a guide on the project
- Follow the steps below to set up the environment on your local machine
- [An 8hr tutorial](https://www.youtube.com/watch?v=Oe421EPjeBE&t=186s) for learning the basics of Node.js and Express.js
- Good luck and happy coding! :)


- **WARNING: DO NOT PUSH `/node_modeule` FOLDER TO GITHUB**

## 00. Menu
1. [Set Up](##01-set-up)
2. [Useful Commands](#02-useful-commands)
3. [Before you start coding](#03-before-you-start-coding)
4. [Project Structure](#04-project-structure)
5. [Express.js](#05-expressjs)

## 01. Set Up
1. Download Node.js from this link [here](https://nodejs.org/en/download/) (LTS v18.13.0)
2. Clone this repo to your local machine (eg. inside `C://.../Documents`) using git or [Github Desktop](https://desktop.github.com/)(recommended if you don't know git)
3. In the project directory(`/CSCI-LITTLE-TWITTER`), open terminal and type `npm install` to install all dependencies automatically
    >Optional (but very recommend) : 
    >we don't have to restart the server when we make changes using nodemon package.
    >for mac user, use `sudo npm install -g nodemon`
    >for windows user, use `npm install -g nodemon`
4. Run `nodeman app.js` or `node app.js` in the terminal
5. Open a browser and then type `localhost:<port_number>` to see the result
6. Install [Postman](https://www.postman.com/downloads/) for development purpose

## 02. Useful Commands
>npm should already be installed when you install Node.js
- `node <filename.js>` -> run a file
- `npm i <package>` -> install package
- `npm -i <package> -D` -> install package for develeopment purpose
- `npm uninstall <package>`-> uninstall packages
- `npm start` -> start the server

## 03. Before you start coding
>all the info can be found in the [tutorial](#csci3100-little-twitter) video
It is good to know:
- understand concept of event loop and blocking code
- async, await and promise
- event emitter
- data streams

## 04. Project Structure
- `/public` is folder for static resources(images)
- `/node_modules` is folder for dependency (treat it as lirary)
- `app.js` determines how the server and url will show
- `package-lock.json` keep tracks of the info of the installed package
- `package.json` is where the detail is stored such as dependencies information

## 05. Express.js
### 5.1 Introduction
- Treat Express as a switch case, we run that top to bottom
- Everything goes in order

import express first, then:
```
app = express()
```
### 5.2 Basic usage

```
app.use(express.static('<file_path>'))
```
means that app will use the static source for the website

GET:
```
app.get('<url>', (req, res) => {
    //your code here

    //only one res in one req, remember to return it if you have conditions
    return res.status(200).send(<sth/file>)

})
```
decide what to show when user access the url/page
status code could be checked online 
there are many more ways to send data from server, such as `res.json(<data>)` which sends json
similar idea for POST, PUT, DELETE and so on

### 5.3 Route parameters 
For example,

url `/user/product/:productID` productID is the route parameters specified with a : colon at in front of it,
which can be destructured by `const { pid } = req.params`
if url is `/user/product/2` then pid === 2, then we could use this to do something else like retriving data from database

We could use query string to do it in a neat manner
`/user/product/search?id=123&color=red`  use `?` to indicate the start of query string, and `=` to indicate the value
to get id and color value: `const { id , color } = req.query`
remember to handle all the cases (eg. data not found) in the code implementation

### 5.4 Middleware
treat it as a reusable function for many pages(eg. server log)
we can plug and use existing package written by others, don't re-invent the wheel
Set up middleware to run some code in a tidy manner:
```
app.get('<url>', <middleware_fn> ,(req, res) => {
    //your code here

    //only one res in one req, remember to return it if you have conditions
    return res.status(200).send(<sth/file>)

})
```
and the middleware, don't forget the `next` param and `next()` statement:
```
const middleware_fn = (req, res, **next**) => {
    //your code here

    //**MUST** include this sentence to end this middleware process
    **next()** 
}
```
We could also apply middleware to all of our functions using app.use() if no path is specified

In the following example:
```
app.get('/about', ...)
app.use(<middleware_fn>)
app.get('/info', ...)
app.get('/shop', ...)
```
The middleware function is applied to `/info` and `/shop` but not `/about`

however if we want to apply it to only some pages
we could instead use `app.use('<path>', <middleware_fn>)`
`app.use('/info', <middleware_fn>)` as an example,
it applies to the subpage like `/info/summer2024` or `/info/product/new/something`

place them in an array if multiple middleware is used 
`app.use('<path>', [<middleware_fn_1>, <middleware_fn_2>])`

### 5.5 Router middleware
It is messy to write all the url paths in one page of app.js.
We want the whole structure but at the same time we would like to keep the details in their own path
In this case the concept of router is introduced
```
app.use('/somepath', <detail.js>)
```
in detail.js:
```
router = express.Router()
router.get('/sth', ...)
router.post('/sth',...)
```
when url `/somepath/sth` is typed, it will perform a certain task

OR 

we could do it in one line
`router.route('/sth').get(...).post(...)`

but this is still messy for mixing functionalities and code,
So we can use a MVC mode
We add controller into our code, simpliy saying is to seperate the function and detail of the function into two seperate files

all of the things mentioned in section 5 can be seen in app.js as an example

