import { processUpload } from "./service.js";

export async function handleFileUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await processUpload(req.file.path);
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR processing failed" });
  }
}
