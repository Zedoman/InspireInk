"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";

export function WaitForUserInput() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useCopilotAction({
    name: "AskHuman",
    available: "remote",
    parameters: [
      {
        name: "question",
      },
    ],
    handler: async ({ question }) => {
      return window.prompt(question);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white overflow-hidden">
      <div className="relative z-10 text-center animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 animate__animated animate__fadeIn animate__delay-1s">
          Creative Writing Companion
        </h1>

        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          Dive into your creative process! Ask for plot twists, character development tips, or style suggestions inspired by famous authors.
          Let&apos;s bring your stories to life with endless possibilities!
        </p>
      </div>

      {/* Render CopilotSidebar permanently */}
      <CopilotSidebar 
        // Any necessary props for CopilotSidebar can go here
      />

      {/* Background animations */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 opacity-50 animate__animated animate__pulse animate__infinite"></div>
    </div>
  );
}
