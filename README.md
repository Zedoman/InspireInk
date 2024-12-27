# InspireInk

## Overview
The InspireInk is a powerful tool designed to assist writers in crafting stories, poems, or screenplays. It provides features such as generating plot twists, refining character arcs, and offering style suggestions based on famous authors. The companion leverages LangChain and copilotkit to integrate with external tools for writing inspiration and allows collaborative storyboarding in real time.

### Features
1. **Generate Plot Twists or Endings:** Suggest surprising plot twists or help wrap up your story with a creative ending.

2. **Character Development Tips:** Provide traits and development tips for creating complex and compelling characters.

3. **Style Suggestions Based on Famous Authors:** Offer writing style tips inspired by well-known authors.

4. **Collaborative Storyboarding:** Facilitate real-time collaboration on storyboarding and writing.



Video:



https://github.com/user-attachments/assets/8a0464f3-debb-41b4-90e5-a5976d907264

### Steps

1. **Clone the Repository:**
```bash
git clone https://github.com/Zedoman/InspireInk
cd creative-writing-companion
```

2. **Install Node.jsDependencies:**
```bash
cd frontend
npm install
```

3. **Install Python Dependencies:**
```bash
cd backend
pip install poetry
poetry install
```

4. **Set Up Environment Variables:**
```bash
GOOGLE_API_KEY=gemini_api_key
```

### Usage
1. **Starting the Backend**
Navigate to the backend directory and start the server:

```bash
cd backend
poetry run demo
```

2. **Starting the Frontend**
Navigate to the frontend directory and start the development server:

```bash
cd frontend
npm start
```

### Components
#### Backend
1. **FastAPI:** The backend is built using FastAPI and includes endpoints to handle various writing assistance features.

2. **LangGraph:** Used for managing the state and tools.

3. **CopilotKitSDK:** Integrates with the CopilotKit for providing the writing companion features.

4. **Gemini (Google Generative AI):** Uses the Gemini model for generating creative suggestions.


#### Frontend
1. **Next.js:** The frontend is built using Next.js.

2. **CopilotKit:** Provides React components and hooks for integrating with the CopilotKit backend.


## Social Media
X: https://x.com/HbjarkoZedo/status/1867993286151139339






