document.addEventListener("DOMContentLoaded", async function () {
    console.log("📡 Fetching BattleMetrics game server data...");

    const serverContainer = document.getElementById("server-list");

    const otherServers = [
        { name: "US Minecraft Server", battlemetricsId: "32015250", link: "minecraft://bubba.serv.gs" },
        { name: "US Rust Server", battlemetricsId: "SERVER_ID_HERE", link: "steam://connect/bubba.serv.gs:28015" },
        { name: "US Valheim Server", battlemetricsId: "32015172", link: "steam://connect/bubba.serv.gs:2456" },
        { name: "EU Minecraft Server", battlemetricsId: "32015250", link: "minecraft://bubba.g-s.nu" },
        { name: "EU Rust Server", battlemetricsId: "SERVER_ID_HERE", link: "steam://connect/bubba.serv.nu:28015" },
        { name: "AU Valheim Server", battlemetricsId: "32015433", link: "steam://connect/bubba.serv.nu:2456" },
    ];

    async function checkBattleMetricsStatus(server) {
        console.log(`📡 Checking status for ${server.name} (BattleMetrics ID: ${server.battlemetricsId})`);

        try {
            const response = await fetch(`https://api.battlemetrics.com/servers/${server.battlemetricsId}`);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

            const data = await response.json();
            console.log(`✅ ${server.name} API Response:`, data);

            if (data.data && data.data.attributes) {
                const serverData = data.data.attributes;
                return {
                    status: serverData.status === "online" ? "✅ Online" : "❌ Offline",
                    players: `${serverData.players || 0} / ${serverData.maxPlayers || "Unknown"}`,
                };
            } else {
                throw new Error("Invalid BattleMetrics response");
            }
        } catch (error) {
            console.error(`${server.name} BattleMetrics API Error:`, error);
            return { status: "❌ Error", players: "-" };
        }
    }

    async function loadBattleMetricsServers() {
        console.log("🔄 Loading BattleMetrics servers...");

        for (const server of otherServers) {
            const serverBox = document.createElement("a");
            serverBox.href = server.link;
            serverBox.target = "_blank";
            serverBox.className = "bg-gray-300 p-6 rounded-lg text-black shadow-md text-center transform transition-all hover:scale-105 hover:bg-gray-400 block";

            serverBox.innerHTML = `
                <h3 class="text-xl font-bold">${server.name}</h3>
                <p>Status: <span id="status-${server.battlemetricsId}" class="font-semibold">Checking...</span></p>
                <p>Players: <span id="players-${server.battlemetricsId}">-</span></p>
            `;

            serverContainer.appendChild(serverBox);

            const statusData = await checkBattleMetricsStatus(server);
            document.getElementById(`status-${server.battlemetricsId}`).textContent = statusData.status;
            document.getElementById(`players-${server.battlemetricsId}`).textContent = statusData.players;
        }
    }

    loadBattleMetricsServers();
});
