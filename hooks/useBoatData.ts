import { orderedBoatsData } from 'data'
import { useRouter } from 'next/router'

export type UseBoatDataReturn = ReturnType<typeof useBoatData>

const imagesContext = require.context('/public/images/boats', true)

type GroupedImages = {
  [folder: string]: {
    default: string
    filePath: string
  }[]
}

const groupImagesByFolder = (context: __WebpackModuleApi.RequireContext): GroupedImages => {
  const groupedImages = context.keys().reduce<GroupedImages>((acc, imagePath) => {
    const [, folderPath, filePath] = imagePath.split('/')
    acc[folderPath] = acc[folderPath] || []
    acc[folderPath].push({ filePath, ...context(imagePath) })
    return acc
  }, {})

  Object.values(groupedImages).forEach((images) =>
    images.sort((a, b) => a.filePath.localeCompare(b.filePath, undefined, { numeric: true })),
  )

  return groupedImages
}

const imagesByFolder = groupImagesByFolder(imagesContext)

export const useBoatData = (name?: string) => {
  const router = useRouter()
  const boatName = name || (router.query.name as string)

  const data = orderedBoatsData.find(({ name }) => name === boatName)!
  const images = imagesByFolder[boatName]
  const mainImage = images?.[0]

  return { data, images, mainImage }
}
