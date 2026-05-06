const sharp = require("sharp");

const generateSheet = async (imageBuffer) => {

  // Passport photo dimensions
  const passportWidth = 413;
  const passportHeight = 531;

  // Resize uploaded image
  const passportBuffer = await sharp(imageBuffer)

    .resize(passportWidth, passportHeight, {
      fit: "cover"
    })

    .jpeg()

    .toBuffer();

  // Create blank A4 canvas
  const canvas = sharp({
    create: {
      width: 2480,
      height: 3508,
      channels: 3,
      background: "white"
    }
  });

  // Store all image positions
  const composites = [];

  // Generate 4x4 grid
  for (let row = 0; row < 4; row++) {

    for (let col = 0; col < 4; col++) {

      composites.push({

        input: passportBuffer,

        top: 100 + row * 650,

        left: 100 + col * 500
      });
    }
  }

  // Generate final A4 image buffer
  const finalBuffer = await canvas

    .composite(composites)

    .jpeg()

    .toBuffer();

  return finalBuffer;
};

module.exports = generateSheet;