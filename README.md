# Simple Photo Gallery in React + Apache Http Server

![Build](https://github.com/aarich/photos-site/workflows/Build/badge.svg)

[Live example](https://photos.mrarich.com)

## Usage

- Add an `img` directory in the `public` folder. The images should look like `IMG_XXXX.JPG` initially, but that format can be updated in the [`Utils.js`](src/utils/Utils.js) file.
- Update [`manifest.json`](public/manifest.json)
- Update [links throughout](https://github.com/aarich/photos-site/search?q=mrarich)
- Run `yarn build`
- Copy build directory to apache webserver (update `.htaccess`)

## Thanks

- [Create React App](https://github.com/facebook/create-react-app)

### Available Scripts

Instructions selected from the `create-react-app` bootstrap.

In the project directory, you can run:

- `yarn start`

  - Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
    The page will reload if you make edits.\
    You will also see any lint errors in the console.

- `yarn test`

  - Launches the test runner in the interactive watch mode.\

- `yarn build`

  - Builds the app for production to the `build` folder.\
    It correctly bundles React in production mode and optimizes the build for the best performance.\
    The build is minified and the filenames include the hashes.\
