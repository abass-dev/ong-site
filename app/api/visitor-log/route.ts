// app/api/visitor-log/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const visitorLog = await prisma.visitorLog.create({
      data: {
        hostname: data.hostname,
        userAgent: data.userAgent,
        platform: data.platform,
        language: data.language,
        screenResolution: data.screenResolution,
        timezone: data.timezone,
        referrer: data.referrer,
        ip: data.ip,
      }
    });

    return NextResponse.json(visitorLog, { status: 201 });
  } catch (error) {
    console.error('Error logging visitor:', error);
    return NextResponse.json(
      { error: 'Failed to log visitor', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const visitorLogs = await prisma.visitorLog.findMany();
    return NextResponse.json(visitorLogs);
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor logs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}