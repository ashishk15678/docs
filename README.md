# AI Docs Platform

A modern, AI-powered documentation platform that helps you create, manage, and collaborate on documentation with the power of artificial intelligence.

## Features

- 🤖 AI-Powered Content Generation
- 📝 Modern Markdown Editor
- 👥 Real-time Collaboration
- 🎨 Beautiful, Responsive Design
- 🌓 Dark Mode Support
- 🔒 Secure Authentication
- 📊 Task Management
- 📤 Export Options

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI:** Google Gemini Pro
- **UI Components:** Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google AI API key (Gemini)
- Clerk account

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_docs_platform"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GOOGLE_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-docs-platform.git
   cd ai-docs-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Sign up or log in to your account
2. Create a new document
3. Use AI to generate content by describing what you want
4. Edit and customize the generated content
5. Collaborate with team members
6. Export your documentation in various formats

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Google for the powerful Gemini AI models
- Clerk for the authentication solution
- All contributors and users of this project
