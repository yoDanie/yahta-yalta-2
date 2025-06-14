// @ts-nocheck
const fs = require("fs")
const path = require("path")

const boatsDir = path.resolve(process.cwd(), "public/images/boats")

const groupedImages: Record<string, string[]> = {}

fs.readdirSync(boatsDir).forEach((folder) => {
  const folderPath = path.join(boatsDir, folder)
  if (fs.statSync(folderPath).isDirectory()) {
    groupedImages[folder] = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(png|jpe?g|svg|webp|gif)$/.test(file))
      .map((file) => `/images/boats/${folder}/${file}`)
  }
})

fs.writeFileSync(
  path.resolve(process.cwd(), "data/boatImages.json"),
  JSON.stringify(groupedImages, null, 2),
)

console.log("Boat images manifest generated.")
