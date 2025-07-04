[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


# Translate Mate
<img align="right" width="auto" height="120" src="https://github.com/fhinok/translatemate/blob/5fd693be89337b90e094e4af85c5cdaa0642fb19/frontent/src/logo.png">

**Multi-language translation tool**

Makes translating from and to multiple languages simultaneously refreshing and empowering like an coffein-loaded ice cold mate tea.

## Features
- **Multi-language support**: Translate between multiple languages simultaneously.
- **DeepL API integration**: Utilizes the DeepL API for high-quality translations.
- **User-friendly interface**: Built with Alpine.js and Bulma for a responsive and intuitive user experience.
- **Dark mode**: Automatically adapts to your system's theme settings.
- **Research translations**: Easily search translated words on google in correct language.
- **Easy clipboard access**: Copy translations to clipboard with a single click.

## Acknowledgements
- [DeepL API](https://www.deepl.com/pro#developer) for translation
- [Alpine.js](https://alpinejs.dev/) for frontend interactivity
- [Bulma](https://bulma.io/) for styling

## Run
### Dev
```bash
cd frontend
npm run dev

cd backend
npm run dev
```

### Prod
First, build the frontend, then start the backend. Alternatively, you may use the docker image.
```bash
cd backend
node main.js
```

## Build
The frontend gets built to `backend/public/` and is published on the `/` route.

```bash
# Build frontend
cd ./frontent
npm run build

# Generate the containers
docker compose build
```

## Docker
To run the application in a Docker container, you can use the provided `docker-compose.yml` file. Make sure to set the `API_KEY` environment variable in the `docker-compose.yml` file to your DeepL API key.
```bash
docker compose up -d
```

## Screenshots

![Screenshot 1](https://github.com/fhinok/translatemate/blob/0d5fd80ddd7ec92f41fac502665902e70ea884f1/screenshot1.jpg)
![Screenshot 2](https://github.com/fhinok/translatemate/blob/0d5fd80ddd7ec92f41fac502665902e70ea884f1/screenshot2.jpg)

## Future Plans
- Implement user authentication to save translation history.
- Posibility to add deepl API key via UI.
- Store translations in a database for faster access and saving on credits.
- Allow users to add more languages via UI.

## FAQ
**Q: How do I set up the DeepL API key?**

A: You can set the `API_KEY` environment variable in the `docker-compose.yml` file or in your `.env` file. See the [getting started section from Deepl docs](https://developers.deepl.com/docs/getting-started/intro) for more details.
