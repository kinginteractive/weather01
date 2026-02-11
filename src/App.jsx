import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");

  function handleSearch() {
    console.log("検索した都市:", city);
  }

  return (
    <div className="app">
      <h1>天気アプリ</h1>

      <div className="searchBox">
        <input
          type="text"
          placeholder="都市名を入力してください（例：Tokyo）"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>
          検索
        </button>
      </div>
    </div>
  );
}