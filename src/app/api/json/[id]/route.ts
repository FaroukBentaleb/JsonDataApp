import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const json = await prisma.jsonData.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    if (!json) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return NextResponse.json(
      { error: "Error fetching JSON data" },
      { status: 500 }
    );
  }
}