export default function SubFactionChoice({ selectedArmy, selectedChapter }) {
    if (!selectedArmy) return null;

    const possibleSubFactions = selectedArmy.faction_info[3]; // Object where keys are sub-faction names
    let filteredSubFactions = [];

    if (selectedChapter !== "None" && selectedChapter !== "All Chapters") {
        filteredSubFactions = Object.entries(possibleSubFactions).filter(([subFactionName, subFactionData]) => {
            const hasOtherChapters = Array.isArray(subFactionData) && subFactionData.some((item) =>
                typeof item === "string" && item.includes("Chapter") && !item.includes(selectedChapter)
            );

            const includesSelectedChapter = Array.isArray(subFactionData) && subFactionData.some((item) =>
                typeof item === "string" && item.includes(selectedChapter)
            );

            const noChapterRestrictions = Array.isArray(subFactionData) && !subFactionData.some((item) =>
                typeof item === "string" && item.includes("Chapter")
            );

            return includesSelectedChapter || noChapterRestrictions || !hasOtherChapters;
        });
    } else {
        // If no chapter is selected, include all sub-factions
        filteredSubFactions = Object.entries(possibleSubFactions);
    }

    return (
        <>
            {filteredSubFactions.map(([subFactionName]) => (
                <option key={subFactionName} value={subFactionName}>
                    {subFactionName}
                </option>
            ))}
        </>
    );
}
