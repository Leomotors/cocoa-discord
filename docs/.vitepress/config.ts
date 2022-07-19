import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Cocoa Discord Utils",
    description:
        "Documentation for Cocoa Discord Utils, Library to simplify creating discord bots",
    lastUpdated: true,
    base: "/cocoa-discord-utils",

    themeConfig: {
        footer: {
            message:
                "Documentation generated by Vitepress. This project/library is released under the MIT License",
            copyright: "Copyright © 2022 Leomotors",
        },
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/Leomotors/cocoa-discord-utils",
            },
        ],
        editLink: {
            pattern:
                "https://github.com/Leomotors/cocoa-discord-utils/edit/main/docs/:path",
            text: "Suggest or contribute changes to this page",
        },

        nav: [
            {
                text: "Changelog",
                link: "/changelog",
            },
            {
                text: "TypeDoc",
                link: "https://leomotors.github.io/cocoa-discord-utils/typedoc",
            },
        ],
        sidebar: [
            {
                collapsible: true,
                text: "Introduction",
                items: [
                    {
                        text: "Overview",
                        link: "/introduction/overview",
                    },
                    {
                        text: "Examples",
                        link: "/introduction/examples",
                    },
                    {
                        text: "TypeDoc",
                        link: "https://leomotors.github.io/cocoa-discord-utils/typedoc",
                    },
                    {
                        text: "Migrate from V1 -> V2",
                        link: "/introduction/migrate",
                    },
                    {
                        text: "Release Changelog",
                        link: "/changelog",
                    },
                ],
            },
            {
                collapsible: true,
                text: "Blog",
                items: [
                    {
                        text: "Introducing V2",
                        link: "/blog/introducing-v2",
                    },
                ],
            },
            {
                collapsible: true,
                text: "Configuration",
                items: [
                    {
                        text: "Using .cocoarc",
                        link: "/configuration/cocoarc",
                    },
                ],
            },
            {
                collapsible: true,
                text: "Modules",
                items: [
                    {
                        text: "Main",
                        link: "/modules/main",
                    },
                    {
                        text: "Meta",
                        link: "/modules/meta",
                    },
                    {
                        text: "Template",
                        link: "/modules/template",
                    },
                    {
                        text: "Message & Slash",
                        link: "/modules/msgslash",
                    },
                ],
            },
            {
                collapsible: true,
                text: "Command Management System",
                items: [
                    {
                        text: "Basic Concept",
                        link: "/cms/basic",
                    },
                    {
                        text: "Advanced Decorator Syntax",
                        link: "/cms/decorator",
                    },
                    {
                        text: "Message Commands",
                        link: "/cms/message",
                    },
                    {
                        text: "Other Utilities",
                        link: "/cms/other",
                    },

                    {
                        text: "Event Handling",
                        link: "/cms/event",
                    },
                ],
            },
        ],
    },

    outDir: "../docs-dist",
});
