import { assert, expect, use as ChaiUse } from "chai";
import ChaiProm from "chai-as-promised";
ChaiUse(ChaiProm);

import { Client, CommandInteraction } from "discord.js";

import { CogMessage, MessageCenter } from "../src/message";
import { CogSlash, SlashCenter } from "../src/slash";
import { CogSlashClass, SlashCommand } from "../src/slash/class";

const client = new Client({ intents: [] });
const mcenter = new MessageCenter(client, { mention: true }, ["1", "2"]);
const scenter = new SlashCenter(client, ["123"]);

const CorrectMCog: CogMessage = {
    name: "Cocoa",
    commands: {
        test: {
            command: {
                name: "test",
            },
            func: async (msg) => {},
            guild_ids: ["3"]
        },
        play: {
            command: {
                name: "play",
            },
            func: async (msg) => {},
            guild_ids: ["1", "3"]
        },
    },
};

const WrongMCog: CogMessage = {
    name: "Wrong Cocoa",
    commands: {
        play: {
            command: {
                name: "test",
            },
            func: async (ctx) => {},
        },
        test: {
            command: {
                name: "play",
            },
            func: async (ctx) => {},
        },
    },
};

const CorrectSCog: CogSlash = {
    name: "Cocoa",
    commands: {
        test: {
            command: {
                name: "test",
                description: "bruh",
            },
            func: async (ctx) => {},
            guild_ids: ["555"],
        },
        play: {
            command: {
                name: "play",
                description: "bruh",
            },
            func: async (ctx) => {},
        },
    },
};

const WrongSCog: CogSlash = {
    name: "Cocoa",
    commands: {
        play: {
            command: {
                name: "test",
                description: "bruh",
            },
            func: async (ctx) => {},
        },
        test: {
            command: {
                name: "play",
                description: "bruh",
            },
            func: async (ctx) => {},
        },
    },
};


describe("[command] /message & /slash", () => {
    describe("Message Center", testMessage);
    describe("Slash Center", testSlash);
    describe("Slash Class Cog", testClass);
});

function testMessage() {
    it("Validation should Pass", () => {
        mcenter.addCogs(CorrectMCog);
        mcenter.validateCommands();
    });

    it("Should be able to union guild_ids", () => {
        // @ts-ignore yeet: Access protected property
        const gids = mcenter.unionAllGuildIds();

        assert.deepEqual(gids, ["1", "2", "3"]);
    });

    it("Validation should Fail (Illegal Cog: Command name mismatch)", async () => {
        mcenter.addCogs(WrongMCog);
        await expect(mcenter.validateCommands()).to.be.rejected;
    });

    it("Validation should Fail (Duplicate cog names)", async () => {
        // @ts-ignore to yeet all the cogs
        mcenter.cogs = [];
        mcenter.addCogs(CorrectMCog, CorrectMCog);
        await expect(mcenter.validateCommands()).to.be.rejected;
    });

    it("Check Criteria: Mention", () => {
        // @ts-ignore lol
        client.user = { id: "69420112116441112" };
        assert.equal(
            // @ts-ignore yeeett
            mcenter.checkCriteria({
                content: "Hello <@69420112116441112>, you are SIMP",
            }),
            "Hello , you are SIMP"
        );
    });

    it("Check Criteria: Prefixes", () => {
        // @ts-ignore lol
        mcenter.criteria = { prefixes: ["simp"] };
        assert.equal(
            // @ts-ignore
            mcenter.checkCriteria({ content: "simpplay daydream cafe" }),
            "play daydream cafe"
        );
        assert.isUndefined(
            // @ts-ignore
            mcenter.checkCriteria({ content: "play daydream cafe pls" })
        );
    });
}

function testSlash() {
    it("Validation should Pass", () => {
        scenter.addCogs(CorrectSCog);
        scenter.validateCommands();
    });

    it("Should be able to union guild_ids", () => {
        // @ts-ignore yeet: Access protected property
        const gids = scenter.unionAllGuildIds();

        assert.deepEqual(gids, ["123", "555"]);
    });

    it("Validation should Fail (Illegal Cog: Command name mismatch)", async () => {
        scenter.addCogs(WrongSCog);
        await expect(scenter.validateCommands()).to.be.rejected;
    });

    it("Validation should Fail (Duplicate cog names)", async() => {
        // @ts-ignore to yeeeet all the cogs
        scenter.cogs = [];
        scenter.addCogs(CorrectSCog, CorrectSCog);
        await expect(scenter.validateCommands()).to.be.rejected;
    });
}

function testClass() {
    it("Should equivalent to CorrectSCog, Decorator should resolve correctly", async () => {
        class CSCog extends CogSlashClass {
            constructor() {
                super("Cocoa");
            }

            @SlashCommand({name: "test", description: "bruh"}, ["12345"])
            // @ts-ignore
            async test(ctx: CommandInteraction) {}

            @SlashCommand({name: "play", description: "bruh"})
            // @ts-ignore
            async play(ctx: CommandInteraction) {}
        }
        const cog = new CSCog();
        await cog.presync();
        assert.equal(cog.name, CorrectSCog.name);
        assert.equal(cog.description, CorrectSCog.description);
        assert.equal(cog.commands.test.command.name, CorrectSCog.commands.test.command.name);
        assert.equal(cog.commands.play.command.name, CorrectSCog.commands.play.command.name);
        assert.deepEqual(cog.commands.test.guild_ids, ["12345"]);
    });
}
