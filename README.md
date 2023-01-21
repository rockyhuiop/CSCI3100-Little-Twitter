# CSCI3100-Little-Twitter
- This is a guide on the project
- Follow the steps below to set up the environment on your local machine
- [An 8hr tutorial](https://www.youtube.com/watch?v=Oe421EPjeBE&t=186s) for learning the basics of Node.js and Express.js
- Good luck and happy coding! :)


- **WARNING: DO NOT PUSH `/node_modeule` FOLDER TO GITHUB**

## 00. Menu
1. [Set Up](##01-set-up)
2. [Useful Commands](#02-useful-commands)
3. [Good To Know](#03-good-to-know)
4. [Project Structure](#04-project-structure)
5. [Express.js](#05-expressjs)

## 01. Set Up
1. Download Node.js from this link [here](https://nodejs.org/en/download/) (LTS v18.13.0)
2. Clone this repo to your local machine (eg. inside `C://.../Documents`) using git or [Github Desktop](https://desktop.github.com/)(recommended if you don't know git)
3. In the project directory(/CSCI-LITTLE-TWITTER), open terminal and type `npm install` to install all dependencies automatically
    >Optional (but very recommend) : 
    >we don't have to restart the server when we make changes using nodemon package.
    >for mac user, use `sudo npm install -g nodemon`
    >for windows user, use `npm install -g nodemon`
4. Run `nodeman app.js` or `node app.js` in the terminal
5. Open a browser and then type `localhost:<port_number>` to see the result

## 02. Useful Commands
>npm should already be installed when you install Node.js
- `node <filename.js>` -> run a file
- `npm i <package>` -> install package
- `npm -i <package> -D` -> install package for develeopment purpose
- `npm uninstall <package>`-> uninstall packages
- `npm start` -> start the server

## 03. Good To Know
>all the info can be found in the [tutorial](#csci3100-little-twitter) video
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
```
app.use(express.static('<file_path>'))
```
means that app will use the static source for the website

```
app.get('<url>', (req, res) => {
    //your code here
    res.status(200).send(<sth/file>)
})
```
decide what to show when user access the <url> 
status code could be checked online 
there are many more ways to send data from server, such as `res.json()` which sends json

Example can be seen in app.js

