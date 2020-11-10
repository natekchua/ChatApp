import React from 'react';
import { Typography } from 'antd';
import ReactEmoji from 'react-emoji';

import './ToolTip.css';

const { Text } = Typography;

const ToolTip = () => (
  <div className='tool-tip-container'>
    <h1 className='useful-commands-header'>Commands</h1>
    <div className='commands'>
      <h2><Text style={{ color: '#fff'}} keyboard>/name</Text> to change your name!</h2>
      <h2><Text style={{ color: '#fff'}} keyboard>/color</Text> to color your name!</h2>
      <h2>Type your favorite emojis:</h2>
        <ul>
          <li><Text style={{ color: '#fff'}} keyboard>:)</Text>{' ---> '}{ReactEmoji.emojify(':)')}</li>
          <li><Text style={{ color: '#fff'}} keyboard>:(</Text>{' ---> '}{ReactEmoji.emojify(':(')}</li>
          <li><Text style={{ color: '#fff'}} keyboard>:O</Text>{' ---> '}{ReactEmoji.emojify(':o')}</li>
          <li>and much more!</li>
        </ul>
    </div>
  </div>
)

export default ToolTip;
