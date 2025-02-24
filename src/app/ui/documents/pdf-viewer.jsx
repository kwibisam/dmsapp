"use client"
import React from 'react'
import { pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const PdfPreview = ({file}) => {

    console.log("file: ", file)
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const goToPreviousPage = () => {
        setPageNumber(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document 
            file={file} 
            loading={"please wait"} 
            onLoadSuccess={onDocumentLoadSuccess} 
            error={<h1>DOCUMENT LOAD FAILED</h1>}
            className="border border-blue-600">
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>

            <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
                Previous
            </button>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                Next
            </button>
        </div>
    )
}

export default PdfPreview