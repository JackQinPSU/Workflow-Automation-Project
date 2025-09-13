import { Router } from "express";
import multer from "multer";
import { handleFileUpload } from "./controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), handleFileUpload);


export default router;
