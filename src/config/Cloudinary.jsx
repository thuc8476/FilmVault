import CryptoJS from "crypto-js";

export const uploadImageToCloudinary = async (imgFile, folderName) => {
  const formData = new FormData();
  formData.append('file', imgFile);
  formData.append('upload_preset', 'filmvault'); // Replace 'vamfilm' with your actual unsigned upload preset name
  formData.append('cloud_name', 'dyxsbxtmh'); // Replace 'dymypfkt4' with your actual Cloudinary cloud name

  // Set the folder parameter
  if (folderName) {
    formData.append('folder', folderName); // Specify folder name for organized storage
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dyxsbxtmh/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; // Return the image URL from Cloudinary
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Function to delete an image from Cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const apiKey = '397797844953428';  // Replace with your actual API key
  const apiSecret = 'Ye8J1LIXs88qQAQ0hZ2_4H5qByI';  // Replace with your actual API secret
  const cloudName = 'dyxsbxtmh'; // Replace with your actual Cloudinary cloud name

  // Generate the signature for authentication
  const signature = CryptoJS.SHA1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).toString();

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('timestamp', timestamp);
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result; // Returns the result of the deletion operation
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
};