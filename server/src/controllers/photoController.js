// const sharp = require("sharp");

// const uploadPhoto = async (req, res) => {

//   try {

//     const metadata = await sharp(req.file.buffer)
//       .metadata();

//     res.json({
//       message: "Upload successful",
//       metadata
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Something went wrong"
//     });
//   }
// };

// module.exports = {
//   uploadPhoto
// };

const generateSheet = require("../utils/generateSheet");

const uploadPhoto = async (req, res) => {

  try {

    // Generate A4 sheet buffer
    const finalBuffer = await generateSheet(
      req.file.buffer
    );

    // Send image directly
    res.set("Content-Type", "image/jpeg");

    res.send(finalBuffer);

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