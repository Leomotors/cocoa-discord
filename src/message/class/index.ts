import chalk from "chalk";

import { CocoaMessage, CogMessage } from "..";
import { commandsDict } from "../../base";

const muckStorage: { [cogName: string]: commandsDict<CocoaMessage> } = {};

/**
 * **Warning**: This feature is made possible with the existence of **Dark Magic**
 *
 * Or in normal people's word, This is experimental
 *
 * Equivalent to `CogMessage` for instance, you can use
 * ```js
 * addCog(new [your_extended_classname]())
 * ```
 */
export abstract class CogMessageClass implements CogMessage {
    name: string;
    description?: string;
    commands: commandsDict<CocoaMessage>;

    constructor(name: string, description?: string) {
        console.log(
            chalk.yellow("[CogMessageClass WARN] This feature is experimental")
        );
        this.name = name;
        this.description = description;
        this.commands = muckStorage[this.constructor.name] ?? {};

        for (const [_, cmd] of Object.entries(this.commands)) {
            cmd.func = cmd.func.bind(this);
        }
    }
}

/**
 * Example Usage
 * ```ts
 * @MessageCommand({ name: "ping", description: "pong!" })
 * async ping(ctx: Message, strp: string) {
 *   await ctx.reply("pong!");
 * }
 * ```
 * **Note**: If syntax look broken, blame your IDE.
 * You may look at harunon.js to see this in action
 */
export function MessageCommand(command: CocoaMessage["command"]) {
    return (
        cog: CogMessageClass,
        key: string,
        desc: TypedPropertyDescriptor<CocoaMessage["func"]>
    ) => {
        const muck = (muckStorage[cog.constructor.name] ??= {});

        if (muck[command.name]) {
            throw Error(`Duplicate Command Name: ${command.name}`);
        }

        if (desc.value) {
            muck[command.name] = { command, func: desc.value };
        } else {
            throw Error(`Unexpected Error: ${key}'s value is undefined`);
        }
    };
}
