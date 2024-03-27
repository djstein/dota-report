# DOTA Report | [dota-report.vercel.app](https://dota-report.vercel.app/)

View the app at [https://dota-report.vercel.app/](https://dota-report.vercel.app/)
Run the CLI via `./dota-report generate`

## Development - Getting Started

### Prerequisite: Install Node

As a prerequisite you must have Node installed on your development machine.
It is recommended to have `nvm` installed to manage Node versions.

```bash
# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# source your your profile for the current terminal
source ~/.zshrc

# verify nvm exists
command -v nvm

# install the LTS node
nvm install --lts

# use LTS as the default
nvm use --lts
```

### Clone, install, and run the codebase

```bash
# Clone the repo
git clone git@github.com:djstein/dota-report.git

# Move into the directory
cd dota-report

# Install NPM Dependencies
npm install

# Run the Dev Server
npm run dev

# OR build the cli
npm run build:cli
# run it via:
./dota-report
```

You can now navigate to [http://localhost:3000](http://localhost:3000) and view the application.

# TODO:

- add experience to player, which is full_history_time to now
- api gets number of teams
- provide number of teams to cli, which goes to api
- output file destination
- get total experience of a team
- order teams by experience
