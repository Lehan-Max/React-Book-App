import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://4a21ad3f39cf4204aec8be7255c25e75@o4504146708594688.ingest.sentry.io/4504146713116672",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
      });
}

function log(error) {
    Sentry.captureException(error);
}

const exportedObject =  {
    init,
    log
}

export default exportedObject;