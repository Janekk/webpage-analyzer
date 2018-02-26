import React from 'react';
import _ from 'lodash';
import './styles/_Stats.scss'

export default class Stats extends React.PureComponent {
  render() {
    const {items} = this.props;
    return (
      <div className="keywordStats">
        <h3>Results:</h3>
        <p>Found {_.size(items)} keywords</p>
        {
          !_.isEmpty(items) && (
            <table>
              <thead>
              <tr>
                <th>Keyword</th>
                <th>Count</th>
              </tr>
              </thead>
              {
                _.map(items, it => (
                  <tr>
                    <td>{it.keyword}</td>
                    <td>{it.count}</td>
                  </tr>)
                )
              }
            </table>
          )
        }
      </div>
    )
  }
}