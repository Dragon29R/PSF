import { RANKS_BY_TEAM, TEAM_DETAILS, ACCESSORIES_IDS, PSF_RANK_INDICES } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements: Main Form ---
    const form = document.getElementById('rtagForm');
    const teamSelect = document.getElementById('team');
    const rankSelect = document.getElementById('rank');
    const usernameInput = document.getElementById('username');
    const codenameInput = document.getElementById('codename');
    const bcaCheck = document.getElementById('bca');
    const outputEl = document.getElementById('output');
    const altTshirtWrap = document.getElementById('altTshirtWrap');
    const altTshirtCheck = document.getElementById('altTshirt');

    // --- DOM Elements: PSF Panel ---
    const appContainer = document.getElementById('app-container');
    const psfCustomization = document.getElementById('info-panel');
    const headwearSelect = document.getElementById('headwear');
    const maskSelect = document.getElementById('mask');
    const eyewearSelect = document.getElementById('eyewear');

    // --- Core Functions ---
    function handleFormSubmit(e) {
        e.preventDefault();

        // 1. Collect all form data into a single object
        const formData = {
            username: usernameInput.value.trim(),
            codenameRaw: codenameInput.value.trim(),
            team: teamSelect.value,
            rank: rankSelect.value,
            bca: bcaCheck.checked,
            altTshirt: altTshirtCheck.checked,
            headwear: headwearSelect.value,
            mask: maskSelect.value,
            eyewear: eyewearSelect.value
        };

        // 2. Validate required fields
        if (!formData.username) {
            outputEl.textContent = 'Please enter a username.';
            return;
        }

        if (!formData.codenameRaw) {
            outputEl.textContent = 'Please enter a codename.';
            return;
        }

        // 3. Sanitize codename for the command string
        formData.codename = formData.codenameRaw.replace(/"/g, '\\"');

        // 4. Generate and display the tags
        outputEl.textContent = generateTags(formData);
    }


    // --- UI Update Functions ---
    function updateRanks() {
        const selectedTeam = teamSelect.value;
        const newRanks = RANKS_BY_TEAM[selectedTeam] || [];

        rankSelect.innerHTML = ''; // Clear existing options

        newRanks.forEach(rankObj => {
            const option = document.createElement('option');
            option.value = rankObj.name;
            option.textContent = rankObj.name;
            rankSelect.appendChild(option);
        });
    }

    function updateDynamicOptions() {
        const selectedTeam = teamSelect.value;
        const selectedRankName = rankSelect.value;

        // Guard clauses for invalid state
        if (!selectedTeam || !selectedRankName) {
            togglePsfPanel(false);
            toggleAltTshirt(false);
            return;
        }

        const rankList = RANKS_BY_TEAM[selectedTeam] || [];
        const rankObj = rankList.find(r => r.name === selectedRankName);

        if (!rankObj) {
            togglePsfPanel(false);
            toggleAltTshirt(false);
            return;
        }

        // Check conditions
        const isPSF = selectedTeam === "Prometheus Security Force";
        const isSgtOrAbove = (rankObj.tier === "MR" || rankObj.tier === "HR" || rankObj.tier === "HC");

        // Toggle PSF Customization Panel
        if (isPSF) {
            const rankIndex = rankList.findIndex(r => r.name === selectedRankName);
            togglePsfPanel(true, rankIndex);
        } else {
            togglePsfPanel(false);
        }

        // Toggle Alt T-Shirt Option (Only show if PSF AND Sgt+)
        toggleAltTshirt(isPSF && isSgtOrAbove);
    }

    function toggleAltTshirt(show) {
        if (show) {
            altTshirtWrap.style.display = 'flex';
        } else {
            altTshirtWrap.style.display = 'none';
            altTshirtCheck.checked = false;
        }
    }

    function togglePsfPanel(show, rankIndex = 0) {
        if (show) {
            psfCustomization.style.display = 'block';
            appContainer.classList.add('side-panel-visible');

            // Filter customization options based on rank
            filterOptions(headwearSelect, rankIndex);
            filterOptions(maskSelect, rankIndex);
            filterOptions(eyewearSelect, rankIndex);
        } else {
            psfCustomization.style.display = 'none';
            appContainer.classList.remove('side-panel-visible');
        }
    }

    function filterOptions(selectElement, currentRankIndex) {
        const options = selectElement.querySelectorAll('option');
        let firstEnabledValue = null;

        options.forEach(option => {
            const requiredRankKey = option.dataset.rank;
            const requiredRankIndex = PSF_RANK_INDICES[requiredRankKey];

            if (currentRankIndex >= requiredRankIndex) {
                option.disabled = false;
                option.hidden = false;
                if (firstEnabledValue === null) {
                    firstEnabledValue = option.value;
                }
            } else {
                option.disabled = true;
                option.hidden = true;
            }
        });

        // Reset dropdown if the currently selected option becomes disabled
        if (selectElement.options[selectElement.selectedIndex].disabled) {
            const noneOption = selectElement.querySelector('option[value=""]');
            if (noneOption && !noneOption.disabled) {
                selectElement.value = "";
            } else {
                selectElement.value = firstEnabledValue || "";
            }
        }
    }


    // --- Command Generation Functions ---
    function generateTags(options) {
        const { team, rank } = options;

        // Get team/rank details
        const teamDetails = TEAM_DETAILS[team];
        const rankList = RANKS_BY_TEAM[team] || [];
        const rankObj = rankList.find(r => r.name === rank);

        if (!teamDetails || !rankObj) return "Error: Invalid team or rank.";

        const commands = [];

        // Build commands in sequence
        buildCoreTags(commands, options, teamDetails, rankObj);
        buildMorphTags(commands, options, rankObj);

        // Join all commands
        return 'run ' + commands.join(' & ');
    }

    function buildCoreTags(commands, options, teamDetails, rankObj) {
        const { username, codename, bca, team } = options;
        const { tier, level, health } = rankObj;

        // 1. Main rtag
        let rtag = `permrtag ${username} ${teamDetails.displayName} <br /> [${tier} - ${level}] ${rankObj.name}`;
        if (bca) {
            rtag += ' | BC:A';
        }
        commands.push(rtag);

        // 2. Codename
        commands.push(`permntag ${username} "${codename}"`);

        // 3. Color
        commands.push(`permcrtag ${username} ${teamDetails.color}`);

        // 4. Starter Gear
        if (team === "Prometheus Security Force" && tier === "HC") {
            commands.push(`startergear ${username} golden,clipboard,tablet,authorize`);
        } else {
            commands.push(`startergear ${username} ${teamDetails.starterItems},${level}`);
        }

        // 5. Health
        commands.push(`permmaxhealth ${username} ${health}`);
    }

    function buildMorphTags(commands, options, rankObj) {
        const { team, username } = options;

        // PSF needs a 'remove' command first
        if (team === "Prometheus Security Force") {
            commands.push(`permmorph ${username} remove`);
        }

        switch (team) {
            case "Pandora's Observers":
                buildPoMorph(commands, username, rankObj.name);
                break;
            case "Prometheus Security Force":
                buildPsfMorph(commands, options);
                break;
            case "Overseer":
                buildOverseerMorph(commands, username);
                break;
        }
    }

    function buildPoMorph(commands, username, rankName) {
        if (rankName === "Board of Research" || rankName === "Board Director") {
            commands.push(`permshirt ${username} 11455930608 11427392983`);
        } else {
            commands.push(`permshirt ${username} 8435120013 8435339348`);
        }
    }

    function buildOverseerMorph(commands, username) {
        commands.push(`permshirt ${username} 11455930608 11427392983`);
    }

    function buildPsfMorph(commands, options) {
        const { username, altTshirt, headwear, mask, eyewear } = options;

        // 1. Build Hat/Accessories
        let hatCommand = `permhat ${username} `;
        let hatAccessories = [
            // Base accessories
            'ivest', '15330913778', '15177437784', '15893978296',
            '15177801713', '92371339244528', 'holster', 'kneepads', '12577272243'
        ];
        let extraCommands = []; // For JNVG, etc.

        // Add Headwear
        const headwearId = ACCESSORIES_IDS.Headwear[headwear];
        if (headwearId) {
            if (headwearId.includes(' & ')) {
                const parts = headwearId.split(' & ');
                hatAccessories.push(parts[0]);
                extraCommands.push(parts[1].replace('USER', username));
            } else {
                hatAccessories.push(headwearId);
            }
        }

        // Add Mask
        const maskId = ACCESSORIES_IDS.Mask[mask];
        if (maskId) {
            hatAccessories.push(maskId);
        }

        // Add Eyewear
        const eyewearId = ACCESSORIES_IDS.Eyewear[eyewear];
        if (eyewearId) {
            hatAccessories.push(eyewearId);
        }

        // Push the main hat command
        commands.push(hatCommand + hatAccessories.join(','));

        // Push any extra commands (like JNVG)
        if (extraCommands.length > 0) {
            commands.push(...extraCommands);
        }

        // 2. Handle Shirt
        const shirtId = altTshirt ? '98701627132068' : '73972368297165';
        commands.push(`permshirt ${username} ${shirtId}`);

        // 3. Handle Pants
        commands.push(`permpants ${username} 128876333929054`);
    }


    // --- Initial Setup & Event Listeners ---
    form.addEventListener('submit', handleFormSubmit);

    teamSelect.addEventListener('change', () => {
        updateRanks();
        updateDynamicOptions();
    });

    rankSelect.addEventListener('change', updateDynamicOptions);

    // Initial setup on page load
    updateRanks();
    updateDynamicOptions();
});