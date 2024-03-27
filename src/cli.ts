#!/usr/bin/env node

import { Argv } from "yargs";
import { getTeams } from "./lib/dota-sdk";

function serve(port: string) {
  console.info(`Serve on port ${port}.`);
}

require("yargs")
  .command(
    "generate",
    "Generate Report",
    (yargs: Argv) => {
      yargs.option("limit", {
        describe: "Number of teams to include",
        default: 10,
      });
    },
    async (args: any) => {
      if (args.limit) {
        console.log(`Generating report for ${args.limit} teams.`);
      }
      const proPlayers = await getTeams({ limit: args.limit });
      console.log(proPlayers);
    },
  )
  .help().argv;
