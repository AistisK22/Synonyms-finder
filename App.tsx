import * as React from 'react';
import './style.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
export default function App() {
  const [word, setWord] = React.useState('');
  const [syn, setSyn] = React.useState<any[]>([]);

  function find(e: React.FormEvent) {
    e.preventDefault();
    fetch('https://api.datamuse.com/words?rel_syn=' + word)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setSyn(resp);
      });
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Synonym finder</h1>
      <div id="main">
        <form>
          <label htmlFor="word">Type in a word:</label> <br />
          <InputText
            onChange={(e) => setWord(e.target.value)}
            placeholder="e. g. Awesome"
          />
          <Button
            onClick={(e) => find(e)}
            icon="pi pi-search"
            className="p-button-rounded p-button-success p-button-text"
            aria-label="Search"
          />
        </form>
      </div>
      {syn.map((it) => (
        <p
          id="list"
          style={{ textAlign: 'center', color: 'white' }}
          key={it.id}
        >
          <i className="pi pi-circle" style={{ fontSize: '0.25em' }}></i>{' '}
          {it.word}
        </p>
      ))}
      {syn.length < 1 && (
        <p style={{ textAlign: 'center', color: 'white' }}>No results</p>
      )}
    </div>
  );
}
