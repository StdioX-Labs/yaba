import fs from "fs"
import path from "path"

export async function getImagesFromPublicFolder(folderPath: string) {
  try {
    const fullPath = path.join(process.cwd(), "public", folderPath)

    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory ${folderPath} does not exist in public folder`)
      return []
    }

    const files = fs.readdirSync(fullPath)

    // Filter for image files
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // Return paths relative to public folder
    return imageFiles.map((file) => `/${folderPath}/${file}`)
  } catch (error) {
    console.error(`Error reading directory ${folderPath}:`, error)
    return []
  }
}

