import React from 'react';
import { generatePDF } from '../../utils/pdf_generator';

const PdfButton = (props) => {
  const handleClick = async () => {
    const pdfBytes = await generatePDF(props);
    
    // Create a Blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${props.armyName.trim()}.pdf`;
    
    // Append to the body and click the link
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <button className='btn' onClick={handleClick}>Generate PDF</button>
  );
};

export default PdfButton;
