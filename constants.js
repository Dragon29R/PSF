export const RANKS_BY_TEAM = {
    "Pandora's Observers": [
        { name: "Intern", tier: "LR", level: "L2", health: 125 },
        { name: "Junior Researcher", tier: "LR", level: "L2", health: 125 },
        { name: "Researcher", tier: "LR", level: "L2", health: 125 },
        { name: "Senior Researcher", tier: "MR", level: "L2", health: 125 },
        { name: "Leading Researcher", tier: "MR", level: "L2", health: 125 },
        { name: "Chief Researcher", tier: "MR", level: "L2", health: 125 },
        { name: "Head Researcher", tier: "MR", level: "L2", health: 125 },
        { name: "Professor", tier: "MR", level: "L2", health: 125 },
        { name: "Research Governor", tier: "HR", level: "L3", health: 125 },
        { name: "Board of Research", tier: "HR", level: "L3", health: 125 },
        { name: "Board Director", tier: "HC", level: "L3", health: 150 }
    ],
    "Prometheus Security Force": [
        { name: "Trainee", tier: "LR", level: "L2", health: 125 },
        { name: "Private", tier: "LR", level: "L2", health: 125 },
        { name: "Private First Class", tier: "LR", level: "L2", health: 125 },
        { name: "Specialist", tier: "LR", level: "L2", health: 125 },
        { name: "Corporal", tier: "LR", level: "L2", health: 125 },
        { name: "Sergeant", tier: "MR", level: "L2", health: 150 },
        { name: "Sergeant Second Class", tier: "MR", level: "L2", health: 150 },
        { name: "Sergeant First Class", tier: "MR", level: "L2", health: 150 },
        { name: "Master Sergeant", tier: "MR", level: "L2", health: 150 },
        { name: "Sergeant Major", tier: "MR", level: "L2", health: 150 },
        { name: "Warrant Officer", tier: "MR", level: "L2", health: 150 },
        { name: "Second Lieutenant", tier: "HR", level: "L3", health: 175 },
        { name: "First Lieutenant", tier: "HR", level: "L3", health: 175 },
        { name: "Captain", tier: "HC", level: "L3", health: 200 },
        { name: "Major", tier: "HC", level: "L3", health: 200 }
    ],
    "Overseer": [
        { name: "Advisor", tier: "HC", level: "L3", health: 200 },
        { name: "Founder", tier: "HC", level: "L3", health: 200 },
        { name: "Administrative Officer", tier: "HC", level: "L3", health: 200 },
        { name: "Chief Operations Officer", tier: "HC", level: "L3", health: 200 },
        { name: "Chief Executive Officer", tier: "HC", level: "L3", health: 200 }
    ]
};

export const PSF_RANK_INDICES = {
    'all': 0,
    'corporal': 4,
    'sergeant': 5,
    'master_sergeant': 8
};

export const TEAM_DETAILS = {
    "Pandora's Observers": {
        displayName: "[FGOI] Prometheus Laboratories | Pandora's Observers",
        color: '127 255 212',
        starterItems: 'pistol,clipboard,tablet,authorize'
    },
    "Prometheus Security Force": {
        displayName: "[FGOI] Prometheus Laboratories | Security Force",
        color: 'gray',
        starterItems: 'aa-12,arx-200,shield'
    },
    "Overseer": {
        displayName: "[FGOI] Prometheus Laboratories | Overseer",
        color: '1 94 179',
        starterItems: 'Golden,clipboard,tablet'
    }
};

export const ACCESSORIES_IDS = {
    "Headwear": {
            "grey_helmet": "17172865990,136915759462771,103647562768082,jnvg & permcolornvg USER 255 255 255",
            "grey_cap": "15330081200",
            "grey_beanie": "12884870020",
            "black_helmet": "129351084728323,136915759462771,103647562768082,jnvg & permcolornvg USER 255 255 255",
            "black_cap": "15330086464,4036737464",
            "black_beanie": "12884824800,4036737464",
            "black_beret": "10788217931",
    },
    "Mask": {
            "wolf_gray_deadbird_balaclava": "104054967792175",
            "wolf_grey_yastrub_balaclava": "87871021598301",
            "black_deadbird_balaclava": "99852547995142",
            "black_yastrub_balaclava": "124522897344575",
            "tactical_balaclava": "4753644287"
    },
    "Eyewear": {
            "black_goggles": "8263401404",
            "clear_bowcaster_shades": "13080373830",
            "yastrub_ballistic_glasses": "80999937958294",
            "black_shades": "14078322040",
            "black_shades_2": "4507911797"
    }


};
