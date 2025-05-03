import React from 'react';
import './Footer.css';
import footerData from '../../data/layout/footer.json';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {footerData.blocks.map((block, index) => (
          <div key={index} className="footer-block">
            <h4>{block.title}</h4>
            <ul>
              {block.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} title={link.text}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
