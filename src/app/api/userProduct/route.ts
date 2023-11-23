import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "" }, { status: 200 });
  }
}
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "" }, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  try {
    return NextResponse.json({ message: "" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "" }, { status: 500 });
  }
}
