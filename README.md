After cloning:
```
npm install
npm start
```

See renderer.js for the code. It demonstrates two bugs: 

1) A webview's zoom breaks if the zoom is set before it's loaded
2) A webview's inner content does not cover 100% of it's parent if the webview is hidden and then re-shown
