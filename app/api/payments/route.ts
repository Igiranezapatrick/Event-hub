import { NextRequest, NextResponse } from "next/server";
import { initiatePaymentAction } from "@/app/actions/payments";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const result = await initiatePaymentAction(formData);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

