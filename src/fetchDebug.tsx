import { JSONSTRINGIFYNULL4 } from "./JSONSTRINGIFYNULL4.ts";

// 异步函数，发送一个用于调试的请求
export async function fetchDebug(
    input: RequestInfo | URL, // 请求的URL或URL对象
    init?: RequestInit | undefined, // 请求的初始化配置，可选参数
): Promise<Response> {
    // 返回一个Promise<Response>
    const request = new Request(input, init); // 创建一个Request对象
    const { url, method, headers } = request; // 获取URL、请求方法和请求头信息
    console.log(
        JSONSTRINGIFYNULL4(
            {
                request: {
                    // 打印请求信息
                    url,
                    method,
                    headers: Object.fromEntries(headers),
                },
            },
            null,
            4,
        ),
    );
    const response = await fetch(request); // 发送请求并获取响应

    console.log(
        JSONSTRINGIFYNULL4(
            {
                response: {
                    // 打印响应信息
                    // url: request.url, // 请求的URL
                    status: response.status, // 响应状态码
                    // method, // 请求方法
                    headers: Object.fromEntries(response.headers), // 响应头信息
                },
                request: {
                    // 打印请求信息
                    url,
                    method,
                    headers: Object.fromEntries(headers),
                },
            },
            null,
            4,
        ),
    );
    return response; // 返回响应对象
}
