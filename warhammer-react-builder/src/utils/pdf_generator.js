import { PDFDocument, rgb } from 'pdf-lib';
const pdfDoc = await PDFDocument.create();
let page = pdfDoc.addPage([2480, 3508]);
const { width, height } = page.getSize();
let newLine = height - 50
// import fs from 'fs'
// const timesNewRomanBytes = fs.readFileSync('./TimesNewRoman.ttf'); // Provide the path to Times New Roman font file
// const timesNewRomanFont = await pdfDoc.embedFont(timesNewRomanBytes);

export async function generatePDF(props) {
    let usersEnhancements = Object.entries(props.selectedEnhancement).map(unit => Object.entries(unit[1])[0][0])
    function handleEnhancement(enhancement, usersEnhancements) {
        if (usersEnhancements.includes(enhancement[0])) {
            let enhanced = enhancement[1].replace(/<[^>]+>/g, '');
        page.drawText(`${enhancement[0]}: `, {
            x: 50,
            y: newLine,
            size: 30,
            color: rgb(1, 0, 0),
            // font
        })
        newLine-=50
        let rule = enhanced
        .replace(/<br>/g, '\n')
        .replace(/<p/g, '\n<p')
        .replace(/<[^>]+>/g, '')
        let lines = wrapText(rule, 150)
        for (let line of lines) {
            page.drawText(line, {
                x:50,
                y: newLine,
                size: 30,
                color: rgb(0, 0.53, 0.71),
                // font
             });
            newLine -= 50
        }
        }
    }
    function handleFactionRule(factionRule) {
        let ruleName = factionRule.split(' ')[0]
        page.drawText(ruleName, {
            x:50,
            y: newLine,
            size: 30,
            color: rgb(1, 0, 0),
            // font
        });
        newLine-=50
        let rule = factionRule
        .replace(/<br>/g, '\n')
        .replace(/<p/g, '\n\n<p')
        .replace(/<[^>]+>/g, '')
        .split('\n')
        for (let line of rule) {
            let newLines = wrapText(line,150)
            for (let line of newLines) {
                page.drawText(line, {
                            x:50,
                            y: newLine,
                            size: 30,
                            color: rgb(0, 0.53, 0.71),
                            // font
                         });
                        newLine -= 50
            }
        }
    }
    function handleSubFactionRule(subFactionRule, subRuleName) {
        page.drawText(subRuleName, {
            x:50,
            y: newLine,
            size: 30,
            color: rgb(1, 0, 0),
            // font
        });
        newLine-=50
        let rule = subFactionRule
        .replace(/<br>/g, '\n')
        .replace(/<p/g, '\n\n<p')
        .replace(/<[^>]+>/g, '')
        .split('\n')
        for (let line of rule) {
            let newLines = wrapText(line,150)
            for (let line of newLines) {
                page.drawText(line, {
                            x:50,
                            y: newLine,
                            size: 30,
                            color: rgb(0, 0.53, 0.71),
                            // font
                         });
                        newLine -= 50
            }
        }
    }

    function points(points) {
        page.drawText(points, {
            x:50,
            y: newLine,
            size: 30,
            color: rgb(0, 0, 0),
            // font
        });
        newLine -=50
    }
    function armyName(name) {
        newLine-=50
        page.drawText(name, {
            x: 50,
            y: newLine,
            size: 30,
            color: rgb(0, 0, 0),
            // font
        });
    }
    function handleUnitDisplay(unit) {
        newLine -=50
        page.drawText(`${unit[1]}`, {
            x: 50,
            y: newLine,
            size: 30,
            color: rgb(0,0,0),
            // font
        });
    }
    armyName(`Army name: ${props.armyName.trim()}`)
    newLine -= 50
    points(`Points: ${props.pointLimit-props.remainingPoints}/${props.pointLimit}`)
    newLine -= 50
    handleFactionRule(Object.entries(props.selectedArmy.faction_info[2])[0].join('; '))
    newLine -= 50
    handleSubFactionRule(props.selectedSubFaction, props.subFactionName)
    newLine -= 50
    page.drawText(`Enhancements Selected:`, {
        x: 50,
        y: newLine,
        size: 30,
        color: rgb(1,0,0),
        // font
    });
    props.subFactionDataEnhancements.forEach(enhancement => {
        handleEnhancement(enhancement, usersEnhancements)

    })
    newLine -= 50
    page.drawText(`Units Selected`, {
        x: 50,
        y: newLine,
        size: 30,
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