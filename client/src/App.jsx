import React from 'react';
import Stats from './Stats'
import {analyzeKeywords} from './api'
import './styles/main.scss'
import cx from 'classnames'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
    this.submit = this.submit.bind(this);
    this.clear = this.clear.bind(this);
  }

  getInitState() {
    return {
      url: '',
      stats: null,
      error: ''
    }
  }

  render() {
    const {url, stats, error} = this.state;
    return (
      <div className="keywordsAnalyzer">
        <h1>Page Keywords Analyzer</h1>
        <form onSubmit={this.submit}
              className="keywordsAnalyzer__form">
          <input type="url"
                 required
                 placeholder="Input page URL..."
                 value={url}
                 onChange={e => this.setState({url: e.target.value})}
                 className={cx('keywordsAnalyzer__url', {'keywordsAnalyzer__url--error': this.getUrlError()})}
          />
          <div className="keywordsAnalyzer__error">{this.getUrlError()}</div>
          <div>
            <button type="submit">
              Get Stats!
            </button>
            <button type="button" onClick={this.clear}>
              Clear
            </button>
          </div>
        </form>
        {
          error && <p className="keywordsAnalyzer__error">{error.message}</p>
        }
        {
          !error && stats && <Stats items={stats}/>
        }
      </div>
    )
  }

  getUrlError() {
    return _.get(this.state.error, 'response.data.url')
  }

  submit(e) {
    e.preventDefault();
    analyzeKeywords(this.state.url)
      .then(res => this.setState({stats: res.data, error: null}))
      .catch(error => this.setState({error, stats: []}))
  }

  clear() {
    this.setState(this.getInitState());
  }
}