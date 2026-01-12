import React from 'react';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';

// --- FRONTEND COMPONENT ---
export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-8">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            AI Code Reviewer
          </h1>
          <p className="mt-4 text-slate-400 text-lg">Monitoring saadxsalman's repositories</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon={<Terminal size={24}/>} title="Webhooks" desc="Instant PR detection via GitHub." />
          <FeatureCard icon={<Zap size={24}/>} title="Gemini AI" desc="Context-aware code improvements." />
          <FeatureCard icon={<ShieldCheck size={24}/>} title="Secure" desc="HMAC payload verification." />
        </div>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-slate-500 ml-2">Reviewer Status: Listening...</span>
          </div>
          <p className="text-emerald-400">$ listening for PR events from github/saadxsalman</p>
          <p className="text-slate-500">Waiting for payload at /api/webhook...</p>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors">
      <div className="text-blue-400 mb-3">{icon}</div>
      <h3 className="font-bold text-slate-100">{title}</h3>
      <p className="text-slate-400 text-sm mt-1">{desc}</p>
    </div>
  );
}

// --- BACKEND WEBHOOK HANDLER ---
// Path: /app/api/webhook/route.ts
// (Normally this would be a separate file, but here is the logic you need)
/*
import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function POST(req: NextRequest) {
  const payload = await req.json();
  
  // Only process if a PR is opened or synchronized
  if (payload.action === 'opened' || payload.action === 'synchronize') {
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const pull_number = payload.number;

    // 1. Get the Diff (Stream-based consumption via Octokit)
    const { data: diff } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number,
      mediaType: { format: 'diff' },
    });

    // 2. Send to Gemini for Review
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Review this GitHub PR diff for user saadxsalman. 
    Point out bugs, performance issues, and suggest cleaner code. 
    Keep it concise and friendly.\n\n${diff}`;

    const result = await model.generateContent(prompt);
    const reviewText = result.response.text();

    // 3. Post Comment back to GitHub
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: `### 🤖 AI Code Review\n\n${reviewText}`,
    });
  }

  return NextResponse.json({ received: true });
}
*/