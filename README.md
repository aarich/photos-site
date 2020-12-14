# Simple Photo Gallery in React + Apache Http Server

[Live example](https://photos.mrarich.com)

## Usage

- Add an `img` directory in the `public` folder. The images should look like `IMG_XXXX.JPG` initially, but that format can be updated in the [`Utils.js`](src/utils/Utils.js) file.
- Update [`manifest.json`](public/manifest.json)
- Run `yarn build`
- Update [links throughout](https://github.com/aarich/photos-site/search?q=mrarich)
- Copy build directory to apache webserver (update `.htaccess`)

## Thanks

- [Create React App](https://github.com/facebook/create-react-app). (Documentation below)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
