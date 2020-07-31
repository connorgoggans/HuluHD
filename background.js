"use strict";

/*
This is the page for which we want to rewrite the User-Agent header.
*/
var targetPage = "https://http-v-darwin.hulustream.com/*";

/*
Set UA string to Opera 12
*/
var ua = "Mozilla/5.0 (compatible; U; NETFLIX) AppleWebKit/533.3 (KHTML, like Gecko) Qt/4.7.0 Safari/533.3 Netflix/3.2 (DEVTYPE=RKU-42XXX-; CERTVER=0) QtWebKit/2.2, Roku 3/7.0 (Roku, 4200X, Wireless)";

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
    console.log(
        "writing"
    );
    for (var header of e.requestHeaders) {
        if (header.name.toLowerCase() === "user-agent") {
            header.value = ua;
        }
    }
    return { requestHeaders: e.requestHeaders };
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    { urls: [targetPage] },
    ["blocking", "requestHeaders"]
);