# Blocks
A simple CMS for storytelling.

## Install and Run
- `npm install`
- `npm run dev` runs express and the front end (gulp and webpack concurrently) in dev mode, which allows editing.
- `npm run front-end` runs gulp and webpack only for debugging the front end.
- `npm run prod` runs express and the front end (gulp and webpack concurrently) in prod mode, which does not allow editing.

## Local Server
- The server is run by [gulp-connect](https://www.npmjs.com/package/gulp-connect)
- The default root directory is `public`

##License
MIT © [Andrew Bowles](https://github.com/strangemethod)