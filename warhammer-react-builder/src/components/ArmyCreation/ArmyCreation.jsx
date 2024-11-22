import { useEffect, useState } from "react";
import UnitRules from "../UnitRules/UnitRules";
import styles from "./ArmyCreation.module.css";

export default function ArmyCreation({ unitsInfo, addUnit, colour, selectedArmy, selectedChapter }) {
    const [showUnit, setShowUnit] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [allUnitInfo, setAllUnitInfo] = useState([]);

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

    // Initialize or update `allUnitInfo` whenever `unitsInfo` changes
    useEffect(() => {
        setAllUnitInfo(unitsInfo);
    }, [unitsInfo]);

    // Filter `allUnitInfo` based on `selectedChapter`
    useEffect(() => {
        if (selectedChapter !== "None" && Object.keys(unitsInfo).length) {
            const filteredUnits = unitsInfo.filter(
                (unit) =>
                    unit.unit_data[6].includes(selectedChapter) ||
                    !chapters.some((chapter) => unit.unit_data[6].includes(chapter))
            );
            setAllUnitInfo(filteredUnits);
        }
    }, [unitsInfo, selectedChapter]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const sortThis = (object) => {
        return Object.entries(object).sort((a, b) => {
            const first = a[1].unit_data[0];
            const second = b[1].unit_data[0];
            return first.localeCompare(second);
        });
    };

    const handleClick = (e, unitData) => {
        if (showUnit) {
            showUnit.style.color = "#dadada";
        }
        e.target.style.color = colour;
        setSelectedUnit(unitData);
        setShowUnit(e.target);
    };

    if (Object.keys(allUnitInfo).length !== 0) {
        // Categorize and sort units
        const characters = sortThis(
            allUnitInfo.filter((unit) => unit.unit_data[1] === "Characters")
        );
        const battleline = sortThis(
            allUnitInfo.filter((unit) => unit.unit_data[1] === "Battleline")
        );
        const dedicatedTransports = sortThis(
            allUnitInfo.filter((unit) => unit.unit_data[1] === "Dedicated Transports")
        );
        const other = sortThis(
            allUnitInfo.filter((unit) => unit.unit_data[1] === "Other")
        );

        return (
            <>
                <div className={styles.UnitSelection}>
                    <h2 style={{ color: colour }}>{selectedArmy.faction_info[0]}</h2>
                    <input
                        className={styles.searchBar}
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Type to search"
                    />
                    <>
                        <h3 style={{ color: colour }}>Characters</h3>
                        <ul>
                            {characters
                                .map((unitId, idx) => (
                                    <li
                                        key={idx}
                                        id={unitId[1].faction_id}
                                        onClick={(event) =>
                                            handleClick(event, unitId)
                                        }
                                    >
                                        {unitId[1].unit_data[0]}
                                    </li>
                                ))
                                .filter((name) =>
                                    name.props.children
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )}
                        </ul>
                        <h3 style={{ color: colour }}>Battleline</h3>
                        <ul>
                            {battleline
                                .map((unitId, idx) => (
                                    <li
                                        key={idx}
                                        id={unitId[1].faction_id}
                                        onClick={(event) =>
                                            handleClick(event, unitId)
                                        }
                                    >
                                        {unitId[1].unit_data[0]}
                                    </li>
                                ))
                                .filter((name) =>
                                    name.props.children
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )}
                        </ul>
                        <h3 style={{ color: colour }}>Dedicated Transports</h3>
                        <ul>
                            {dedicatedTransports
                                .map((unitId, idx) => (
                                    <li
                                        key={idx}
                                        id={unitId[1].faction_id}
                                        onClick={(event) =>
                                            handleClick(event, unitId)
                                        }
                                    >
                                        {unitId[1].unit_data[0]}
                                    </li>
                                ))
                                .filter((name) =>
                                    name.props.children
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )}
                        </ul>
                        <h3 style={{ color: colour }}>Other</h3>
                        <ul>
                            {other
                                .map((unitId, idx) => (
                                    <li
                                        key={idx}
                                        id={unitId[1].faction_id}
                                        onClick={(event) =>
                                            handleClick(event, unitId)
                                        }
                                    >
                                        {unitId[1].unit_data[0]}
                                    </li>
                                ))
                                .filter((name) =>
                                    name.props.children
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )}
                        </ul>
                    </>
                </div>
                <>
                    {showUnit ? (
                        <UnitRules
                            colour={colour}
                            addUnit={addUnit}
                            unitInfo={selectedUnit}
                        />
                    ) : (
                        <h2 style={{ color: colour }} className={styles.waiting}>
                            Waiting on unit to be selected
                        </h2>
                    )}
                </>
            </>
        );
    } else {
        return <></>;
    }
}
