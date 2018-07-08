function Counter({count}) {
    return (
        <p className="mb2">
            Word count: {count}
        </p>
    );
}

function ProgressBar({ completion }) {
    const percentage = completion * 100;;
    return (
        <div className="mb2 flex flex-column">
            <label htmlFor="progess" className="mv2">Progress</label>
            <progress value={completion} id="progress" className="bn">
                {percentage}%
            </progress>
        </div>
    );
}

function Editor({ text, onTextChange }) {
    function handleChange(event) {
        onTextChange(event.target.value);
    }

    return (
        <div className="flex flex-column mv2">
            <label htmlFor="editor" className="mv2">
                Enter your text:
            </label>
            <textarea
                value={text}
                onChange={handleChange}
                id="editor"
            />
        </div>
    );
}

function countWords(text) {
    return text ? text.match(/\w+/g).length : 0;
}

class WordCounter extends React.Component {

    constructor() {
        super();
        this.state = { text: '' };
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(currentText) {
        this.setState(() => ({text: currentText}));
    }

    render() {
        const { targetWordCount } = this.props;
        const { text } = this.state;
        const wordCount = countWords(text);
        const progress = wordCount / targetWordCount;
        return (
            <form className="measure pa4 sans-serif">
                <Editor onTextChange={this.handleTextChange} text={text} />
                <div className="flex mt3">
                    <Counter count={wordCount}/>
                    <ProgressBar completion={progress}/>
                </div>
            </form>
        );
    }

}

function OldWordCounter({text, targetWordCount}) {
    const wordCount = countWords(text);
    const progress = wordCount / targetWordCount;
    return (
        <form className="measure pa4 sans-serif">
            <Editor text={text} />
            <div className="flex mt3">
                <Counter count={wordCount}/>
                <ProgressBar completion={progress}/>
            </div>
        </form>
    );
}

ReactDOM.render(
    <WordCounter targetWordCount={10} />,
    document.getElementById('app')
);
