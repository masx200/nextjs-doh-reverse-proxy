import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { NextMiddleWare } from "./NextMiddleWare";

/**
 * 主要中间件函数，用于处理请求并根据路径进行反向代理。
 *
 * @param request NextRequest对象，包含请求信息。
 * @param event NextFetchEvent对象，包含触发请求的事件信息。
 * @returns 返回一个Promise，解析为NextResponse对象，该对象包含处理后的响应数据。
 */
export async function middlewareMain(
    request: NextRequest,
    event: NextFetchEvent,
): Promise<NextResponse<unknown>> {
    const nextUrl = new URL(request.url);
    console.log({ url: request.nextUrl.href, method: request.method });
    const DOH_ENDPOINT = process.env.DOH_ENDPOINT ??
        "https://doh.pub/dns-query";

    console.log({ headers: Object.fromEntries(request.headers) });
    const requestHeaders = new Headers(request.headers);
    requestHeaders.append(
        "Forwarded",
        `by=${
            request.headers.get("x-forwarded-host") ?? request.nextUrl.host
        }; for=${request.headers.get("x-forwarded-for")}; host=${
            request.headers.get("x-forwarded-host") ?? request.nextUrl.host
        }; proto=${
            request.nextUrl.href.startsWith("https:") ? "https" : "http"
        }`,
    );
    if (request.nextUrl.pathname === "/dns-query") {
        let url = new URL(DOH_ENDPOINT);
        url.search = nextUrl.search;

        console.log({ url: url.href, method: request.method });

        requestHeaders.set("host", url.hostname);

        return await reverse_proxy(url, requestHeaders, request);
    }

    return NextResponse.next();
}
export async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
): Promise<NextResponse<unknown>> {
    return await middlewareLogger(
        request,
        event,
        async () => {
            return await Strict_Transport_Security(request, event, async () => {
                return await middlewareMain(request, event);
            });
        },
    );
}
export const config = {
    matcher: "/:path*",
};
export async function reverse_proxy(
    url: URL,
    requestHeaders: Headers,
    request: NextRequest,
): Promise<NextResponse<unknown>> {
    try {
        const req = new Request(url, {
            headers: requestHeaders,
            method: request.method,
            body: request.body,
        });
        console.log(
            JSON.stringify(
                {
                    request: {
                        method: req.method,
                        url: req.url,
                        headers: Object.fromEntries(req.headers),
                    },
                },
                null,
                4,
            ),
        );
        const response = await fetch(req);

        return new NextResponse(response.body, {
            headers: response.headers,
            status: response.status,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("bad gateway" + "\n" + String(error), {
            status: 502,
        });
    }
}
export async function middlewareLogger(
    ...[request, _info, next]: Parameters<NextMiddleWare>
): Promise<NextResponse> {
    console.log(
        JSON.stringify(
            {
                request: {
                    method: request.method,
                    url: request.url,
                    headers: Object.fromEntries(request.headers),
                },
            },
            null,
            4,
        ),
    );
    const resp = await next();
    console.log(
        JSON.stringify(
            {
                response: {
                    headers: Object.fromEntries(resp.headers),
                    status: resp.status,
                },
                request: {
                    method: request.method,
                    url: request.url,
                    headers: Object.fromEntries(request.headers),
                },
            },
            null,
            4,
        ),
    );
    return resp;
}
export async function Strict_Transport_Security(
    ...[_request, _info, next]: Parameters<NextMiddleWare>
): Promise<NextResponse> {
    const response = await next();
    const headers = new Headers(response.headers);

    headers.append("Strict-Transport-Security", "max-age=31536000");

    const body = response.body && (await bodyToBuffer(response.body));

    const res = new NextResponse(body, {
        status: response.status,
        headers,
    });
    return res;
}
export async function bodyToBuffer(
    body?: BodyInit | null,
): Promise<Uint8Array> {
    return new Uint8Array(await new Response(body).arrayBuffer());
}
