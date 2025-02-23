document.addEventListener("DOMContentLoaded", async function () {
    console.log("📡 Fetching Titanfall `[BUBBA]` servers...");

    const serverContainer = document.getElementById("server-list");

    async function fetchNorthstarServers() {
        try {
            console.log("🔄 Fetching Northstar servers from local JSON...");
            const response = await fetch("https://bubba.industries/northstar_servers.json");

            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

            const allNorthstarServers = await response.json();
            console.log("✅ Northstar API Response:", allNorthstarServers);

            const filteredServers = allNorthstarServers.filter(server =>
                server.name && server.name.toUpperCase().includes("[BUBBA]")
            );

            console.log("🎯 Filtered `[BUBBA]` Servers:", filteredServers);

            return filteredServers.map(server => ({
                name: server.name,
                status: checkHeartbeatStatus(server.lastHeartbeat),
                players: `${server.playerCount || 0} / ${server.maxPlayers || "Unknown"}`,
                link: `northstar://connect/${server.id}`
            }));
        } catch (error) {
            console.error("⚠ Failed to fetch Titanfall servers:", error);
            return [];
        }
    }

    function checkHeartbeatStatus(lastHeartbeat) {
        if (!lastHeartbeat) return "❌ Offline";
        return (Date.now() - lastHeartbeat) < 1800000 ? "✅ Online" : "❌ Offline";
    }

    async function loadTitanfallServers() {
        console.log("🔄 Loading Titanfall servers...");
        const northstarServers = await fetchNorthstarServers();

        if (northstarServers.length === 0) {
            serverContainer.innerHTML += `<p class="text-center text-red-500 font-bold">No Titanfall servers found.</p>`;
            return;
        }

        northstarServers.forEach(server => {
            const serverBox = document.createElement("a");
            serverBox.href = server.link;
            serverBox.target = "_blank";
            serverBox.className = "bg-gray-300 p-6 rounded-lg text-black shadow-md text-center transform transition-all hover:scale-105 hover:bg-gray-400 block";

            serverBox.innerHTML = `
                <h3 class="text-xl font-bold">${server.name}</h3>
                <p>Status: <span class="font-semibold">${server.status}</span></p>
                <p>Players: <span>${server.players}</span></p>
            `;

            serverContainer.appendChild(serverBox);
        });
    }

    loadTitanfallServers();
});
