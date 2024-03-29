![Build](https://github.com/aarich/photos-site/workflows/Build/badge.svg)

# Simple Photo Gallery in React + Apache Http Server

This was built for [photos.mrarich.com](https://photos.mrarich.com) but the source is reusable, at least as a starting point.

## Features

- Paginated gallery
- "Reactive" image sizing to save bandwidth on mobile
- RSS Feed ([feed.php](https://photos.mrarich.com/feed))
- Caching
- Keyboard navigation
- Tag filtering
- URL navigation
- Automatic EXIF data display
- Probably some bugs

## Usage

- Run `npm install` to install dependencies.
- Add an `img` directory in the `public` folder.
  - The images should match `IMG_X.JPG`. The format can be updated in [`utils.ts`](src/utils/utils.ts).
  - You can experiment with image sizes. In most places the image is resized on the server to conserve bandwidth, so whatever size is used will likely be reduced before being displayed anywhere.
  - To save time/space/energy, you should also just put the `img` directory in your webserver root and make sure to not overwrite it when copying output files.
- Update [`manifest.json`](public/manifest.json)
- Update [links throughout](https://github.com/aarich/photos-site/search?q=mrarich)
- Update [`.env`](/.env)
- Update logos in [`public`](public)
- Update [`favicon.ico`](public/favicon.ico)
- Update [`tags.json`](public/tags.json) with your own tags
- Run `npm run start` to test
- Run `npm run build` to build
  - Copy output build directory to your apache webserver

## Scripts

In the project directory, you can run:

- `npm run start`: Runs the app in the development mode.
- `npm run test`: Launches the test runner in the interactive watch mode. (No tests for now 😬)
- `npm run build`: Builds the app for production to the `build` folder.

## Thanks

- [Create React App](https://github.com/facebook/create-react-app)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io)
