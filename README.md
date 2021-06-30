# EisBuk

## Booking management for ice skating lessons

## Details

### admin:

- login as an admin in an organization.
- create slots
- slots can be customized with the following:
  - duration
  - type: on or off-ice
  - category: competitive level of the athletes in that slot
- mark athletes as present or absent in each slot.
- view and manage your slots in calendar view.

### athlete:

- view available slots without logging in, using a uinque url.
- book a slot according to their level and the type of session they need.
- view your booked slots in calendar view.

## Built with:

- - [ReactJS](https://breakdance.github.io/breakdance/) - open-source JavaScript library for building user interfaces.

## Enabling alpha auth emulation

Make sure you have the latest firebase-tools installed (>=8.11.0)

    firebase --version
    8.12.0

Enable the expreimental auth emulator:

    firebase --open-sesame authemulator

## Working locally on eisbuk-admin

Enter the eisbuk-admin directory:

    cd eisbuk-admin

Start the firebase emulators:

    yarn emulators:start

The `--inspect-functions` allows you to connect with a debugger, for instance chrome from chrome://inspect/#devices or from the VSCode debugger.

Start the webpack development server as usual:

    yarn start

Head your browser to http://localhost:3000/debug and click the "Create admin test users" button.

Start storybook

    yarn storybook

## Contribution

EisBuk is made with passion for openSource and with the idea that anyone in the world who needs a similar webApp can simply fork and use it with minimal changes.

- For pre-commit hooks to validate before pushing, you need the following prerequisites:
  - [pip](https://pip.pypa.io/en/stable/installing/) - pip is a command line program.
  - [pre-commit](https://pre-commit.com/) - `pip install pre-commit`

## Create new React components

We use [PLOP](https://plopjs.com/) to scaffold components.
For easy access, install plop globally:

    npm install -g plop

Then `cd` into `eisbuk-admin` directory and create new component(s) with (guess what):

    plop

## Deploying

make sure you have the firebase client installed:

    npm install -g firebase

and login:

    firebase login

To deploy assets you can run:

    make deploy-site

To run tests for functions run:

    make test-functions
