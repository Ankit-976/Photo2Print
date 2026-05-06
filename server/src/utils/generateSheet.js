const sharp = require("sharp");

const generateSheet = async (imageBuffer, photoCount) => {
  // Passport photo dimensions
  const passportWidth = 413;
  const passportHeight = 531;

  // Resize uploaded image
  const passportBuffer = await sharp(imageBuffer)
    .resize(passportWidth, passportHeight, {
      fit: "cover",
    })

    .jpeg()

    .toBuffer();

  // A4 canvas
  const canvasWidth = 2480;
  const canvasHeight = 3508;

  // Create blank white canvas
  const canvas = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: "white",
    },
  });

  // Layout presets
  const layouts = {
    4: {
      rows: 1,
      cols: 4,
    },

    5: {
      rows: 1,
      cols: 5,
    },

    8: {
      rows: 2,
      cols: 4,
    },

    10: {
      rows: 2,
      cols: 5,
    },

    16: {
      rows: 4,
      cols: 4,
    },
  };

  // Default to 8 if invalid
  const selectedLayout = layouts[photoCount] || layouts[8];

  const rows = selectedLayout.rows;
  const cols = selectedLayout.cols;

  // Gaps between photos
  const gapX = 50;
  const gapY = 50;

  const startX = 80;
  const startY = 80;

  // Store image positions
  const composites = [];

  // Generate grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = startX + col * (passportWidth + gapX);

      const top = startY + row * (passportHeight + gapY);

      composites.push({
        input: passportBuffer,

        top: Math.round(top),

        left: Math.round(left),
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
