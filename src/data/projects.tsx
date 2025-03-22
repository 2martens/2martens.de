import { byPrefixAndName, type IconDefinition } from "@awesome.me/kit-217da5ee1c/icons";
import type { ImageMetadata } from "astro";
import timetable from "../assets/cologne-overview.jpeg"

export interface Project {
    category: string;
    name: string;
    description: string;
    features: {
        name: string;
        description: string;
        icon: IconDefinition;
    }[];
    image: ImageMetadata;
    imageAltText: string;
    cta: {
        call: string;
        action: string;
        href: string;
    }
}

export const projects: Project[] = [
    {
        category: 'Modding',
        name: '24h Timetable Cologne-Aachen',
        description: 'I created a new 24h timetable for the route Cologne-Aachen.',
        features: [
            {
                name: '900+ playable services',
                description: 'Enjoy over 900 playable services, more than doubling the amount compared to the last DTG timetable.',
                icon: byPrefixAndName.fas["train"],
            },
            {
                name: 'Conductor mode',
                description: 'Introduced with Frankfurt-Fulda, you can now enjoy conductor mode on the DoSto RE 9 services.',
                icon: byPrefixAndName.fas["tickets-simple"],
            },
            {
                name: 'Looping timetable',
                description: 'No longer suffer empty platforms after crossing the midnight mark. This timetable starts right over, allowing theoretically to play forever.',
                icon: byPrefixAndName.fas["rotate"],
            },
        ],
        image: timetable,
        imageAltText: 'A large, modern train station with an arched glass and steel roof, filled with multiple red regional trains and a white high-speed train on separate tracks. The platforms have passengers walking, and blue signs with white text provide directions.',
        cta: {
            call: "Start playing now",
            action: "Download",
            href: "https://www.trainsimcommunity.com/mods/c3-train-sim-world/c111-timetables/i4387-cologne-aachen-timetable-2023-version-15"
        }
    }
]