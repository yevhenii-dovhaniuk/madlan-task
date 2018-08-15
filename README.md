# Simple image uploader

## Features
- application allows user to upload his images to the gallery (currently stored in file system)
- application allows user to see all the images currently stored at the server
- application allows user to see the progress of current file upload via bar progress indicator
- application has some responsiveness, so you can visit it from your mobile phone or shrink the viewport (by simply resizing the window)

## Technical
### UI part
- UI uses only plain html, css and javascript (es6) with no additional libraries
- all code is stored in `/src/ui/static` folder
- all code is grouped by features, each in it's own folder
- there is only one markup file - `index.html`
### Server part
- server is written using nodejs
- also groped by featues
- contains `images` folder with preloaded image database

## How to use

### Prerequisites
- make sure you have installed the latest version of Nodejs
- make sure commands `npm` and `node` are available globally

### Install dependencies
```
npm i
```

### Run
```
npm start
```
or
```
node src/server/server.js
```

1) Open http://localhost:3000
2) Click on `Select image` button (can also be clicked using `Tab` and `Enter` keys)
3) Select desired image
4) Click `Upload` button (also available via `Tab` + `Enter` keys)
5) Excellent! You have successfully uploaded a file :)

### Test (unit-tests)
```
npm test
```

*It is currently only one unit-test `src/ui/static/form/form.test.js` because of zero-library approach. 
Simple `webpack` lib will allow to add imports and exports between js files which will dramatically change the way files are designed. 
Mocking `window` and `document` methods isn't a very pleasant task*