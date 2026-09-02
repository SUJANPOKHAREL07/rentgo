import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary (make sure env vars are loaded before this)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookingLicense", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Enforce formats
    public_id: (req: any, file: Express.Multer.File) => {
      // Generate unique name (same logic as before)
      return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    },
    transformation: [
      { width: 1000, height: 1000, crop: "limit" }, // Optional: prevent huge images
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  } as any, // TypeScript workaround, params typing is a bit loose
});

// File filter (still useful to reject early on server side)
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
  }
};

// Multer middleware using Cloudinary
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
