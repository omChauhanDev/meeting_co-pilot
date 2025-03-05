# Presenter AI

*Your documents, explained by AI. Anytime, anywhere.*

Presenter AI is a revolutionary platform that transforms how you present documents to clients. Upload your presentations or PDFs once, and our AI agent will explain them to your clients on your behalf - answering questions, highlighting key points, and providing visual references, all through an interactive voice and video experience.

## The Problem We Solve

As professionals, we often:
- Repeat the same presentations to different clients
- Spend valuable time explaining standard documents
- Need to be available for every client meeting
- Struggle to maintain consistency across presentations

**Presenter AI handles all this for you, giving you back your time while ensuring your clients receive consistent, high-quality explanations.**

## Key Features

- **AI-Powered Presentations**: Upload your PDF or PPT and our AI learns to explain it perfectly
- **Interactive Q&A**: Clients can ask questions and get immediate, contextual answers
- **Visual References**: AI shows relevant slides while explaining concepts
- **Simple Sharing**: Just share a link for clients to join the presentation session
- **No Downloads Required**: Works entirely in the browser
- **Always Available**: Your clients can schedule sessions at their convenience
- **Consistent Messaging**: Ensure your information is presented the same way every time

## How It Works

1. **Upload** your presentation or PDF to our platform
2. We **train** an AI agent on your specific document
3. You receive a **unique link** to share with your clients
4. Clients **join** a live session where our AI presents your document
5. The AI **explains** each slide and **answers** any questions
6. The AI provides **visual references** from your document during explanations

## Perfect For

- **Financial Advisors** explaining investment strategies
- **Legal Professionals** walking clients through standard documents
- **Real Estate Agents** presenting property information
- **Sales Teams** delivering consistent product presentations
- **HR Departments** explaining policies and procedures
- **Educational Institutions** delivering standard course material
- **Insurance Agents** explaining policy details

## Technology

Presenter AI is built using cutting-edge technology:

- **LiveKit**: Powering real-time voice and video communication
- **Next.js**: Creating a responsive, modern web interface
- **AI Document Understanding**: Processing and comprehending your documents
- **Speech Recognition & Synthesis**: Enabling natural conversations
- **Computer Vision**: Identifying and displaying relevant visual content

## Getting Started

### For Document Owners

1. **Sign up** for a Presenter AI account
2. **Upload** your presentation or PDF
3. **Configure** your preferences (AI voice, presentation style)
4. **Share** your unique presentation link with clients
5. **Review** session analytics to improve your materials

### For Clients/Viewers

1. **Click** the shared link
2. **Join** the session (no account required)
3. **Listen** to the AI explanation
4. **Ask questions** at any time
5. **Request clarification** on specific slides or concepts

## Technical Implementation

This repository contains the frontend implementation of Presenter AI, built with:

- **Next.js**: React framework for the application
- **LiveKit**: Real-time voice and video communication
- **TypeScript**: Type-safe code for robust development
- **Tailwind CSS**: Utility-first styling approach

### Project Structure

```
.
├── app/
│   ├── api/
│   │   └── connection-details/
│   │       └── route.ts      # LiveKit token generation
│   ├── layout.tsx
│   └── page.tsx              # Main presentation UI
├── components/
│   ├── AgentDetector.tsx     # AI agent detection
│   ├── AgentVideoDisplay.tsx # Document visualization
│   ├── AudioVisualizer.tsx   # Voice feedback visualization
│   └── ControlBar.tsx        # User controls
├── public/
├── styles/
└── configuration files
```

### Setup for Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/presenter-ai.git
   cd presenter-ai
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables (see `.env.example`)

4. Run the development server:
   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Roadmap

- **Custom AI Voice Options**: Choose from multiple voice profiles
- **Multilingual Support**: Present in multiple languages
- **Advanced Analytics**: Gain insights into client engagement
- **Branching Presentations**: Allow for different paths based on client interests
- **Integration with CRMs**: Connect with your existing client management systems
- **Enterprise SSO**: Secure authentication for large organizations
- **Collaborative Mode**: Allow multiple presenters (human + AI)

**Presenter AI** — Your documents, expertly explained, every time.

*For support or inquiries: work@omchauhan.in*
