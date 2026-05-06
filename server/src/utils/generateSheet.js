const sharp = require("sharp");

const generateSheet = async (
  imageBuffer,
  photoCount
) => {

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

  // A4 canvas size
  const canvasWidth = 2480;
  const canvasHeight = 3508;

  // Create blank white canvas
  const canvas = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: "white"
    }
  });

  // Spacing
  const gapX = 70;
  const gapY = 70;

  // Starting margin
  const startX = 60;
  const startY = 60;

  // Current positions
  let currentX = startX;
  let currentY = startY;

  // Store image positions
  const composites = [];

  // Generate dynamic layout
  for (let i = 0; i < photoCount; i++) {

    // Move to next row if width exceeded
    if (
      currentX + passportWidth >
      canvasWidth - startX
    ) {

      currentX = startX;

      currentY +=
        passportHeight + gapY;
    }

    // Add image position
    composites.push({

      input: passportBuffer,

      top: Math.round(currentY),

      left: Math.round(currentX)
    });

    // Move right
    currentX +=
      passportWidth + gapX;
  }

  // Generate final A4 sheet
  const finalBuffer = await canvas

    .composite(composites)

    .jpeg({
      quality: 100
    })

    .toBuffer();

  return finalBuffer;
};

module.exports = generateSheet;