document.addEventListener("DOMContentLoaded", function () {
    const servers = [
        { name: "Minecraft Server", ip: "148.222.41.206", port: 25565, game: "minecraft" },
        { name: "Rust Server", ip: "148.222.41.206", port: 28015, game: "rust" },
        { name: "Titanfall 2 Server", ip: "148.222.41.206", port: 37015, game: "titanfall2" },
        { name: "Northstar Server", ip: "148.222.41.206", port: 37016, game: "northstar" },
        { name: "Valheim Server", ip: "148.222.41.206", port: 2457, game: "valheim" }
    ];

    const serverContainer = document.getElementById("server-list");

    servers.forEach((server) => {
        const serverBox = document.createElement("div");
        serverBox.className = "bg-gray-300 p-6 rounded-lg text-black shadow-md text-center";
        serverBox.innerHTML = `
            <h3 class="text-xl font-bold">${server.name}</h3>
            <p>Status: <span id="status-${server.ip}" class="font-semibold">Checking...</span></p>
            <p>Players: <span id="players-${server.ip}">-</span></p>
        `;
        serverContainer.appendChild(serverBox);

        if (server.game === "minecraft") {
            fetch(`https://api.mcsrvstat.us/2/${server.ip}:${server.port}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(`status-${server.ip}`).textContent = data.online ? "✅ Online" : "❌ Offline";
                    document.getElementById(`players-${server.ip}`).textContent = data.online ? `${data.players.online} / ${data.players.max}` : "-";
                })
                .catch(() => {
                    document.getElementById(`status-${server.ip}`).textContent = "❌ Error";
                });
        } else {
            pingServer(server.ip, server.port, server.game, serverBox);
        }
    });

    function pingServer(ip, port, game, serverBox) {
        const socket = new WebSocket(`ws://${ip}:${port}`);

        socket.onopen = function () {
            document.getElementById(`status-${ip}`).textContent = "✅ Online";
            document.getElementById(`players-${ip}`).textContent = "Fetching...";
        };

        socket.onerror = function () {
            document.getElementById(`status-${ip}`).textContent = "❌ Offline";
            document.getElementById(`players-${ip}`).textContent = "-";
        };

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if (game === "rust") {
                document.getElementById(`players-${ip}`).textContent = `${data.players} / ${data.maxPlayers}`;
            } else if (game === "titanfall2" || game === "northstar") {
                document.getElementById(`players-${ip}`).textContent = `${data.playerCount} / ${data.maxPlayers}`;
            } else if (game === "valheim") {
                document.getElementById(`players-${ip}`).textContent = data.players ? `${data.players} online` : "-";
            }
        };
    }
});
