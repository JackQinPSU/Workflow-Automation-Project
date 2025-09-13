import Tesseract from "tesseract.js";
import fs from "fs";

export async function processUpload(filePath) {
  const result = await Tesseract.recognize(filePath, "eng");
  fs.unlinkSync(filePath); // cleanup
  return result.data.text;
}