import { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

export default function Upload() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      alert("Excel uploaded successfully!");

    } catch (err) {

      alert("Upload failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}

      <div className="w-64 bg-slate-900 p-6">

        <h1 className="text-3xl font-bold mb-10">
          MaxX AI
        </h1>

        <div className="space-y-4">

          <a
            href="/dashboard"
            className="block bg-slate-800 hover:bg-blue-600 p-4 rounded-xl transition-all"
          >
            Dashboard
          </a>

          <a
            href="/upload"
            className="block bg-blue-600 p-4 rounded-xl"
          >
            Upload Data
          </a>

        </div>

      </div>

      {/* Main Content */}

      <div className="flex-1 flex items-center justify-center">

        <div className="bg-slate-900 p-10 rounded-3xl w-[600px] shadow-2xl border border-slate-800">

          <div className="flex items-center gap-4 mb-8">

            <UploadCloud size={40} />

            <div>
              <h2 className="text-3xl font-bold">
                Upload Excel File
              </h2>

              <p className="text-slate-400">
                Upload trainee data for AI analysis
              </p>
            </div>

          </div>

          {/* Upload Box */}

          <label
            className="border-2 border-dashed border-slate-700 hover:border-blue-500 transition-all rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer"
          >

            <UploadCloud size={60} className="mb-4" />

            <p className="text-lg">
              Drag & Drop Excel File
            </p>

            <p className="text-slate-400 mt-2">
              .xlsx only
            </p>

            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

          </label>

          {/* File Name */}

          {file && (

            <div className="mt-6 bg-slate-800 p-4 rounded-xl">

              Selected File:
              <span className="text-blue-400 ml-2">
                {file.name}
              </span>

            </div>

          )}

          {/* Upload Button */}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-2xl font-semibold text-lg"
          >

            {loading ? "Uploading..." : "Upload & Analyze"}

          </button>

        </div>

      </div>

    </div>
  );
}