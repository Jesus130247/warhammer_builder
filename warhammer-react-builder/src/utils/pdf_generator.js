// import { PDFDocument, rgb } from 'pdf-lib';
// const pdfDoc = await PDFDocument.create();
// const page = pdfDoc.addPage([1600, 1400]);
// const { width, height } = page.getSize();
// let newLine = height - 50
// // import fs from 'fs'
// // const timesNewRomanBytes = fs.readFileSync('./TimesNewRoman.ttf'); // Provide the path to Times New Roman font file
// // const timesNewRomanFont = await pdfDoc.embedFont(timesNewRomanBytes);

// export async function generatePDF(props) {
//     let usersEnhancements = Object.entries(props.selectedEnhancement).map(unit => Object.entries(unit[1])[0][0])
//     function handleEnhancement(enhancement, usersEnhancements) {
//         if (usersEnhancements.includes(enhancement[0])) {
//             let enhanced = enhancement[1].replace(/<style([\s\S]*?)<\/style>/gi, ' ')
//                                     .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
//                                     .replace(/(<(?:.|\n)*?>)/gm, ' ')
//                                     .replace(/\s+/gm, ' ');
//             newLine-=50
//             page.drawText(`${enhancement[0]}: ${enhanced}`, {
//                 x: 50,
//                 y: newLine,
//                 size: 30,
//                 color: rgb(0, 0.53, 0.71),
//                 font
//               });
//         }
//     }
//     function handleFactionRule(factionRule) {
//         let rule = factionRule.replace(/<style([\s\S]*?)<\/style>/gi, ' ')
//                                 .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
//                                 .replace(/(<(?:.|\n)*?>)/gm, ' ')
//                                 .replace(/\s+/gm, ' ');
//         newLine-=50
//         page.drawText(rule, {
//             x:50,
//             y: newLine,
//             size: 30,
//             color: rgb(0, 0.53, 0.71),
//             font
//           });
//     }
//     function handleSubFactionRule(subFactionRule) {
//         newLine-=50
//         let subRule = subFactionRule.replace(/<style([\s\S]*?)<\/style>/gi, ' ')
//         .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
//         .replace(/(<(?:.|\n)*?>)/gm, ' ')
//         .replace(/\s+/gm, ' ')
//         // text, fontSize, pageWidth, font
//         for (const line of wrapText(subRule, 30, width, font)) {
//             page.drawText(line, {
//                 x:50,
//                 y: newLine,
//                 size: 30,
//                 color: rgb(0, 0.53, 0.71),
//                 font
//             });
//             newLine-=50
//         }
//     }

//     function points(points) {
//         newLine-=50
//         page.drawText(points, {
//             x:50,
//             y: newLine,
//             size: 30,
//             color: rgb(0, 0.53, 0.71),
//             font
//         });
//     }
//     function armyName(name) {
//         newLine-=50
//         page.drawText(name, {
//             x: 50,
//             y: newLine,
//             size: 30,
//             color: rgb(0, 0.53, 0.71),
//             font
//         });
//     }
//     function handleUnitDisplay(unit) {
//         newLine -=50
//         page.drawText(`${unit[1]}`, {
//             x: 50,
//             y: newLine,
//             size: 30,
//             color: rgb(0, 0.53, 0.71),
//             font
//         });
//     }

//     console.log(props)
//     armyName(`Army name: ${props.armyName.trim()}`)
//     newLine -= 50
//     points(`Points: ${props.pointLimit-props.remainingPoints}/${props.pointLimit}`)
//     newLine -= 50
//     handleFactionRule(Object.entries(props.selectedArmy.faction_info[2])[0].join('; '))
//     newLine -= 50
//     handleSubFactionRule(props.selectedSubFaction)
//     newLine -= 50
//     props.subFactionDataEnhancements.forEach(enhancement => {
//         handleEnhancement(enhancement, usersEnhancements)

//     })
//     newLine -= 50
//     props.usersArmy.forEach(unit => {
//     handleUnitDisplay(unit)
//     })

//   // Serialize the PDFDocument to bytes
//   const pdfBytes = await pdfDoc.save();
  
//   // Return the PDF bytes
//   return pdfBytes;
// }

// function wrapText(text, fontSize, pageWidth, font) {
//     const lines = [];
//     let line = '';
//     const words = text.split(' ');
    
//     for (const word of words) {
//       const testLine = line ? `${line} ${word}` : word;
//       const { width } = font.widthOfTextAtSize(testLine, fontSize);
      
//       if (width > pageWidth) {
//         lines.push(line);
//         line = word;
//       } else {
//         line = testLine;
//       }
//     }
//     return lines;
// }