<img src="./icons/Github banner.png">

Jest tools let you inspect html with ease when simple logging to console is not enough.

## Getting started

-   Install the [VSCode extension.](https://marketplace.visualstudio.com/items?itemName=Raathigeshan.jest-tools)
-   From VSCode's command palette run the `Jest tools: Start jest tools`
-   This will show you the Jest tools UI. **The initial screen will ask you to start Jest with additional command line arguments (A custom jest reporter to capture logs).**
-   Then simply `console.log()` a html string and it will show up in the inspector.

### An example usage

Logging the entire body content after rendering a component.

```javascript
import { render } from '@testing-library/react';

test('should work', () => {
    render(<App />);
    console.log(document.body.innerHtml); // this html will shown in jest tool's inspector
});
```

### Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/Raathigesh"><img src="https://avatars0.githubusercontent.com/u/3108160?v=4" width="100px;" alt=""/><br /><sub><b>Raathi Kugarajan</b></sub></a><br /><a href="https://github.com/Raathigesh/waypoint/commits?author=Raathigesh" title="Code">💻</a> <a href="https://github.com/Raathigesh/waypoint/commits?author=Raathigesh" title="Documentation">📖</a> <a href="https://github.com/Raathigesh/waypoint/commits?author=Raathigesh" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
