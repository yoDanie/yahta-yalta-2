import { orderedBoatsData } from "@/data"
import boatImages from "@/data/boatImages.json"

export const getBoatData = (boatName: BoatName) => {
  const data = orderedBoatsData.find(({ name }) => name === boatName)!
  const images = boatImages[boatName]
  const mainImage = images?.[0]

  return { data, images, mainImage }
}

export type GetBoadDataReturn = ReturnType<typeof getBoatData>
