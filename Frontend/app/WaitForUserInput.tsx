"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useState } from "react";

export function WaitForUserInput() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-purple-600 to-indigo-900 text-black">
      <div className="text-4xl font-extrabold mb-4 animate-fade-in">
        Creative Writing Companion
      </div>
      
      <div className="text-lg text-gray-200 max-w-lg text-center mb-6">
        Use this tool to dive into your creative process. Ask for plot twists, 
        character development tips, or style suggestions inspired by famous authors. 
        Let&apos;s bring your stories to life!
      </div>

      {isPopupOpen && (
        <CopilotPopup 
          defaultOpen={true} 
          clickOutsideToClose={false} 
          className="rounded-lg shadow-lg border border-indigo-500 animate-scale-in"
        />
      )}

      <button 
        className="mt-6 px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-400 focus:outline-none transition-all duration-300 rounded-full font-semibold shadow-md text-white"
        onClick={() => setIsPopupOpen(true)}
      >
        Start Writing
      </button>
    </div>
  );
}
