import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: Request) {
  const { answers } = await req.json();

  const filePath = path.join(process.cwd(), "src/app/data/questions.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const allQuestions = JSON.parse(fileContents);

  // Map for quick lookup
  const correctMap = allQuestions.reduce((acc: any, q: any) => {
    acc[q._id] = q.answer;
    return acc;
  }, {});

  let score = 0;
  for (const [id, ans] of Object.entries(answers)) {
    if (correctMap[id] === ans) score += 2;
  }

  return NextResponse.json({ score });
}
