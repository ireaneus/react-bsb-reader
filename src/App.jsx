import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [verses, setVerse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVersesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://labs.bible.org/api/?passage=Genesis%201:1-2&type=json'

      );
      if (!response.ok) {
        throw new Error('Something went a little ka ka');
      }

      const data = await response.json();
      console.log(data);
      setVerse(data);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchVersesHandler();
  }, []);

  return (
    <div className="App">
      <h1>New American Standard Bible</h1>
      <ul className="read-the-docs">
      {verses.map((verse, i) => 

        <li key={i}><h3>{verse.bookname}</h3><p>{verse.chapter}:{verse.verse}</p><p>{verse.text}</p></li>)}
      </ul>

    </div>
  );
}

export default App;
