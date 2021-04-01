![Build](https://github.com/aarich/photos-site/workflows/Build/badge.svg)

# Simple Photo Gallery in React + Apache Http Server

This was originally built for [photos.mrarich.com](https://photos.mrarich.com), but it's probably reusable? At least as a starting point?

## Features

- Paginated gallery
- "Reactive" image sizing
- RSS Feed ([feed.php](https://photos.mrarich.com/feed))
- Caching
- Keyboard navigation
- Automatic EXIF data display
- Probably some bugs

## Usage

- Add an `img` directory in the `public` folder.
  - The images should match `IMG_XXXX.JPG`. The format can be updated in [`utils.ts`](src/utils/utils.ts).
- Update [`manifest.json`](public/manifest.json)
- Update [links throughout](https://github.com/aarich/photos-site/search?q=mrarich)
- Update [`.env`](/.env)
- Update logos in `public`
- Update `favicon.ico`
- Run `npm run build`
- Copy output build directory to apache webserver

## Scripts

Instructions selected from the `create-react-app` bootstrap.
In the project directory, you can run:

- `npm run start`: Runs the app in the development mode.

- `npm run test`: Launches the test runner in the interactive watch mode. (No tests for now)

- `npm run build`: Builds the app for production to the `build` folder.

## Thanks

- [Create React App](https://github.com/facebook/create-react-app)
