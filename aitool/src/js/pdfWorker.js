// pdfWorker.js
// Handles PDF manipulation using the pdf-lib library

async function mergePDFs(fileList) {
    if (fileList.length < 2) {
        throw new Error("Please upload at least 2 PDFs to merge.");
    }
    
    const { PDFDocument } = PDFLib;
    const mergedPdf = await PDFDocument.create();
    
    for (const file of fileList) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const pdfBytes = await mergedPdf.save();
    return createDownloadLink(pdfBytes, 'merged_document.pdf');
}

async function splitPDF(file) {
    const { PDFDocument } = PDFLib;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    const totalPages = pdf.getPageCount();
    if (totalPages < 2) {
        throw new Error("PDF must have at least 2 pages to split.");
    }
    
    // Split in half for demonstration
    const splitIndex = Math.floor(totalPages / 2);
    
    const part1 = await PDFDocument.create();
    const copied1 = await part1.copyPages(pdf, Array.from({length: splitIndex}, (_, i) => i));
    copied1.forEach(p => part1.addPage(p));
    
    const part2 = await PDFDocument.create();
    const copied2 = await part2.copyPages(pdf, Array.from({length: totalPages - splitIndex}, (_, i) => i + splitIndex));
    copied2.forEach(p => part2.addPage(p));
    
    const bytes1 = await part1.save();
    const bytes2 = await part2.save();
    
    return [
        createDownloadLink(bytes1, 'split_part1.pdf'),
        createDownloadLink(bytes2, 'split_part2.pdf')
    ];
}

async function rotatePDF(file) {
    const { PDFDocument, degrees } = PDFLib;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    const pages = pdf.getPages();
    pages.forEach(page => {
        page.setRotation(degrees(page.getRotation().angle + 90));
    });
    
    const pdfBytes = await pdf.save();
    return createDownloadLink(pdfBytes, 'rotated_document.pdf');
}

function createDownloadLink(pdfBytes, filename) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return { url, filename };
}

window.pdfWorker = {
    mergePDFs,
    splitPDF,
    rotatePDF
};
