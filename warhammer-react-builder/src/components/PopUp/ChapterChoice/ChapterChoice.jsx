export default function ChapterChoice() {
    const chapters = [
        "Ultramarines",
        "Blood Angels",
        "Dark Angels",
        "Space Wolves",
        "Imperial Fists",
        "Iron Hands",
        "White Scars",
        "Raven Guard",
        "Black Templars",
        "Salamanders"
    ];
    
    
    return ( 
        <>
        {chapters.map((chapter,idx) => {
            return (
                <option key={idx} value={chapter}>{chapter}</option>
                )
            })}
            </>
    )
}