This is a GitHub repository search application built by consuming GitHub GraphQL API. Using this app, users can search for any GitHub repositories and see the detailed view of every repository.  

This app is hosted on Vercel. You can see the live preview [here](https://nextjs-graphql-search-app.vercel.app/) .

###### (Since I'm using the Hobby version of Vercel, it might be possible to run out of the Image optimization quota allowed for the month at the time you are previewing it. If you see [fallback placeholder images](https://github.com/nadun-malinda/graphql-search-app/blob/main/src/components/image/Image.tsx) where the actual images are placed, please bear with me and I promise it is better on your local :see_no_evil:)

## Technology stack
- NextJS
- TypeScript
- TailwindCSS
- Jest
- Playwright

## Getting Started
### Project setup on the local environment
- Clone this repository.
- You need node v18 or higher.
- Install the dependencies:
  
  ```bash
  npm install
  # or
  yarn
  ```
  
- Create two `.env` files at the root level of the project.
  - Copy the content of the `.env.example` file into a new file called `.env.local`. This file keeps the [GitHub Personal Access Token (PAT)](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) that needs to be used with the API to fetch repositories using GitHub GraphQL API.
    
  - Copy the content of the `.env.test.example` file into a new file called `.env.test.local`. This file also contains the same variables as `.env.local`, but this enables the test runners to pick `.env` variables safely while running unit and e2e tests.

- Then, run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 🚀



## Run tests

I have written both Unit tests and E2E tests for this app using Jest and Playwright. 

### Unit test
- Run the Unit tests:
  
  ```bash
  npm run test:unit
  # or
  yarn test:unit
  ```

- Run the E2E tests on headless mode:

  ```bash
  npm run test:e2e
  # or
  yarn test:e2e
  ```

- Run the E2E tests on the UI:

  ```bash
  npm run test:e2e:ui
  # or
  yarn test:e2e:ui
  ```
