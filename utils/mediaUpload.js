import { createClient } from "@supabase/supabase-js";

const url = "https://woinupcbvkriufpyhwtm.supabase.co";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaW51cGNidmtyaXVmcHlod3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODQ3MDksImV4cCI6MjA3ODE2MDcwOX0.Yl7vEGQ-5dL9hvP5zbURT-Q7JZI8JIFYyfdP7fzQHFE";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaW51cGNidmtyaXVmcHlod3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODQ3MDksImV4cCI6MjA3ODE2MDcwOX0.Yl7vEGQ-5dL9hvP5zbURT-Q7JZI8JIFYyfdP7fzQHFE
const supabase = createClient(url, key);

export async function uploadMedia(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const timeStamp = Date.now();
      const fileName = timeStamp + "_" + file.name;

      // Upload the file
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error.message);
        reject(error);
        return;
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (!publicData?.publicUrl) {
        reject(new Error("Failed to get public URL"));
        return;
      }

      console.log("File uploaded successfully!");
      console.log("Public URL:", publicData.publicUrl);
      resolve(publicData.publicUrl);
    } catch (err) {
      console.error("Unexpected error:", err);
      reject(err);
    }
  });
}
