#!/usr/bin/env node

import { writeFile } from "fs/promises";
import YAML from "yaml";
import { Argv } from "yargs";
import { compileTeamsByProPlayers } from "./lib/dota-sdk";

require("yargs")
  .command(
    "generate",
    "Generate Report",
    (yargs: Argv) => {
      yargs.option("limit", {
        describe: "Number of teams to include",
        default: 10,
      });
      yargs.option("format", {
        describe: "Format of YAML or JSON",
        default: "yaml",
      });
      yargs.option("output", {
        describe: "Output file",
        default: undefined,
      });
    },
    async (args: any) => {
      const proPlayers = await compileTeamsByProPlayers({ limit: args.limit });
      let outputString = "";
      if (args.format === "yaml") {
        outputString = YAML.stringify(proPlayers);
      } else {
        outputString = JSON.stringify(proPlayers, null, 2);
      }
      if (args.output) {
        await writeFile(args.output, outputString);
      } else {
        console.log(outputString);
      }
    },
  )
  .help().argv;
