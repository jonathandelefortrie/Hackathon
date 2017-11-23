import { ApiAiClient } from 'api-ai-javascript';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      speak: false,
      conversation: []
    };

    this.ai = new ApiAiClient({
      accessToken: '6801abea75db44e08300fe43b612a431'
    });

    this.recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    this.recognition.interimResults = false;
    this.recognition.lang = 'fr-FR';
    this.recognition.addEventListener('result', e => {
      const speech = e.results[e.results.length - 1][0];
      speech.confidence > 0.1 && this.chat(speech.transcript);
    });

    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.lang = 'fr-FR';
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ speak: !this.state.speak }, () => {
      this.state.speak ? this.recognition.start() : this.recognition.stop();
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.chat(e.target.user.value);
  };

  chat = value => {
    this.setState(
      state => {
        state.value = '';
        state.conversation.push({
          type: 'user',
          text: value
        });
        return state;
      },
      () => {
        this.ai
          .textRequest(value)
          .then(({ result }) => {
            const text =
              result.score > 0
                ? result.fulfillment.speech
                : 'Je n\'ai absolument rien compris.';

            this.utterance.text = text;
            window.speechSynthesis.speak(this.utterance);

            this.setState(state => {
              state.conversation.push({
                type: 'bot',
                text
              });
              return state;
            });
          })
          .catch(({ message }) => {
            this.setState(state => {
              state.conversation.push({
                type: 'error',
                text: message
              });
              return state;
            });
          });
      }
    );
  };

  render() {
    const { conversation, value } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{`City Yeah`}</h1>
        </header>
        <ul className="App-list">
          {conversation.map((item, index) => {
            return (
              <li
                key={index}
                className={`App-list-item App-list-item--${item.type}`}>
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>
        <form className="App-form" onSubmit={this.handleSubmit}>
          <input name="user" value={value} onChange={this.handleChange} />
        </form>
        <button
          onClick={this.handleClick}
          style={{ backgroundColor: this.state.speak ? 'red' : '' }}>
          Speech
        </button>
      </div>
    );
  }
}

export default App;
