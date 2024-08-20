Tech Stack of this Project:
1. Frontend and Backend - Next.js (or Backend)
2. Express - Auxilary backends
3. Turborepo
4. Postgres Database
5. Prisma ORM
6. Tailwind
 


 

- Bootstrap Turborepo Project
- Made user-app, merchant-app folder in apps
- Tailwind added
    - Get boilerplate commands from tailwind website
    - Configure the tailwind.config file
- Adding Prisma
    - Make a db folder in packages
    - Initialize npm and ts
    - Get a connection string from neon or aiven (I've used docker postgres container in developement)
    - Initialize Prisma and check the database running...
- DB
    - Made model User, Merchant
    - Migrated and created prisma client
- Made some ui components (easy for tests)
- Created auth endpoint and logic using nextauth in user(credentials login) and merchant(google login)
- Created Store (recoil) atoms, hooks
- On Ramping("Onramp to bank" typically refers to the process or method by which users can convert or transfer funds from a digital or non-traditional currency (such as cryptocurrency) into traditional fiat currency that can be deposited into a bank account):
    - Make a new backend server to stimulate OnRamp Transaction.
    (lets say Hdfc, tells that user charged 2000 and send to, lets say propayn kotak bank, then we can credit 2000 to user propayn wallet.)
    - Create a dummy bank server with an endpoint
- Created transfer ui
- Finished Onramp action for onclick of transfer.
- Simulating the bank webhook which on hitting success the request and amount added to the wallet.
- Created a Sidebar, P2P Transfer and /p2p ui.
- Created action to make person to person payment through the phone number that is already present in the database.
- BUG FIX: Parallel transfers from the wallet restricted through locking the row until transaction completes.
    (Prisma doesnt support lock, which is why we send a raw sql query directly that will lock the specific row, until the txn succeeds or fails)
    Thats how I've done balance protection.
- Added P2P ledger schema to schema.prisma
- Created action to fetch OnRamp Transactions
- Created action to fetch P2P Transactions
- Completey made new UI for dashboard, transfer and paypage
- Fully Functional UI Version 1 with features: add balance, transfer person to person
- Started testing Edge Cases
























































# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
