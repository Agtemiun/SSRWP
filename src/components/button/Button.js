import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import './button.css';

function Button({ data, showLabIndex = false, onClick }) {
  if (!data) return null;

  const { Index, LabIndex, Route, Name, Description } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(data);
    if (Route) navigate(Route);
  };

  return (
    <div className="btn-wrapper">
      <button className="btn default" onClick={handleClick}>
        <div className="btn-content">
          <div className="btn-name">{Name}</div>
          {showLabIndex && <div className="btn-lab">Lab {LabIndex}</div>}
          <div className="btn-description">
            <ReactMarkdown>{Description}</ReactMarkdown>
          </div>
          <div className="btn-index">#{Index}</div>
        </div>
      </button>
    </div>
  );
}

export default Button;
