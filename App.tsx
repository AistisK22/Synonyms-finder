import * as React from 'react';
import './style.css';

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
      <form>
        <label htmlFor="word">Your word:</label> <br />
        <input onChange={(e) => setWord(e.target.value)} placeholder="Word" />
        <br />
        <input onClick={(e) => find(e)} type="submit" value="Submit" />
      </form>
      <h3>
        <b>{word}</b> synonyms:
      </h3>
      <ul>
        {syn.map((it) => (
          <li>{it.word}</li>
        ))}
        {syn.length < 1 && <p>No results</p>}
      </ul>
    </div>
  );
}
