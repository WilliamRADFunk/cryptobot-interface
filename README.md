# cryptobot-interface
(In-Progress) A front-end interface to monitor and control my backend, automated, cryptocurrency trading bot.

---

## Classes

* [Class Documentation](docs/README.md)

---

## Developer Adaptations

Depending on where you launch this application. It will be necessary in most cases to adapt certain files to be hosted live.

The first change is in the package.json script command for `npm run build`

Change the `/applications/cryptobot-interface/` within `ng build --prod --base-href=/applications/cryptobot-interface/` to match the path where your build files will reside on the server in relation to the root domain.

As this application uses Angular's awesome routing technology, and in my case the hosting server is Apache, it is necessary to include an `.htaccess` file at the hosted level. This redirects all url's back to the index.html that Angular builds. In order to bookmark extensions and have them work, they need to be properly redirected.

Inside the `/src/assets/configs/` folder you will see my `.htaccess` file. Just like in the npm script command, change `/applications/cryptobot-interface/` to match the path where your build files will reside on the server in relation to the root domain.

Don't worry about moving this file. The build command will do that for you at the end of the build process. Simply upload all `dist/` folder contents to the server location you want, and it should do the rest.

For any other server hosting types, you'll have to figure it out for yourself. 

---
