import { ChatInputCommandInteraction, User } from "discord.js";

import {
    Param,
    CogSlashClass,
    SlashCommandV2 as SlashCommand,
    V2Stores,
} from "../src/slash/class";

class V2Test extends CogSlashClass {
    constructor() {
        super("V2Test");
    }

    @SlashCommand("The command that say hi to specific person")
    async sayhi(
        ctx: SlashCommand.Context,
        @Param.String("Message to say")
        @Param.Choices(["Gay", "Bruh"])
        msg: Param.String.Type,
        @Param.User("User to greet") user: Param.User.Type
    ) {}
}

describe("Slash Command Class V2", () => {
    it("Pass", () => {
        console.log({ V2Stores: JSON.stringify(V2Stores, null, 4) });
    });
});
