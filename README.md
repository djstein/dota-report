# DOTA Report | [dota-report.vercel.app](https://dota-report.vercel.app/)

View the app at [https://dota-report.vercel.app/](https://dota-report.vercel.app/)
Run the CLI via `./dota-report generate`

## Examples of report generation

```bash
# Run the default, get the top 10 teams and their players by total team experience
./dota-report generate

# Supply a limit on the number of teams returned
./dota-report generate --limit 1 --format json

# Output the remote in JSON
./dota-report generate --limit 1 --format json

# Save the report to a file called report.yaml
./dota-report generate --limit 1 --format yaml --output report.yaml
```

## About

The frontend Next.js application and the dota-report CLI tool share a common SDK to interact with the OpenDota API.
The frontend will do server side render with the SDK to obtain the team or player data and display this on the user's browser.
The CLI will simply call the SDK directly, and format it into YAML or JSON.

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
