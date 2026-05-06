const sharp = require("sharp");

const uploadPhoto = async (req, res) => {

  try {

    const metadata = await sharp(req.file.buffer)
      .metadata();

    res.json({
      message: "Upload successful",
      metadata
    });

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