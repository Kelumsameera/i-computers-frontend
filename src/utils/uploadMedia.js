import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://woinupcbvkriufpyhwtm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaW51cGNidmtyaXVmcHlod3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODQ3MDksImV4cCI6MjA3ODE2MDcwOX0.Yl7vEGQ-5dL9hvP5zbURT-Q7JZI8JIFYyfdP7fzQHFE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function uploadMedia(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = `${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) return reject(uploadError);

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      resolve(data.publicUrl);
    } catch (err) {
      reject(err);
    }
  });
}
