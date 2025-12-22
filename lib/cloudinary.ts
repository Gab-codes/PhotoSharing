const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = "sample_preset";

export async function uploadToCloudinary(uri: string) {
  const formData = new FormData();

  formData.append("file", {
    uri,
    name: "image.jpg",
    type: "image/jpeg",
  } as any);

  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return await res.json();
}

export function cloudinaryImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale";
    quality?: "auto" | number;
    format?: "auto" | "jpg" | "png" | "webp";
  }
) {
  const {
    width,
    height,
    // crop = "fill",
    quality = "auto",
    format = "auto",
  } = options || {};

  const transforms = [
    width && `w_${width}`,
    height && `h_${height}`,
    // `c_${crop}`,
    `q_${quality}`,
    `f_${format}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
