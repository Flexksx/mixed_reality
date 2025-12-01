/**
 * Configuration and Story Data
 * Single Responsibility: Holds all configuration constants
 */

export const CONFIG = {
    LOADER_DELAY: 1500,
    VICTORY_DELAY: 1500,
    MARKER_IDS: {
        UNIVERSITY: 'marker-university',
        LAPTOP: 'marker-laptop',
        BOOKS: 'marker-books',
        BEER: 'marker-beer'
    },
    PROGRESS_DOTS: ['dot1', 'dot2', 'dot3', 'dot4'],
    SCAN_TARGETS: ['UNIVERSITY', 'LAPTOP', 'BOOKS', 'BEER']
};

export const STORY_DATA = {
    university: {
        title: "CHAPTER I: THE SEMESTER",
        story: `It's <span class="neon">Week 12</span> of the semester. Three major assignments due in <span class="neon">48 hours</span>. Your friends are throwing a party tonight. The question is: <span class="neon">what will you prioritize?</span>`,
        target: "UNIVERSITY",
        markerIndex: 0
    },
    laptop: {
        title: "CHAPTER II: THE GRIND",
        story: `Laptop open. Coffee brewing. <span class="neon">Assignment 1</span> stares back at you from the screen. You know you should focus, but your phone keeps buzzing with party invites. <span class="neon">Choose wisely.</span>`,
        target: "LAPTOP",
        markerIndex: 1
    },
    books: {
        title: "CHAPTER III: THE HUSTLE",
        story: `You hit the books. <span class="neon">3 hours</span> of focused studying. Notes organized, concepts mastered. The party can wait - you're on a roll. Your friends will understand. <span class="neon">Discipline pays off.</span>`,
        target: "BOOKS",
        markerIndex: 2
    },
    beerSuccess: {
        title: "CHAPTER IV: THE BALANCE",
        story: `Assignments submitted. <span class="neon">Grades: 85%</span>. You arrive at the party, exhausted but accomplished. Your friends cheer - they knew you'd make it. Tonight, you celebrate <span class="neon">together</span>. You've earned it. Balance achieved.`,
        target: "BEER",
        path: "success"
    },
    beerFailure: {
        title: "THE DROPOUT",
        story: `The party was fun. The semester? <span class="neon">Not so much.</span> Three failed courses. Academic probation. Your friends? They graduated. You didn't. Now you're figuring out life the hard way. <span class="neon">Priorities matter.</span>`,
        target: "BEER",
        path: "failure"
    }
};

export const PATHS = {
    SUCCESS: 'success',
    FAILURE: 'failure'
};

