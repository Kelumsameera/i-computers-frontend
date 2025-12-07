// import React, { useState } from "react";
// import { uploadMedia } from "../../utils/mediaUpload.js";
// import toast from "react-hot-toast";

// export default function TestPage() {
//   const [file, setFile] = useState(null);

//   async function handleUpload() {
//     if (!file) return alert("Please select a file!");

//     try {
//       const publicUrl = await uploadMedia(file);
//       toast.success("File uploaded! URL: " + publicUrl);
//       console.log("Uploaded file URL:", publicUrl);
//     } catch (err) {
//       toast.error("Upload failed: " + err.message);
//     }
//   }

//   return (
//     <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="border p-2 rounded"
//       />
//       <button
//         onClick={handleUpload}
//         className="bg-red-900 text-white px-4 py-2 rounded-2xl hover:bg-red-800"
//       >
//         Upload
//       </button>
//     </div>
//   );
// }
