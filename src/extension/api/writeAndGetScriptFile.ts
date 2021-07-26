import { writeFileSync } from 'fs';
import * as tempy from 'tempy';
export default function(port: number) {
    const path = tempy.file({ name: 'jest-tools.js' });
    const content = `function send(content) {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:${port}/document', false);
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.send(JSON.stringify({ content: content }));
        } catch (e) {}
      }

      const backlogLog = console.log;
      console.log = (...args) => {
        if (args.length > 0 && args[0] !== null && args[0] !== undefined && typeof args[0] === 'object' && args[0].hasOwnProperty('html')) {
          send(args[0].html);
        } else {
          backlogLog(...args);
        }
      };
      `;
    writeFileSync(path, content);

    return path;
}
