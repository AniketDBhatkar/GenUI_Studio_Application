import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { IoCodeSlash, IoCopy, IoCloseCircle } from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { ImNewTab } from "react-icons/im";
import { GrRefresh } from "react-icons/gr";
import Editor from "@monaco-editor/react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { GoogleGenAI } from "@google/genai";

const Home = () => {
  /* ---------------- OPTIONS ---------------- */
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  /* ---------------- STATE ---------------- */
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);

  /* ---------------- HELPERS ---------------- */
  const extractCode = (response) => {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  };

  /* ---------------- AI CLIENT ---------------- */
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAdhXoSBYQ_ZcixaXcNY-VQ6L1kVDEcLWw", 
  });

  const getResponse = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your component");
      return;
    }

    try {
      setLoading(true);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a modern, responsive UI component.

Component description: ${prompt}
Framework: ${framework.value}

Rules:
- Return ONLY code
- Single HTML file
- Use Markdown fenced code block`,
      });

      const finalCode = extractCode(response.text);
      setCode(finalCode);
      setOutputScreen(true);
      setTab(1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ACTIONS ---------------- */
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "GenUI-Code.html";
    link.click();

    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  /* ---------------- SELECT STYLES ---------------- */
  const blackStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#09090B",
      borderColor: "#333",
      boxShadow: "none",
      "&:hover": { borderColor: "#555" },
    }),
    menu: (base) => ({ ...base, backgroundColor: "#000" }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#222" : "#000",
      color: "#fff",
    }),
    singleValue: (base) => ({ ...base, color: "#fff" }),
    placeholder: (base) => ({ ...base, color: "#888" }),
    dropdownIndicator: (base) => ({ ...base, color: "#aaa" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <Navbar />

      <div className="flex gap-6 px-[80px] py-6">
        {/* LEFT PANEL */}
        <div className="w-1/2 bg-[#141319] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold">AI Component Generator</h2>
          <p className="text-gray-400 mt-1">
            Describe your UI and let AI generate clean code
          </p>

          <p className="mt-4 font-semibold">Framework</p>
          <Select
            options={options}
            styles={blackStyles}
            value={framework}
            onChange={(e) => setFramework(e)}
            className="mt-2"
          />

          <p className="mt-5 font-semibold">Describe your component</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your thoughts & generate UI components ..."
            className="w-full min-h-[220px] mt-2 bg-[#09090B] rounded-xl p-4 text-gray-200 outline-none"
          />

          <div className="flex justify-end mt-4">
            <button
              disabled={loading}
              onClick={getResponse}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 hover:opacity-80 disabled:opacity-50"
            >
              {loading ? <ClipLoader size={18} color="white" /> : <BsStars />}
              Generate
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 bg-[#141319] rounded-xl shadow-lg overflow-hidden">
          {!outputScreen ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="p-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-3xl">
                <IoCodeSlash />
              </div>
              <p className="mt-3">Generated code will appear here</p>
            </div>
          ) : (
            <>
              {/* TABS */}
              <div className="flex bg-[#17171C] p-2">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 p-2 rounded-lg ${
                    tab === 1 ? "bg-[#333]" : ""
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 p-2 rounded-lg ${
                    tab === 2 ? "bg-[#333]" : ""
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* ACTION BAR */}
              <div className="flex justify-between items-center px-4 py-2 bg-[#17171C]">
                <p className="font-semibold">Editor</p>
                <div className="flex gap-2">
                  {tab === 1 ? (
                    <>
                      <button onClick={copyCode}><IoCopy /></button>
                      <button onClick={downloadFile}><TiExport /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsNewTabOpen(true)}>
                        <ImNewTab />
                      </button>
                      <button onClick={() => setTab(2)}>
                        <GrRefresh />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="h-[65vh]">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="100%"
                    theme="vs-dark"
                    defaultLanguage="html"
                    options={{ fontSize: 14, minimap: { enabled: false } }}
                  />
                ) : (
                  <iframe
                    srcDoc={code}
                    title="preview"
                    className="w-full h-full bg-white"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FULL PREVIEW */}
      {isNewTabOpen && (
        <div className="fixed inset-0 bg-black z-50 ">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-bold sp-text text-[30px]">Preview</h3>
            <button onClick={() => setIsNewTabOpen(false)}>
              <IoCloseCircle size={26} />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-full" />
        </div>
      )}
    </>
  );
};

export default Home;
