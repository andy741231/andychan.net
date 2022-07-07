# check version

* node -v
* npm list express

# install express
npm install express

# listen port
* node server.js
(localhost:3000)
* ctrl + c (stop)

# Middleware to serve static content
app.use(express.static(path.join(__dirname, './static')));

# Eslint
* npm instll -D eslint
(-D for dependency install and will not be included when delpoy)
* initialize
    npx eslint --init

# Prettier
* npm install -D prettier-eslint-config eslint-plugin-prettier

# install eslint and prettier extensions on vs code to it to reconize

* config: code > preference > settings
    eslint: auto fix - saved
            format on save - check
            default formatter - prettier

* eslintrc.jason

  "extends": ["eslint:recommended", "prettier"],
  "plugins": ["prettier"],

* prettierrc
    create .prettierrc

    {
    "trailingComma": "es5",
    "printWidth": 100,
    "singleQuote": true
    }

# install nodemon

* npm install -D nodemon
* go to package.json
    
    "scripts": {
    "dev": "nodemon --ignore feedback.json server.js"
  },

* npm run dev

# EJS template engine for express.js

* npm install ejs
* go to server.js
    Under port 3000
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './views'));
* change html to ejs
* install ejs plugin on vs code

# install cookie session

* npm install cookie-session
* 
