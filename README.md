<div align="center">

# 🧠 Neural Meet

### Realtime Video Meeting With Customised AI Agents

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Stream](https://img.shields.io/badge/Stream-Video%20%26%20Chat-005FFF?style=for-the-badge)](https://getstream.io/)

**Neural Meet** is an innovative AI-powered meeting platform that allows you to create personalized AI agents to conduct video meetings with real-time voice interaction, automatic transcription, intelligent summarization, and post-meeting AI chat assistance.

[Live Demo](https://neural-meet.vercel.app/) • [Features](#-features) • [Tech Stack](#-tech-stack) • [How It Works](#-how-it-works)

</div>

---

## 📖 What is Neural Meet?

Neural Meet is a **AI meeting platform** that revolutionizes how you conduct and review meetings. Instead of traditional video calls, you can:

1. **Create Custom AI Agents** - Design AI assistants with specific personalities, instructions, and purposes (e.g., interviewer, coach, tutor, consultant)
2. **Conduct Real-Time AI Meetings** - Have voice conversations with your AI agents using OpenAI's Realtime API through video calls
3. **Automatic Processing** - Get automatic transcription, recording, and AI-generated summaries after each meeting
4. **Post-Meeting AI Chat** - Continue conversations with your AI agent via text chat, asking follow-up questions about the meeting

Think of it as having a personalized AI assistant that can participate in video calls, remember everything discussed, and help you review and act on meeting outcomes.

---

## 🚀 Using the Deployed Application

### Getting Started

1. **Sign Up / Sign In**
   - Navigate to the application
   - Create an account using **Email/Password**, **Google**, or **GitHub** authentication
   
2. **Create Your AI Agent**
   - Go to the **Agents** section
   - Click **"New Agent"**
   - Give your agent a name (e.g., "Interview Coach", "Language Tutor")
   - Write custom instructions that define the agent's behavior and personality
   - The agent will automatically get a unique avatar

3. **Schedule a Meeting**
   - Navigate to the **Meetings** section
   - Click **"New Meeting"**
   - Provide a meeting name and select your AI agent
   - Your meeting is ready to start

4. **Join Your Meeting**
   - Click on your scheduled meeting
   - Grant camera and microphone permissions
   - Join the video call with your AI agent
   - Have a real-time voice conversation!

5. **Review Completed Meetings**
   - After ending the meeting, it will be processed automatically
   - Access four tabs for each completed meeting:
     - **📖 Summary** - AI-generated meeting summary with key points
     - **📝 Transcript** - Full searchable transcript with speaker identification
     - **🎥 Recording** - Video playback of your meeting
     - **✨ Ask AI** - Chat with your AI agent about the meeting

---

## ✨ Features

### 🤖 AI Agents
- **Custom AI Personalities** - Create agents with unique instructions and behaviors
- **Auto-Generated Avatars** - Each agent gets a unique robot avatar using DiceBear
- **Reusable Templates** - Use the same agent across multiple meetings

### 📹 Video Meetings
- **HD Video Calls** - 1080p quality recording with Stream Video SDK
- **Real-Time Voice AI** - OpenAI Realtime API integration for natural conversations
- **Camera & Mic Controls** - Full control over your audio/video during calls
- **Speaker Layout** - Professional meeting interface

### 🎙️ Transcription & Recording
- **Automatic Transcription** - Real-time transcription with speaker identification
- **Auto-Recording** - Every meeting is automatically recorded
- **Closed Captions** - Live captions during meetings

### 📊 Meeting Intelligence
- **AI Summaries** - GPT-4 powered meeting summaries with:
  - Overview section with key takeaways
  - Thematic notes broken down by topic
- **Searchable Transcripts** - Find any moment with highlighted search
- **Duration Tracking** - Track meeting length and timestamps

### 💬 Post-Meeting AI Chat
- **Continue the Conversation** - Ask follow-up questions via text
- **Context-Aware Responses** - AI remembers the entire meeting
- **Conversation History** - Chat maintains context across messages

### 🔐 Authentication & Security
- **Multiple Auth Options** - Email/Password, Google OAuth, GitHub OAuth
- **Secure Sessions** - Token-based authentication with Better Auth
- **Webhook Verification** - Signed webhook payloads for security

### 📱 Modern UI/UX
- **Responsive Design** - Works on desktop and mobile
- **Dark/Light Mode Support** - Theme switching capability
- **Data Tables** - Sortable, searchable, paginated tables
- **Loading & Error States** - Polished user experience

---

## 🏗️ Project Structure

```
Neural-Meet/
├── public/
│   ├── chat-instructions.txt    # AI chat behavior template
│   └── system-prompt.txt        # Meeting summarization prompt
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Authentication routes
│   │   │   ├── sign-in/         # Sign in page
│   │   │   └── sign-up/         # Sign up page
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   ├── agents/          # Agent management
│   │   │   │   └── [agentId]/   # Individual agent view
│   │   │   └── meetings/        # Meeting management
│   │   │       └── [meetingId]/ # Individual meeting view
│   │   ├── api/
│   │   │   ├── auth/            # Better Auth API routes
│   │   │   ├── ingest/          # Inngest background jobs
│   │   │   ├── trpc/            # tRPC API routes
│   │   │   └── webhook/         # Stream webhook handler
│   │   └── call/
│   │       └── [meetingId]/     # Video call interface
│   │
│   ├── components/              # Shared UI components
│   │   ├── ui/                  # shadcn/ui components
│   │   └── ...                  # Custom components
│   │
│   ├── DB/
│   │   ├── index.ts             # Drizzle database connection
│   │   └── schema.ts            # Database schema definitions
│   │
│   ├── hooks/                   # Custom React hooks
│   │
│   ├── ingest/
│   │   ├── client.ts            # Inngest client setup
│   │   └── functions.ts         # Background job definitions
│   │
│   ├── lib/
│   │   ├── auth.ts              # Better Auth configuration
│   │   ├── auth-client.ts       # Auth client utilities
│   │   ├── stream-video.ts      # Stream Video SDK setup
│   │   ├── stream-chat.ts       # Stream Chat SDK setup
│   │   ├── avatar.tsx           # Avatar generation
│   │   └── utils.ts             # Utility functions
│   │
│   ├── modules/                 # Feature modules
│   │   ├── agents/              # Agent management module
│   │   │   ├── hooks/           # Agent-related hooks
│   │   │   ├── server/          # tRPC procedures
│   │   │   └── ui/              # Agent UI components
│   │   ├── meetings/            # Meeting management module
│   │   │   ├── hooks/           # Meeting-related hooks
│   │   │   ├── server/          # tRPC procedures
│   │   │   └── ui/              # Meeting UI components
│   │   ├── call/                # Video call module
│   │   │   └── ui/              # Call UI components
│   │   ├── auth/                # Auth UI components
│   │   ├── dashboard/           # Dashboard components
│   │   └── home/                # Home page components
│   │
│   ├── trpc/                    # tRPC configuration
│   │   ├── init.ts              # tRPC initialization
│   │   ├── client.tsx           # Client-side tRPC
│   │   ├── server.tsx           # Server-side tRPC
│   │   └── routers/             # API routers
│   │
│   └── constants.ts             # App constants
│
├── drizzle.config.ts            # Drizzle ORM configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

---

## ⚙️ How It Works

### Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│   tRPC API      │────▶│  Neon Database  │
│   (Frontend)    │     │   (Backend)     │     │  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Stream Video   │     │    Inngest      │
│  (Realtime AI)  │     │ (Background Jobs)│
└─────────────────┘     └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   OpenAI API    │     │   GPT-4o        │
│ (Realtime Voice)│     │  (Summarizer)   │
└─────────────────┘     └─────────────────┘
```

### Meeting Lifecycle

1. **Meeting Creation**
   - User creates a meeting linked to an AI agent
   - Stream Video call is initialized with transcription & recording enabled
   - Meeting status: `upcoming`

2. **Call Session Started** (Webhook: `call.session_started`)
   - Meeting status changes to `active`
   - OpenAI Realtime connection is established
   - AI agent joins with custom instructions
   - Real-time voice conversation begins

3. **During the Call**
   - Live transcription with closed captions
   - Video recording in progress
   - Speaker layout with call controls

4. **Call Ended** (Webhook: `call.session_ended`)
   - Meeting status changes to `processing`
   - End time is recorded

5. **Transcription Ready** (Webhook: `call.transcription_ready`)
   - Transcript URL is saved
   - Inngest background job triggered for summarization

6. **Background Processing** (Inngest: `meetings/processing`)
   - Fetch and parse JSONL transcript
   - Identify speakers (users and agents)
   - Generate AI summary using GPT-4
   - Meeting status changes to `completed`

7. **Post-Meeting**
   - User can view summary, transcript, recording
   - Text chat with AI agent using meeting context
   - AI responds based on meeting summary and chat history

### Real-Time AI Voice Integration

Neural Meet uses **Stream's OpenAI integration** to enable voice conversations:

```typescript
const realtimeClient = await streamVideo.video.connectOpenAi({
    call,
    openAiApiKey: process.env.AI_API_KEY!,
    agentUserId: existingAgent.id
});

realtimeClient.updateSession({
    instructions: existingAgent.instructions,
});
```

The AI agent participates in the video call as a regular participant, responding to voice input in real-time.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 16 | Full-stack React framework with App Router |
| **Language** | TypeScript | Type-safe development |
| **UI Library** | React 19 | UI components with latest features |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **Components** | shadcn/ui | Accessible component library |
| **Database** | Neon (PostgreSQL) | Serverless PostgreSQL database |
| **ORM** | Drizzle ORM | Type-safe database queries |
| **Authentication** | Better Auth | Flexible auth with OAuth support |
| **API Layer** | tRPC | End-to-end typesafe APIs |
| **Data Fetching** | TanStack Query | Server state management |
| **Video/Audio** | Stream Video SDK | Real-time video infrastructure |
| **Chat** | Stream Chat SDK | Real-time chat infrastructure |
| **AI Voice** | OpenAI Realtime API | Voice conversation with AI |
| **AI Text** | OpenAI GPT-4o | Summarization and chat |
| **Background Jobs** | Inngest | Reliable background processing |
| **Avatars** | DiceBear | Dynamic avatar generation |
| **Form Handling** | React Hook Form + Zod | Type-safe form validation |
| **Markdown** | react-markdown | Render AI summaries |

---

## 📋 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=your_neon_database_url

# Authentication
BETTER_AUTH_SECRET=your_secret_key

# OAuth Providers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stream (Video & Chat)
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your_stream_api_key
NEXT_PUBLIC_STREAM_SECRET_KEY=your_stream_secret
NEXT_PUBLIC_STREAM_CHAT_API_KEY=your_stream_chat_api_key
STREAM_CHAT_SECRET_KEY=your_stream_chat_secret

# OpenAI
AI_API_KEY=your_openai_api_key

# Inngest
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

---

## 🏃‍♂️ Getting Started (Development)

### Prerequisites
- Node.js 18+
- pnpm/npm/yarn
- PostgreSQL database (Neon recommended)
- Stream account
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Neural-Meet.git
cd Neural-Meet

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Database Studio

```bash
# View and manage database
npm run db:studio
```

### Webhook Development

For local webhook testing with ngrok:

```bash
npm run dev:webhook
```

---

## 🌟 Key Highlights

- **🎯 Unique Concept** - AI agents that participate in video calls
- **🔄 End-to-End Flow** - From meeting creation to AI-powered review
- **📊 Full Observability** - Transcripts, recordings, and summaries
- **💬 Continuous AI** - From voice during calls to chat after
- **🏗️ Modern Architecture** - Type-safe, modular, scalable
- **🎨 Polished UI** - Professional, responsive interface

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">

**Built with ❤️ By Arvind Choudhary**

</div>
