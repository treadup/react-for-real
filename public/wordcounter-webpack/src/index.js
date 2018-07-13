import React from 'react';
import ReactDOM from 'react-dom';

function makeFakeRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() > 0.5) {
                resolve('Success!');
            } else {
                reject('Failure');
            }
        }, 500);
    });
}

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const WAITING = 'WAITING';
const IDLE = 'IDLE';

function SaveButton({ onClick }) {
    return (
        <button className="pv2 ph3" onClick={onClick}>
            Save
        </button>
    );
}

function AlertBox({ status }) {
    if (status === FAILURE) {
        return <div className="mv2">Save failed</div>;
    } else if (status === SUCCESS) {
        return <div className="mv2">Save successful</div>;
    } else if (status === WAITING) {
        return <div className="mv2">Saving...</div>;
    } else {
        return null;
    }
}

class SaveManager extends React.Component {

    constructor() {
        super();
        this.save = this.save.bind(this);
        this.state = { saveStatus: IDLE };
    }

    save(event) {
        event.preventDefault();
        this.setState(() => ({saveStatus: WAITING}));
        this.props
            .saveFunction(this.props.data)
            .then(
                success => this.setState(() => ({saveStatus: SUCCESS})),
                failure => this.setState(() => ({saveStatus: FAILURE}))
            );
    }

    render() {
        return (
            <div className="flex flex-column mv2">
                <SaveButton onClick={this.save} />
                <AlertBox status={this.state.saveStatus} />
            </div>
        );
    }
}

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
                    <SaveManager saveFunction={makeFakeRequest} data={this.state}/>
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
