# Post Viewer

## Tech Stack

Next.js, TypeScript, React testing library, Tailwind

## Setup

git clone repo
yarn install
yarn dev

## Features

- Fetch posts
- View comments
- Pagination
- Client-side search
- Auth simulation
- Dark mode
- API caching

## Tests

yarn test

## CI/CD

GitHub Actions pipeline runs tests on merge.

## Tradeoffs

- Used client-side filtering due to API limitations
- Mock auth implemented since backend was not provided
