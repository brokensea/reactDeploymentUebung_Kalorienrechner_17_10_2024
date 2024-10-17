import React, { useState } from 'react';
import './App.css'


const App = () => {
  const [koerpergroesse, setKoerpergroesse] = useState('');
  const [alter, setAlter] = useState('');
  const [gewicht, setGewicht] = useState('');
  const [geschlecht, setGeschlecht] = useState('w');
  const [tatigkeit, setTatigkeit] = useState('0.95');
  const [result, setResult] = useState({ grundumsatz: 0, gesamtumsatz: 0 });

  const rechnenKal = () => {
    const numKoerpergroesse = Number(koerpergroesse);
    const numAlter = Number(alter);
    const numGewicht = Number(gewicht);
    const numTatigkeit = Number(tatigkeit);
    let kalorienGrundumsatz = 0;

    if (geschlecht === 'w') {
      kalorienGrundumsatz = 655.1 + 9.6 * numGewicht + 1.8 * numKoerpergroesse - 4.7 * numAlter;
    } else if (geschlecht === 'm') {
      kalorienGrundumsatz = 66.47 + 13.7 * numGewicht + 5 * numKoerpergroesse - 6.8 * numAlter;
    }

    const gesamtumsatz = kalorienGrundumsatz * numTatigkeit;
    setResult({
      grundumsatz: roundToTwoDecimalPlaces(kalorienGrundumsatz),
      gesamtumsatz: roundToTwoDecimalPlaces(gesamtumsatz),
    });
  };

  const clearAll = () => {
    setKoerpergroesse('');
    setAlter('');
    setGewicht('');
    setResult({ grundumsatz: 0, gesamtumsatz: 0 });
  };

  const roundToTwoDecimalPlaces = (num) => Math.round(num * 100) / 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="kalorienRechnerBox bg-blue-50 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Kalorienrechner</h2>
        <form className="space-y-4">
          <div className="form-group">
            <label htmlFor="koerpergroesse" className="block mb-1 text-blue-600">Körpergröße (cm)</label>
            <input
              type="number"
              id="koerpergroesse"
              value={koerpergroesse}
              onChange={(e) => setKoerpergroesse(e.target.value)}
              className="w-full p-2 border border-blue-500 rounded"
              placeholder="cm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="alter" className="block mb-1 text-blue-600">Alter (Jahren)</label>
            <input
              type="number"
              id="alter"
              value={alter}
              onChange={(e) => setAlter(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded"
              placeholder="Jahren"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gewicht" className="block mb-1 text-blue-600">Gewicht (kg)</label>
            <input
              type="number"
              id="gewicht"
              value={gewicht}
              onChange={(e) => setGewicht(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded"
              placeholder="kg"
            />
          </div>
          <div className="form-group">
            <label className="block mb-1 text-blue-600">Geschlecht</label>
            <div className="flex space-x-4">
              <label className="text-blue-600">
                <input
                  type="radio"
                  name="kalorGeschlecht"
                  value="w"
                  checked={geschlecht === 'w'}
                  onChange={() => setGeschlecht('w')}
                /> Weiblich
              </label>
              <label className="text-blue-600">
                <input
                  type="radio"
                  name="kalorGeschlecht"
                  value="m"
                  checked={geschlecht === 'm'}
                  onChange={() => setGeschlecht('m')}
                /> Männlich
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tatigkeit" className="block mb-1 text-blue-600">Tätigkeit</label>
            <select
              id="tatigkeit"
              value={tatigkeit}
              onChange={(e) => setTatigkeit(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded"
            >
              <option value="0.95">Schlafen</option>
              <option value="1.2">Nur Sitzen oder Liegen</option>
              <option value="1.5">Ausschließlich sitzende Tätigkeit</option>
              <option value="1.7">Sitzende Tätigkeit mit zeitweiligem Gehen/Stehen</option>
              <option value="1.9">Überwiegend gehende oder stehende Tätigkeit</option>
              <option value="2.2">Körperlich anstrengende berufliche Arbeit</option>
            </select>
          </div>
          <button
            type="button"
            onClick={rechnenKal}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Berechnen
          </button>
        </form>

        <div className="outPutBox bg-blue-100 text-blue-600 p-4 mt-4 rounded">
          <table className="w-full">
            <thead>
              <tr>
                <th></th>
                <th>kcal</th>
                <th>kJ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Grundumsatz:</td>
                <td>{result.grundumsatz}</td>
                <td>{(result.grundumsatz * 4.184).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Gesamtumsatz:</td>
                <td>{result.gesamtumsatz}</td>
                <td>{(result.gesamtumsatz * 4.184).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
        >
          Alle löschen
        </button>
      </div>
    </div>
  );
};

export default App;