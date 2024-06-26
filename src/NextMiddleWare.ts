import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export type NextMiddleWare = (
    request: NextRequest,
    event: NextFetchEvent,
    next: () => Promise<NextResponse<any> | Response>,
) => Promise<NextResponse<any> | Response>;
