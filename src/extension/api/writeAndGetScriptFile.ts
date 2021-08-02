import { writeFileSync } from 'fs';
import * as temp from 'temp-dir';
import { join } from 'path';
export default function(port: number) {
    const path = join(temp, 'jest-tools.js');
    const content = `const http = require('http');

    function send(logs) {
      const data = JSON.stringify({
        logs,
      });

      const options = {
        hostname: 'localhost',
        port: ${port},
        path: '/document',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      };

      const req = http.request(options);
      req.write(data);
      req.end();
    }

    class MyCustomReporter {
      constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
      }

      onTestStart(test) {}
      onTestResult(test, testResult, aggregatedResult) {
        const logs = testResult.console || [];
        const objectLikeMessages = logs
          .map((log) => log.message)
          .filter((log) => log.startsWith('<') && log.endsWith('>'));

        send(objectLikeMessages);
      }

      onRunStart(results) {}
      onRunComplete(contexts, results) {}
    }

    module.exports = MyCustomReporter;
    `;
    writeFileSync(path, content);

    return path;
}
