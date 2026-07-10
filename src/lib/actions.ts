"use server";

import { z } from "zod/v4";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, likePost, createComment } from "./db";
import { getSession, login, logout } from "./auth";

// ─── Zod schemas ──────────────────────────────────────────

const NewPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

const CommentSchema = z.object({
  text: z.string().min(2, "Comment must be at least 2 characters"),
  postId: z.string().min(1),
});

// ─── Types ────────────────────────────────────────────────

export type ActionState = {
  readonly success: boolean;
  readonly errors?: readonly string[];
  readonly message?: string;
};

// ─── Server Actions ───────────────────────────────────────

export async function createPostAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Auth check inside the action — this is a public endpoint
  const session = await getSession();
  if (!session) {
    return { success: false, errors: ["You must be logged in to create a post."] };
  }

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
  };

  const result = NewPostSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((i) => i.message),
    };
  }

  await createPost({
    ...result.data,
    author: session.username,
    imageUrl: "/images/placeholder.svg",
  });

  revalidatePath("/blog");
  return { success: true, message: "Post created!" };
}

export async function addCommentAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getSession();
  if (!session) {
    return { success: false, errors: ["You must be logged in to comment."] };
  }

  const raw = {
    text: formData.get("text"),
    postId: formData.get("postId"),
  };

  const result = CommentSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((i) => i.message),
    };
  }

  await createComment({
    ...result.data,
    author: session.username,
  });

  revalidatePath(`/blog`);
  return { success: true, message: "Comment added!" };
}

export async function likePostAction(postId: string): Promise<number> {
  const newCount = await likePost(postId);
  revalidatePath("/blog");
  return newCount;
}

export async function loginAction(): Promise<void> {
  await login();
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/");
}
