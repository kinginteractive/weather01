import { useState } from "react";

export default function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    const trimmed = city.trim();
    if (!trimmed) {
      setError("都市名を入力してください。");
      return;
    }
    if (!apiKey) {
      setError("APIキーが見つかりません。.env を確認してください。");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.set("q", trimmed);
      url.searchParams.set("appid", apiKey);
      url.searchParams.set("lang", "ja");
      url.searchParams.set("units", "metric"); // 섭씨

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "APIエラーが発生しました。");
      }

      setWeather(data);
    } catch (e) {
      setError(e.message || "不明なエラー");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>天気アプリ</h1>

      <div className="searchBox">
        <input
          type="text"
          placeholder="都市名を入力（例：Tokyo）"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "取得中…" : "検索"}
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>エラー：{error}</p>}

      {weather && (
        <div style={{ marginTop: 16 }}>
          <h2>
            {weather.name}（{weather.sys?.country}）
          </h2>
          <p>{weather.weather?.[0]?.description}</p>
          <p>気温：{Math.round(weather.main?.temp)}°C</p>
          <p>湿度：{weather.main?.humidity}%</p>
          <p>風速：{Math.round(weather.wind?.speed)} m/s</p>
        </div>
      )}
    </div>
  );
}