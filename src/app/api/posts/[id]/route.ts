import { NextResponse } from "next/server";
import { getPostById } from "@/lib/db";

// Feature 3: Route Handlers — REST-style endpoint

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ data: post });
}

export async function POST(request: Request) {
  // Example: webhook receiver / external API consumer
  const body = await request.json();
  return NextResponse.json({
    received: true,
    echo: body,
    note: "This route handler acts as a public JSON API or webhook receiver. For internal mutations (forms, likes), use Server Actions instead.",
  });
}
