
# OPUS - Personal Notebook 

[![Visit](https://img.shields.io/static/v1?label=VISIT&message=HERE&color=brightgreen)](https://opus-notebook.herokuapp.com/)



![Opus Screenshot](https://i.ibb.co/tB8hh3H/opus1.png)


A notebook which stores your notes in an organized manner.


## Features

- Can add tags to notes.
- Fuzzy search to quicky search for notes in a sub-notebook.
- Rich text editor built with DraftJS.
- Many more to come ...


## WIP

- Improve mobile UI functionality
- Add more options in editor toolbar
- Notes to PDF
- Add tests
## Run Locally

Clone the project

```bash
  git clone https://github.com/Ishan-Saini/Opus.git
```

Go to the project directory

```bash
  cd opus
```

Install dependencies

- In root

```bash
  npm install
```
- In client

```bash
  cd client  
  npm install
```

Add `config.env` file in the root directory with following keys

```bash
  DATABASE= <mongoDB uri>
  DATABASE_PASSWORD= <DB password>
  PORT=5000
  NODE_ENV=development

  JWT_SECRET_KEY= <some secret key>
  JWT_EXPIRY= <token expiry> (eg. 40d for 40 days)
  JWT_EXPIRY_COOKIE= <number of days>
```


Start the developent server

- Backend

```bash
  npm run start:dev
```

- Frontend

```bash
  npm start
```

You're all set, lesssgoooo!