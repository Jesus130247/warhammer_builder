import { PDFDocument, rgb } from 'pdf-lib';
const pdfDoc = await PDFDocument.create();
let page = pdfDoc.addPage([595.28, 841.89]);
let { width, height } = page.getSize();
let newLine = height - 30
// import fs from 'fs'
// const timesNewRomanBytes = fs.readFileSync('./TimesNewRoman.ttf'); // Provide the path to Times New Roman font file
// const timesNewRomanFont = await pdfDoc.embedFont(timesNewRomanBytes);

export async function generatePDF(props) {
    let usersEnhancements = Object.entries(props.selectedEnhancement).map(unit => Object.entries(unit[1])[0][0])
    armyName(props.armyName.trim())
    newLine -= 20
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage()
    points(`Points: ${props.pointLimit-props.remainingPoints}/${props.pointLimit}`)
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage()
    handleFactionRule(Object.entries(props.selectedArmy.faction_info[2])[0].join('; '))
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage()
    handleSubFactionRule(props.selectedSubFaction, props.subFactionName)
    checkCurrentPage()

    newLine -= 20
    checkCurrentPage()
    page.drawText(`Enhancements Selected:`, {
        x: 30,
        y: newLine,
        size: 10,
        color: rgb(1,0,0),
        // font
    });
    newLine -= 20
    checkCurrentPage()
    props.subFactionDataEnhancements.forEach(enhancement => {
        handleEnhancement(enhancement, usersEnhancements)

    })
    newLine -= 20
    checkCurrentPage()
    page.drawText(`Units Selected`, {
        x: 30,
        y: newLine,
        size: 10,
        color: rgb(1,0,0),
        // font
    });
    props.usersArmy.forEach(unit => {
    handleUnitDisplay(unit)

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

function checkCurrentPage() {
    if (newLine < 50) {
        page = pdfDoc.addPage([595.28, 841.89]);
        newLine = 841.89 - 50
    }
}
function handleEnhancement(enhancement, usersEnhancements) {
    if (usersEnhancements.includes(enhancement[0])) {
        let enhanced = enhancement[1].replace(/<[^>]+>/g, '');
    page.drawText(`${enhancement[0]}: `, {
        x: 30,
        y: newLine,
        size: 10,
        color: rgb(1, 0, 0),
        // font
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
function handleFactionRule(factionRule) {
    let ruleName = factionRule.split(' ')[0]
    page.drawText(ruleName, {
        x:30,
        y: newLine,
        size: 10,
        color: rgb(1, 0, 0),
        // font
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
function handleSubFactionRule(subFactionRule, subRuleName) {
    page.drawText(subRuleName, {
        x:30,
        y: newLine,
        size: 10,
        color: rgb(1, 0, 0),
        // font
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