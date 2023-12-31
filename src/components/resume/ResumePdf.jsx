import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './resumepdf.css';
import resume from '../../assets/pdfs/Resume.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export default function ResumePdf() {
  const [file, setFile] = useState(resume);
  const [numPages, setNumPages] = useState(1);

  function onDocumentLoadSuccess(nextNumPages) {
    setNumPages(nextNumPages);
  }

  return (
  
        
        <div className="pdf_container">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1}  />
            ))}
          </Document>
      </div>
  );
}