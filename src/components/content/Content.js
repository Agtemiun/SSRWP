import React from 'react';
import './Content.css';
import ReactMarkdown from 'react-markdown';

function Content({ selectedButtonData }) {
  return (
    <div className="content">
      {selectedButtonData ? (
        <>
          <p><ReactMarkdown>{selectedButtonData.Description}</ReactMarkdown></p>
          {/*<p><strong>Индекс:</strong> #{selectedButtonData.Index}</p>*/}
        </>
      ) : (
        <p>Выберите пункт меню, чтобы увидеть содержание.</p>
      )}
    </div>
  );
}

export default Content;
