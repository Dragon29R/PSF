document.addEventListener('DOMContentLoaded', () => {

    const ranksByTeam = {
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
            { name: "Sergeant", tier: "MR", level: "L2", health: 12 },
            { name: "Sergeant Second Class", tier: "MR", level: "L2", health: 12 },
            { name: "Sergeant First Class", tier: "MR", level: "L2", health: 12 },
            { name: "Master Sergeant", tier: "MR", level: "L2", health: 12 },
            { name: "Sergeant Major", tier: "MR", level: "L2", health: 12 },
            { name: "Warrant Officer", tier: "MR", level: "L2", health: 12 },
            { name: "Second Lieutenant", tier: "HR", level: "L3", health: 175 },
            { name: "First Lieutenant", tier: "HR", level: "L3", health: 175 },
            { name: "Captain", tier: "HC", level: "L3", health: 200 },
            { name: "Major", tier: "HC", level: "L3", health: 200 }
        ]
    };

    const teamDisplayName = {
        "Pandora's Observers": "[FGOI] Prometheus Laboratories | Pandora's Observers",
        "Prometheus Security Force": "[FGOI] Prometheus Laboratories | Security Force",
    };

    const teamSelect = document.getElementById('team');
    const rankSelect = document.getElementById('rank');

    function updateRanks() {
        const selectedTeam = teamSelect.value;
        const newRanks = ranksByTeam[selectedTeam] || [];

        rankSelect.innerHTML = '';

        newRanks.forEach(rankObj => {
            const option = document.createElement('option');
            option.value = rankObj.name;
            option.textContent = rankObj.name;
            rankSelect.appendChild(option);
        });
    }

    // ensure output area exists
    let outputEl = document.getElementById('output');
    if (!outputEl) {
        outputEl = document.createElement('pre');
        outputEl.id = 'output';
        outputEl.style.whiteSpace = 'pre-wrap';
        outputEl.style.marginTop = '1rem';
        const form = document.getElementById('rtagForm');
        form.parentNode.insertBefore(outputEl, form.nextSibling);
    }

    function generateTags(username, codename, team, rankName, bca) {
        const teamLabel = teamDisplayName[team] || team;
        const rankList = ranksByTeam[team] || [];
        const rankObj = rankList.find(r => r.name === rankName) || { tier: "MR", level: "L2" };
        const tier = rankObj.tier;
        const level = rankObj.level;
        const health = rankObj.health;

        // main rtag + optional BC:A
        let left = `permrtag ${username} ${teamLabel} <br /> [${tier} - ${level}] ${rankName}`;
        if (bca) left += ' | BC:A';

        // optional permntag
        const permntagPart = codename ? ` & permntag ${username} "${codename}"` : '';

        // permcrtag color + startergear per team (append the rank level in parentheses)
        const color = team === "Pandora's Observers" ? 'cyan' : team === "Prometheus Security Force" ? 'gray' : 'cyan';
        const starterItems = team === "Pandora's Observers"
            ? 'pistol,clipboard,tablet,authorize'
            : 'aa-12,arx-200,shield';
        const permcr = `permcrtag ${username} ${color}`;
        const starter = `startergear ${username} ${starterItems},${level}`;
        const healthCmd = `permmaxhealth ${username} ${health}`;
        const removemorph = `permmorph ${username} remove`;
        // example:
        // permrtag User  [FGOI] ... <br /> [MR - L2] Rank & permntag User "Code" & permcrtag User gray & startergear User aa-12,arx-200,shield,(L2)
        return `${left}${permntagPart} & ${permcr} & ${starter} & ${healthCmd} & ${removemorph}`;
    }

    const form = document.getElementById('rtagForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const codenameRaw = document.getElementById('codename').value.trim();
        const team = teamSelect.value;
        const rank = rankSelect.value;
        const bca = document.getElementById('bca').checked;

        if (!username) {
            outputEl.textContent = 'Enter a username.';
            return;
        }

        const safeCodename = codenameRaw ? codenameRaw.replace(/"/g, '\\"') : '';

        outputEl.textContent = generateTags(username, safeCodename, team, rank, bca);
    });

    teamSelect.addEventListener('change', updateRanks);
    updateRanks();
});