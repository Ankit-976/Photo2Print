const PDFDocument = require("pdfkit");

const generateSheet = require(
  "../utils/generateSheet"
);

const uploadPhoto = async (req, res) => {

  try {

    // Photo count from frontend
    const photoCount =
      Number(req.body.photoCount) || 8;

    // Generate A4 sheet
    const finalBuffer =
      await generateSheet(
        req.file.buffer,
        photoCount
      );

    // Create PDF
    const doc = new PDFDocument({
      size: "A4",
      margin: 0
    });

    // Response headers
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=passport-sheet.pdf"
    );

    // Stream PDF
    doc.pipe(res);

    // Add image to PDF
    doc.image(finalBuffer, 0, 0, {
      width: 595,
      height: 842
    });

    // Finish PDF
    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = {
  uploadPhoto
};