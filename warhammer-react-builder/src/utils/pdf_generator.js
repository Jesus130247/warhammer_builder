import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
const pdfDoc = await PDFDocument.create();
let page = pdfDoc.addPage([595.28, 841.89]);
let { width, height } = page.getSize();
let newLine = height - 30
let numPage = 1
page.drawText(`${numPage}`, {
    x: width-50,
    y: height-50,
    size: 11,
    color: rgb(0,0,0)
})
// import fs from 'fs'
// const timesNewRomanBytes = fs.readFileSync('./TimesNewRoman.ttf'); // Provide the path to Times New Roman font file
// const timesNewRomanFont = await pdfDoc.embedFont(timesNewRomanBytes);

export async function generatePDF(props) {
    const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    let usersEnhancements = Object.entries(props.selectedEnhancement).map(unit => Object.entries(unit[1])[0][0])
    armyName(props.armyName.trim())
    newLine -= 20
    checkCurrentPage()
    points(`Points: ${props.pointLimit-props.remainingPoints}/${props.pointLimit}`)
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage()
    handleFactionRule(Object.entries(props.selectedArmy.faction_info[2])[0].join('; '), HelveticaBold)
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage()
    handleSubFactionRule(props.selectedSubFaction, props.subFactionName, HelveticaBold)
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage(100)
    page.drawText('Enhancements Selected', {
        x:30,
        y: newLine,
        size: 15,
        color: rgb(1, 0, 0),
        font: HelveticaBold,
        });
    newLine -= 25
    checkCurrentPage()
    props.subFactionDataEnhancements.forEach(enhancement => {
        handleEnhancement(enhancement, usersEnhancements, HelveticaBold)

    })
    newLine -= 20
    checkCurrentPage()
    page.drawText('Unit Selected', {
        x:30,
        y: newLine,
        size: 15,
        color: rgb(1, 0, 0),
        font:HelveticaBold,
        });
    newLine -= 25
    checkCurrentPage()
    props.usersArmy.forEach(unit => {
    handleUnitDisplay(unit)
    })
    newLine -= 20
    newLine -= 20
    checkCurrentPage()

    handleUnitRules(props)
    newLine -= 20
    checkCurrentPage()
    page.drawText(`${props.subFactionName} Stratagems`, {
        x:30,
        y: newLine,
        size: 15,
        color: rgb(1, 0, 0),
        font:HelveticaBold,
        });
    newLine -= 25
    checkCurrentPage()
    props.selectArmyStratagems.forEach(strat => {
        handleStratagems(strat, HelveticaBold)
    })

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();
  
  // Return the PDF bytes
  return pdfBytes;
}





// functions below
// ------------------------------------------------------------------------------------------------------------------------------------------------------------




function wrapText(text, maxLineLength) {
    const lines = [];
    const words = text.split(' ')

    let currentLine = '';

    words.forEach(word => {
        // Check if adding this word exceeds the max line length
        if ((currentLine + word).length > maxLineLength) {
            // Push the current line and start a new line
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            // Add the word to the current line
            currentLine += word + ' ';
        }
    });

    // Push any remaining text as the final line
    if (currentLine) {
        lines.push(currentLine.trim());
    }
    const splitByNewline = (segments) => {
        return segments.flatMap(segment => segment.split('\n'));
      };
      
    // Process the array of text segments
    const processedSegments = splitByNewline(lines);
    
    return processedSegments
}

function checkCurrentPage(range = 50) {
    if (newLine < range) {
        page = pdfDoc.addPage([595.28, 841.89]);
        newLine = 841.89 - 50
        numPage++
        page.drawText(`${numPage}`, {
            x: width-50,
            y: height-50,
            size: 11,
            color: rgb(0,0,0)
        })
    }
}
function createNewPage() {
    page = pdfDoc.addPage([595.28, 841.89]);
    newLine = 841.89 - 50
    numPage++
    page.drawText(`${numPage}`, {
        x: width-50,
        y: height-50,
        size: 11,
        color: rgb(0,0,0)
    })
}
async function handleEnhancement(enhancement, usersEnhancements, HelveticaBold) {
    if (usersEnhancements.includes(enhancement[0])) {
        let enhanced = enhancement[1].replace(/<[^>]+>/g, '');
    page.drawText(`${enhancement[0]}: `, {
        x: 30,
        y: newLine,
        size: 10,
        color: rgb(1, 0, 0),
        font:HelveticaBold,
    })
    newLine -= 20
    checkCurrentPage()
    let rule = enhanced
    .replace(/<br>/g, '\n')
    .replace(/<p/g, '\n<p')
    .replace(/<[^>]+>/g, '')
    let lines = wrapText(rule, 110)
    for (let line of lines) {
        page.drawText(line, {
            x:30,
            y: newLine,
            size: 10,
            color: rgb(0, 0, 0),
            // font
         });
        newLine -= 20
        checkCurrentPage()
    }
    }
}
async function handleFactionRule(factionRule, HelveticaBold) {
    let ruleName = factionRule.split(' ')[0]
    page.drawText(ruleName, {
        x:30,
        y: newLine,
        size: 10,
        color: rgb(1, 0, 0),
        font:HelveticaBold,
    });
    newLine -= 20
    checkCurrentPage()
    let rule = factionRule
    .replace(/<br>/g, '\n')
    .replace(/<p/g, '\n\n<p')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    for (let line of rule) {
        let newLines = wrapText(line,110)
        for (let line of newLines) {
            page.drawText(line, {
                        x:30,
                        y: newLine,
                        size: 10,
                        color: rgb(0, 0, 0),
                        // font
                     });
                    newLine -= 20
                    checkCurrentPage()
        }
    }
}
async function handleSubFactionRule(subFactionRule, subRuleName, HelveticaBold) {
    page.drawText(subRuleName, {
        x:30,
        y: newLine,
        size: 10,
        color: rgb(1, 0, 0),
        font:HelveticaBold,
    });
    newLine -= 20
    checkCurrentPage()
    let rule = subFactionRule
    .replace(/<br>/g, '\n')
    .replace(/<p/g, '\n\n<p')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    for (let line of rule) {
        let newLines = wrapText(line,110)
        for (let line of newLines) {
            page.drawText(line, {
                        x:30,
                        y: newLine,
                        size: 10,
                        color: rgb(0, 0, 0),
                        // font
                     });
                    newLine -= 20

                    checkCurrentPage()
        }
    }
}

function points(points) {
    page.drawText(points, {
        x:30,
        y: newLine,
        size: 10,
        color: rgb(0, 0, 0),
        // font
    });
    newLine -= 20
    checkCurrentPage()
}
function armyName(name) {
    newLine -= 20
    checkCurrentPage()
    page.drawText(name, {
        x: 30,
        y: newLine,
        size: 20,
        color: rgb(0, 0, 0),
        // font
    });
}
function handleUnitDisplay(unit) {
    newLine -= 20
    checkCurrentPage()
    page.drawText(`${unit[1]}`, {
        x: 30,
        y: newLine,
        size: 10,
        color: rgb(0,0,0),
        // font
    });
}
function handleStratagems(strat, HelveticaBold) {
    checkCurrentPage(100)
    page.drawText(strat[2], {
        x: 30,
        y: newLine,
        size: 10,
        color: rgb(1,0,0),
        font: HelveticaBold,
    });
    newLine -= 20
    checkCurrentPage()
    let rule = strat[9]
    .replace(/<br>/g, '\n')
    .replace(/<p/g, '\n\n<p')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    for (let line of rule) {
        let newLines = wrapText(line,110)
        for (let line of newLines) {
            page.drawText(line, {
                x:30,
                y: newLine,
                size: 10,
                color: rgb(0, 0, 0),
                // font
                });
            newLine -= 20
            checkCurrentPage()
        }
    }
}

async function handleUnitRules(props) {
    const HelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    let allUnits = props.unitsInfo
    let usersArmy = props.usersArmy.map(unit => {
        let name = unit[1].split(' ')
        name.shift()
        return name.join(' ')
    })
    for (let unitInfo of allUnits) {
        if (usersArmy.includes(unitInfo.unit_data[0])) {
            createNewPage()
            let [unitname, 
                role,
                startingWargear,
                transportCapcity,
                damagedData,
                abilityObject,
                armyKeyWordArray,
                statsArray,
                wargearOptionsArray,
                weaponRulesArray,
                unitCompArray,
                ptsCost,
                leader
            ] = unitInfo.unit_data
            let [
                unitname2,
                movement,
                toughess,
                armourSave,
                invulSave,
                invulSaveConditions,
                wounds,
                leaderShip,
                ...OC
            ] = statsArray[0]
            let leaderName
            let movementExarch
            let toughess2
            let armourSave2
            let invulSave2
            let invulSaveConditions2
            let wounds2
            let leaderShip2
            let  oC2
            if (statsArray[1]) {
                [
                    leaderName,
                    movementExarch,
                    toughess2,
                    armourSave2,
                    invulSave2,
                    invulSaveConditions2,
                    wounds2,
                    leaderShip2,
                    oC2
                ] = statsArray[1]
            }
            let meleeWeapons = []
            let rangedWeapons = []
            if (weaponRulesArray) {
                rangedWeapons = weaponRulesArray.filter(weapon => weapon[2] !== 'Melee')
                meleeWeapons = weaponRulesArray.filter(weapon => weapon[2] === 'Melee')
            }
            page.drawText(unitname, {
                x:30,
                y: newLine,
                size: 12,
                font: HelveticaBold,
                color: rgb(0, 0, 0),
                // font
            });
            newLine -= 20
            page.drawText(`M: ${movement}`, { x: 50, y: newLine, size: 10, color: rgb(0, 0, 0) });
            page.drawText(`T: ${toughess}`, { x: 100, y: newLine, size: 10, color: rgb(0, 0, 0) });
            page.drawText(`Sv: ${armourSave}`, { x: 150, y: newLine, size: 10, color: rgb(0, 0, 0) });
            page.drawText(`W: ${wounds}`, { x: 200, y: newLine, size: 10, color: rgb(0, 0, 0) });
            page.drawText(`Ld: ${leaderShip}`, { x: 250, y: newLine, size: 10, color: rgb(0, 0, 0) });
            page.drawText(`OC: ${OC.join(', ')}`, { x: 300, y: newLine, size: 10, color: rgb(0, 0, 0) });
            page.drawText(`Invul: ${invulSave}+`, { x: 350, y: newLine, size: 10, color: rgb(0, 0, 0) });
            if (invulSaveConditions) {
                newLine -= 20
                page.drawText(`Invul Condition: ${invulSaveConditions}`, { x: 150, y: newLine, size: 10, color: rgb(0, 0, 0) });
            }
            if (statsArray[1]) {
                newLine -= 20
                page.drawText(`${leaderName}`, { x: 30, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
                newLine -= 20
                page.drawText(`M: ${movementExarch}`, { x: 50, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`T: ${toughess2}`, { x: 100, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`Sv: ${armourSave2}`, { x: 150, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`W: ${wounds2}`, { x: 200, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`Ld: ${leaderShip2}`, { x: 250, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`OC: ${oC2}`, { x: 300, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`Invul: ${invulSave2}+`, { x: 350, y: newLine, size: 10, color: rgb(0, 0, 0) });
                if (invulSaveConditions2) {
                    newLine -= 20
                    page.drawText(`Invul Condition: ${invulSaveConditions}`, { x: 150, y: newLine, size: 10, color: rgb(0, 0, 0) });
                }
            }
            newLine -= 20
            //          starting unit comp
            page.drawText('Unit Composition', {
                x:30,
                y: newLine,
                size: 10,
                color: rgb(1, 0, 0),
                font: HelveticaBold,
            });
            newLine -= 20
            // unit wargear
            let rule = startingWargear
            .replace(/<br>/g, '\n ')
            .replace(/<p/g, '\n<p')
            .replace(/<[^>]+>/g, ' ')
            let lines = wrapText(rule, 110)
            for (let line of lines) {
                page.drawText(line, {
                    x:30,
                    y: newLine,
                    size: 10,
                    color: rgb(0, 0, 0),
                    // font
                });
                newLine -= 20
            }
            let unitComp = unitCompArray.join(' ')
            .replace(/<br>/g, '\n')
            .replace(/<p/g, '\n<p')
            .replace(/<[^>]+>/g, ' ')
            let unitCompLines = wrapText(unitComp, 110)
            for (let line of unitCompLines) {
                page.drawText(line, {
                    x:30,
                    y: newLine,
                    size: 10,
                    color: rgb(0, 0, 0),
                    // font
                });
                newLine -= 20
            }   
            // wargear options below
            if (wargearOptionsArray) {
                for (let option of wargearOptionsArray) {
                    let rule2 = option
                    .replace(/<br>/g, '\n')
                    .replace(/<p/g, '\n<p')
                    .replace(/<[^>]+>/g, ' ')
                    let lines2 = wrapText(rule2, 110)
                    for (let line of lines2) {
                        page.drawText(line, {
                            x:30,
                            y: newLine,
                            size: 10,
                            color: rgb(0, 0, 0),
                            // font
                        });
                        newLine -= 20
                    }
                }
            }
            // weapon rules below
            newLine -= 20
            const tableMargin = 30;
            const columnSpacing = 225;
            if (rangedWeapons.length > 0) {
              page.drawText('Ranged Weapons:', { x: tableMargin, y: newLine, size: 10, font:HelveticaBold, color: rgb(1, 0, 0) });
              page.drawText(`Range`, { x: tableMargin + columnSpacing, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`A`, { x: tableMargin + columnSpacing + 65, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`BS`, { x: tableMargin + columnSpacing + 90, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`S`, { x: tableMargin + columnSpacing + 110, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`AP`, { x: tableMargin + columnSpacing + 130, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`D`, { x: tableMargin + columnSpacing + 150, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              newLine -= 20
              rangedWeapons.forEach((weapon, index) => {
                page.drawText(`${weapon[0]}`, { x: tableMargin, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[1].replace(/<[^>]+>/g, '')}`, { x: tableMargin, y: newLine-20, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[2]}"`, { x: tableMargin + columnSpacing, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[4]}`, { x: tableMargin + columnSpacing + 65, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[5]}${weapon[5] !== 'N/A' ? '+' : ''}`, { x: tableMargin + columnSpacing + 90, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[6]}`, { x: tableMargin + columnSpacing + 110, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[7]}`, { x: tableMargin + columnSpacing + 130, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[8]}`, { x: tableMargin + columnSpacing + 150, y: newLine, size: 10, color: rgb(0, 0, 0) });
                newLine -= 40;
                });
            }
            checkCurrentPage()
            if (meleeWeapons.length > 0) {
              page.drawText('Melee Weapons:', { x: tableMargin, y: newLine, size: 10, font:HelveticaBold, color: rgb(1, 0, 0) });
              page.drawText(`Range`, { x: tableMargin + columnSpacing, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`A`, { x: tableMargin + columnSpacing + 65, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`WS`, { x: tableMargin + columnSpacing + 90, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`S`, { x: tableMargin + columnSpacing + 110, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`AP`, { x: tableMargin + columnSpacing + 130, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              page.drawText(`D`, { x: tableMargin + columnSpacing + 150, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
              newLine -= 20
              meleeWeapons.forEach((weapon, index) => {
                page.drawText(`${weapon[0]}`, { x: tableMargin, y: newLine, size: 10, font: HelveticaBold, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[1].replace(/<[^>]+>/g, '')}`, { x: tableMargin, y: newLine-20, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[2]}`, { x: tableMargin + columnSpacing, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[4]}`, { x: tableMargin + columnSpacing + 65, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[5]}${weapon[5] !== 'N/A' ? '+' : ''}`, { x: tableMargin + columnSpacing + 90, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[6]}`, { x: tableMargin + columnSpacing + 110, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[7]}`, { x: tableMargin + columnSpacing + 130, y: newLine, size: 10, color: rgb(0, 0, 0) });
                page.drawText(`${weapon[8]}`, { x: tableMargin + columnSpacing + 150, y: newLine, size: 10, color: rgb(0, 0, 0) });
                newLine -= 40;
                });
            }
            checkCurrentPage()
            let list = [transportCapcity, damagedData]
            for (let item of list) {
                if (item) {
                    let rule2 = item
                    .replace(/<br>/g, '\n')
                    .replace(/<p/g, '\n<p')
                    .replace(/<[^>]+>/g, '')
                    let lines2 = wrapText(rule2, 90)
                    for (let line of lines2) {
                        page.drawText(line, {
                            x:30,
                            y: newLine,
                            size: 10,
                            color: rgb(0, 0, 0),
                            // font
                        });
                        newLine -= 20
                    }
                }
                checkCurrentPage()
            }
            if (abilityObject) {
                page.drawText('Abilties: ', {x: 30, y: newLine, size: 11, color: rgb(1,0,0), font: HelveticaBold,})
                newLine -= 20
                Object.keys(abilityObject).map((ability,idx) => {
                    if (ability === 'coreAbilities' || ability === 'factionKeyword') {
                    let rule2 = abilityObject[ability].join(' ')
                    .replace(/<br>/g, '\n')
                    .replace(/<p/g, '\n<p')
                    .replace(/<[^>]+>/g, '')
                    let lines2 = wrapText(rule2, 120)
                    for (let line of lines2) {
                        page.drawText(line, {
                            x:30,
                            y: newLine,
                            size: 10,
                            color: rgb(1, 0, 0),
                            font: HelveticaBold,
                        });
                        newLine -= 20
                    }
                    } else {
                        page.drawText(ability + ' :', {
                            x: 30,
                            y: newLine,
                            size: 10,
                            color: rgb(1, 0, 0),
                            font: HelveticaBold,
                        })
                        newLine -= 20
                        let rule2 = abilityObject[ability]
                    .replace(/<br>/g, '\n')
                    .replace(/<p/g, '\n<p')
                    .replace(/<[^>]+>/g, '')
                    let lines2 = wrapText(rule2, 120)
                    for (let line of lines2) {
                        page.drawText(line, {
                            x:30,
                            y: newLine,
                            size: 10,
                            color: rgb(0, 0, 0),
                            // font
                        });
                        newLine -= 20
                    }
                    }
                    checkCurrentPage()
                })
            }
            if (armyKeyWordArray) {
                page.drawText('Keywords', {
                    x: 30,
                    y: newLine,
                    size: 10,
                    color: rgb(1, 0, 0),
                    font:HelveticaBold,
                });

                newLine -= 20
                let position = 30
                for (let keyword of armyKeyWordArray) {
                    let word = keyword.replace(/<[^>]+>/g, '')
                    page.drawText(word, {
                        x: position,
                        y: newLine,
                        size: 10,
                        color: rgb(0, 0, 0),
                        // font
                    });
                    position += word.length * 5 + 10
                    }
            }
            newLine -= 20
            if (leader.length) {
                checkCurrentPage()
                page.drawText('This unit can lead the following; ', {
                    x:30,
                    y: newLine,
                    size: 10,
                    color: rgb(1, 0, 0),
                    font:HelveticaBold,
                });
                newLine -= 20
                for (let i = 1; i<leader.length; i += 2) {
                    let rule2 = leader[i]
                    .replace(/<br>/g, '\n')
                    .replace(/<p/g, '\n<p')
                    .replace(/<[^>]+>/g, '')
                    let lines2 = wrapText(rule2, 90)
                    for (let line of lines2) {
                        page.drawText(line, {
                            x:30,
                            y: newLine,
                            size: 10,
                            color: rgb(0, 0, 0),
                            // font
                        });
                        newLine -= 20
                    }
                    checkCurrentPage()
                }
            }
        }
    }
}
