import {
  ActivityGroupLoader,
  ActivityManager,
  Cocoa,
  checkLogin,
} from "cocoa-discord";
import { MessageCenter } from "cocoa-discord/message";
import { SlashCenter } from "cocoa-discord/slash";
import { CocoaIntent } from "cocoa-discord/template";

import { Client } from "discord.js";

import { MainMessageCog } from "./commands/main.message.js";
import { MainSlashCog } from "./commands/main.slash.js";
import { style } from "./commands/styles.js";
import { GuildIds } from "./environment.js";

const client = new Client(
  new CocoaIntent()
    .useGuildSlash()
    .useGuildMessage()
    .useDirectMessage()
    .useReadMessage(),
);

const mcenter = new MessageCenter(client, { prefixes: ["!"] });
const scenter = new SlashCenter(client, GuildIds);

// ? Edit data/activites.json to customize, or delete this line to not use activities
const activity = new ActivityGroupLoader("data/activities.json");

mcenter.addCogs(new MainMessageCog());
mcenter.useHelpCommand(style);
mcenter.on("error", async (name, err, msg) => {
  Cocoa.log(
    `Command ${name} invoked by ${msg.author.tag} encounter error at ${msg.guild?.name}: ${err}`,
  );
  await msg.channel?.send(`Sorry, error occured: ${err}`);
});

scenter.addCogs(new MainSlashCog());
scenter.useHelpCommand(style);
scenter.on("error", async (name, err, ctx) => {
  Cocoa.log(
    `Command ${name} invoked by ${ctx.user.tag} encounter error at ${ctx.guild?.name}: ${err}`,
  );
  await ctx.channel?.send(`Sorry, error occured: ${err}`);
});

const activityManager = new ActivityManager(activity, client);

client.on("ready", (cli) => {
  console.log(
    `Logged in as ${cli.user.tag}, took ${process.uptime().toFixed(3)} seconds`,
  );
  scenter.syncCommands();
  activityManager.nextActivity();
});

checkLogin(client, process.env.DISCORD_TOKEN);
