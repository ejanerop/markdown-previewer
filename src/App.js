import {useState} from "react";
import "./App.css";
import {setOptions, Renderer, marked} from "marked";
import Prism from "prismjs";

function App() {
    const placeholder = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `;
    const [result, setResult] = useState(placeholder);

    const updateMarkdown = (event) => {
        setResult(event.target.value);
    };
    setOptions({
        breaks: true,
        highlight: function (code) {
            return Prism.highlight(
                code,
                Prism.languages.javascript,
                "javascript"
            );
        },
    });
    const renderer = new Renderer();
    renderer.link = function (href, title, text) {
        return `<a target="_blank" href="${href}">${text}</a>`;
    };

    return (
        <div className="App">
            <div className="editor-container">
                <div className="editor-header">
                    <div className="editor-header-title">
                        <h1>Editor</h1>
                    </div>
                </div>
                <div className="editor-body">
                    <textarea
                        id="editor"
                        name="editor"
                        type="text"
                        onChange={updateMarkdown}
                        value={result}></textarea>
                </div>
            </div>
            <div className="result-container">
                <div className="result-header">
                    <h1>Result: </h1>
                </div>
                <div
                    id="preview"
                    dangerouslySetInnerHTML={{
                        __html: marked(result, {renderer: renderer}),
                    }}
                />
            </div>
        </div>
    );
}

export default App;
