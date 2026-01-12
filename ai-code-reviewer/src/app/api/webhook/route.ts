import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    // 1. Security: Signature Verification
    const hmac = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET || "");
    const digest = Buffer.from("sha256=" + hmac.update(rawBody).digest("hex"), "utf8");
    const checksum = Buffer.from(signature || "", "utf8");

    if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
      console.error("❌ Invalid Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // 2. Handle GitHub Ping
    if (req.headers.get("x-github-event") === "ping") {
      console.log("✅ GitHub Ping Received!");
      return NextResponse.json({ message: "pong" });
    }

    // 3. PR Review Logic
    if (payload.pull_request && (payload.action === "opened" || payload.action === "synchronize")) {
      const owner = payload.repository.owner.login;
      const repo = payload.repository.name;
      const pull_number = payload.pull_request.number;

      console.log(`🚀 Processing PR #${pull_number} for ${owner}/${repo}`);

      // Fetch the Diff
      const { data: diff } = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number,
        headers: { accept: "application/vnd.github.v3.diff" },
      });

      const diffContent = diff as unknown as string;
      const truncatedDiff = diffContent.slice(0, 15000);

      // 4. Gemini 3 Flash Implementation (Matching your Documentation)
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are a senior reviewer for @saadxsalman. Review this diff and give 3-5 technical improvements:\n\n${truncatedDiff}` }]
          }
        ],
      });

      const reviewText = response.text;

      // 5. Post to GitHub
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pull_number,
        body: `## 🤖 AI Code Review (Gemini 3 Flash)\n\n${reviewText}\n\n---\n*Bot for @saadxsalman*`
      });

      console.log("✅ Review Comment Posted successfully!");
      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json({ status: "event ignored" });
  } catch (error: any) {
    console.error("🧪 Webhook Error Detail:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}