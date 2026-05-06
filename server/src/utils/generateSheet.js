const sharp = require("sharp");

const generateSheet = async (imageBuffer, photoCount) => {
  const passportWidth = 531;
  const passportHeight = 413;

  const metadata = await sharp(imageBuffer).metadata();

  let image = sharp(imageBuffer);

  if (metadata.width > metadata.height) {
    image = image.rotate(90);
  }

  const passportBuffer = await image
    .resize(passportWidth, passportHeight, {
      fit: "cover",
      position: "attention",
    })

    .rotate(90)

    .jpeg()

    .toBuffer();

  const canvasWidth = 2480;
  const canvasHeight = 3508;

  const canvas = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: "white",
    },
  });

  const gapX = 80;
  const gapY = 80;

  const startX = 50;
  const startY = 50;

  let currentX = startX;
  let currentY = startY;

  const composites = [];

  for (let i = 0; i < photoCount; i++) {
    if (currentX + passportWidth > canvasWidth - startX) {
      currentX = startX;

      currentY += passportHeight + gapY;
    }

    composites.push({
      input: passportBuffer,

      top: Math.round(currentY),

      left: Math.round(currentX),
    });

    currentX += passportWidth + gapX;
  }

  const finalBuffer = await canvas

    .composite(composites)

    .jpeg({
      quality: 100,
    })

    .toBuffer();

  return finalBuffer;
};

module.exports = generateSheet;
