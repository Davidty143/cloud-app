"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import UploadButton from "@/components/UploadButton"; // Import the UploadButton component

// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Storage() {
  const [fileList, setFileList] = useState<any[]>([]); // State to store the list of files from Supabase
  const [loading, setLoading] = useState<boolean>(false); // State to track loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch files from Supabase storage
  const fetchFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.storage
        .from("storage")
        .list("cloud/", { limit: 100, offset: 0 }); // List files from 'cloud' folder

      if (error) throw error;

      setFileList(data); // Store the list of files in the state
    } catch (err) {
      setError("Error fetching files from Supabase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch files when component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <main>
      <div className="min-h-screen flex justify-center">
        <div className=" w-full 2xl:w-[80%] flex flex-col">
          {/* Main Body */}
          <div className=" w-full h-[100vh] flex flex-row justify-between border-2 border-t-0 border-b-0 border-gray-300">
            <div className=" px-16 ml-2 py-5 w-full flex items-start justify-start">
              {/* File List */}
              <div>
                {loading && <p>Loading files...</p>}
                {error && <p>{error}</p>}
                <h2 className="font-semibold text-lg py-5 w-full">
                  Uploaded Files:
                </h2>
                <ul className="space-y-2 pl-5 w-full">
                  {fileList.map((file, index) => (
                    <li
                      key={index}
                      className="border-2 border-l-0 border-r-0 border-gray-200 p-3 w-full"
                    >
                      <a
                        href={`https://nbjgqenrskvzoyxjlrnq.supabase.co/storage/v1/object/public/storage/cloud/${file.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Body */}
            <div className="w-[300px] flex-shrink-0">
              <div className="flex flex-col items-center">
                {/* Use the UploadButton component */}
                <UploadButton fetchFiles={fetchFiles} />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className=" border-gray-200 border-2 w-full h-[10vh] text-gray-800 text-center flex items-center justify-center text-lg">
            By: David Ty
          </div>
        </div>
      </div>
    </main>
  );
}
