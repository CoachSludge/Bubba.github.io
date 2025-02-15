document.addEventListener("DOMContentLoaded", function () {
    const teamMembers = [
        { name: "Coach", title: "Lead Dev", image: "https://cdn.discordapp.com/avatars/490984028283994112/2831042b2b5e5d8bafff538aa84e4cb5?size=1024", url: "https://guns.lol/coachsludge" },
                { name: "Rice", title: "Lead Mod Dev", image: "https://cdn.discordapp.com/avatars/1065484017153101864/c5f9acd974b296c4a1a38916d3e9625b?size=1024", url: "https://example.com/rice" },
                                { name: "Solicify", title: "Mod Dev", image: "https://cdn.discordapp.com/avatars/1102266027057881148/99f205edf601615b26291a366bcde21d?size=1024", url: "https://example.com/solicify" },
        { name: "Alas", title: "Community Manager", image: "https://cdn.discordapp.com/avatars/1136104472536416307/a_41f244d428ad70f89ad4097b27df1fe0?size=1024", url: "https://example.com/alas" },
                { name: "Schelm", title: "Community Ambassador", image: "https://cdn.discordapp.com/avatars/937714479360249888/3dd0ff1c11f015ea7cb09bc035f3fcb8?size=1024", url: "https://example.com/schelm" },
        { name: "Dane", title: "Server Admin", image: "https://cdn.discordapp.com/avatars/1062613410136723526/44b53274b829c1275704d5837be7de2c?size=1024", url: "https://example.com/dane" }

    ];

    const supporters = [
        { name: "Ghost", title: "Supporter", image: "https://cdn.discordapp.com/avatars/123456789012345678/abcdef1234567890?size=1024", url: "https://example.com/ghost" },
        { name: "Maverick", title: "Supporter", image: "https://cdn.discordapp.com/avatars/987654321098765432/abcdef0987654321?size=1024", url: "https://example.com/maverick" }
    ];

    const teamContainer = document.getElementById("team-list");
    const supportersContainer = document.getElementById("supporters-list");

    function createMemberCard(member) {
        const memberCard = document.createElement("a");
        memberCard.href = member.url;
        memberCard.target = "_blank"; // Opens in a new tab
        memberCard.className = "bg-gray-300 p-6 rounded-lg text-black shadow-md text-center transform transition-all hover:scale-105 hover:bg-gray-400";

        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="mx-auto w-24 h-24 rounded-full border-2 border-red-500">
            <h3 class="mt-4 text-xl font-bold">${member.name}</h3>
            <p class="text-gray-600">${member.title}</p>
        `;

        return memberCard;
    }

    // Add Team Members
    teamMembers.forEach(member => {
        teamContainer.appendChild(createMemberCard(member));
    });

    // Add Supporters
    supporters.forEach(supporter => {
        supportersContainer.appendChild(createMemberCard(supporter));
    });
});
