import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Search,
  TrendingUp,
  DollarSign,
  Star,
  Award,
  Play,
  Clock,
  Film,
  X,
  Users
} from "lucide-react";
import * as Plotly from 'plotly';

// Movie dataset with Rotten Tomatoes scores and additional metrics
const movieData = [
  { id: 1, title: "Oppenheimer", year: 2023, genre: "Biography", actors: ["Cillian Murphy", "Emily Blunt", "Matt Damon"], revenue: 952, popularity: 95, rating: 8.3, runtime: 180, networks: ["Netflix", "Prime Video"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", rtScore: 93, rtAudience: 91 },
  { id: 2, title: "Barbie", year: 2023, genre: "Comedy", actors: ["Margot Robbie", "Ryan Gosling", "Will Ferrell"], revenue: 1445, popularity: 98, rating: 7.1, runtime: 114, networks: ["Max", "Prime Video"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", rtScore: 88, rtAudience: 83 },
  { id: 3, title: "The Super Mario Bros. Movie", year: 2023, genre: "Animation", actors: ["Chris Pratt", "Anya Taylor-Joy", "Charlie Day"], revenue: 1362, popularity: 92, rating: 7.0, runtime: 92, networks: ["Peacock"], rentalPrice: 3.99, poster: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", rtScore: 59, rtAudience: 96 },
  { id: 4, title: "Guardians of the Galaxy Vol. 3", year: 2023, genre: "Action", actors: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"], revenue: 845, popularity: 89, rating: 7.9, runtime: 150, networks: ["Disney+"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", rtScore: 82, rtAudience: 94 },
  { id: 5, title: "Spider-Man: Across the Spider-Verse", year: 2023, genre: "Animation", actors: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"], revenue: 690, popularity: 94, rating: 8.7, runtime: 140, networks: ["Netflix"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", rtScore: 96, rtAudience: 95 },
  { id: 6, title: "The Little Mermaid", year: 2023, genre: "Fantasy", actors: ["Halle Bailey", "Jonah Hauer-King", "Melissa McCarthy"], revenue: 569, popularity: 85, rating: 7.2, runtime: 135, networks: ["Disney+"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", rtScore: 67, rtAudience: 94 },
  { id: 7, title: "Fast X", year: 2023, genre: "Action", actors: ["Vin Diesel", "Michelle Rodriguez", "Jason Momoa"], revenue: 704, popularity: 88, rating: 5.8, runtime: 141, networks: ["Peacock", "Prime Video"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", rtScore: 56, rtAudience: 82 },
  { id: 8, title: "Elemental", year: 2023, genre: "Animation", actors: ["Leah Lewis", "Mamoudou Athie"], revenue: 496, popularity: 81, rating: 7.0, runtime: 109, networks: ["Disney+"], rentalPrice: 3.99, poster: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)", rtScore: 74, rtAudience: 93 },
  { id: 9, title: "Mission: Impossible - Dead Reckoning", year: 2023, genre: "Action", actors: ["Tom Cruise", "Hayley Atwell", "Ving Rhames"], revenue: 567, popularity: 87, rating: 7.7, runtime: 163, networks: ["Paramount+"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", rtScore: 96, rtAudience: 94 },
  { id: 10, title: "Dune", year: 2021, genre: "Sci-Fi", actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"], revenue: 402, popularity: 91, rating: 8.0, runtime: 155, networks: ["Max", "Prime Video"], rentalPrice: 3.99, poster: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", rtScore: 83, rtAudience: 90 },
  { id: 11, title: "The Batman", year: 2022, genre: "Action", actors: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"], revenue: 771, popularity: 90, rating: 7.8, runtime: 176, networks: ["Max"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)", rtScore: 85, rtAudience: 87 },
  { id: 12, title: "Top Gun: Maverick", year: 2022, genre: "Action", actors: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"], revenue: 1489, popularity: 96, rating: 8.3, runtime: 131, networks: ["Paramount+"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)", rtScore: 96, rtAudience: 99 },
  { id: 13, title: "Avatar: The Way of Water", year: 2022, genre: "Sci-Fi", actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], revenue: 2320, popularity: 97, rating: 7.6, runtime: 192, networks: ["Disney+"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #D9AFD9 0%, #97D9E1 100%)", rtScore: 76, rtAudience: 92 },
  { id: 14, title: "Everything Everywhere All at Once", year: 2022, genre: "Sci-Fi", actors: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"], revenue: 143, popularity: 88, rating: 7.8, runtime: 139, networks: ["Paramount+", "Prime Video"], rentalPrice: 3.99, poster: "linear-gradient(135deg, #FEE140 0%, #FA709A 100%)", rtScore: 95, rtAudience: 88 },
  { id: 15, title: "The Whale", year: 2022, genre: "Drama", actors: ["Brendan Fraser", "Sadie Sink", "Hong Chau"], revenue: 57, popularity: 79, rating: 7.7, runtime: 117, networks: ["Max", "Prime Video"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)", rtScore: 65, rtAudience: 79 },
  { id: 16, title: "Black Panther: Wakanda Forever", year: 2022, genre: "Action", actors: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira"], revenue: 859, popularity: 89, rating: 6.7, runtime: 161, networks: ["Disney+"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)", rtScore: 84, rtAudience: 94 },
  { id: 17, title: "John Wick: Chapter 4", year: 2023, genre: "Action", actors: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"], revenue: 440, popularity: 90, rating: 7.7, runtime: 169, networks: ["Hulu"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)", rtScore: 94, rtAudience: 94 },
  { id: 18, title: "Killers of the Flower Moon", year: 2023, genre: "Drama", actors: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"], revenue: 156, popularity: 83, rating: 7.6, runtime: 206, networks: ["Apple TV+"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #FDCBF1 0%, #E6DEE9 100%)", rtScore: 93, rtAudience: 84 },
  { id: 19, title: "Wonka", year: 2023, genre: "Fantasy", actors: ["Timothée Chalamet", "Olivia Colman", "Hugh Grant"], revenue: 634, popularity: 86, rating: 7.1, runtime: 116, networks: ["Max"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #FFA07A 0%, #FFE5B4 100%)", rtScore: 91, rtAudience: 91 },
  { id: 20, title: "Indiana Jones and the Dial of Destiny", year: 2023, genre: "Action", actors: ["Harrison Ford", "Phoebe Waller-Bridge", "Mads Mikkelsen"], revenue: 384, popularity: 78, rating: 6.5, runtime: 154, networks: ["Disney+"], rentalPrice: 5.99, poster: "linear-gradient(135deg, #96DEDA 0%, #50C9C3 100%)", rtScore: 69, rtAudience: 88 },
  { id: 21, title: "Teenage Mutant Ninja Turtles: Mutant Mayhem", year: 2023, genre: "Animation", actors: ["Micah Abbey", "Shamon Brown Jr.", "Nicolas Cantu"], revenue: 180, popularity: 84, rating: 7.3, runtime: 99, networks: ["Paramount+"], rentalPrice: 4.99, poster: "linear-gradient(135deg, #30E8BF 0%, #FF8235 100%)", rtScore: 96, rtAudience: 96 },
];

export default function CineMetricsPro() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);

  const genres = useMemo(() => ["All", ...Array.from(new Set(movieData.map((m) => m.genre)))], []);
  const allNetworks = useMemo(() => ["All", ...Array.from(new Set(movieData.flatMap((m) => m.networks)))], []);

  const filteredMovies = useMemo(() => {
    const filtered = movieData
      .filter((movie) => {
        const term = searchTerm.trim().toLowerCase();
        const matchesSearch =
          term === "" ||
          movie.title.toLowerCase().includes(term) ||
          movie.actors.some((actor) => actor.toLowerCase().includes(term));
        const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
        const matchesNetwork = selectedNetwork === "All" || movie.networks.includes(selectedNetwork);
        const matchesRating = movie.rating >= minRating;
        const matchesPrice = movie.rentalPrice <= maxPrice;
        return matchesSearch && matchesGenre && matchesNetwork && matchesRating && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "popularity") return b.popularity - a.popularity;
        if (sortBy === "revenue") return b.revenue - a.revenue;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "rtScore") return b.rtScore - a.rtScore;
        return b.year - a.year;
      });
    return filtered;
  }, [searchTerm, selectedGenre, selectedNetwork, minRating, maxPrice, sortBy]);

  const totalRevenueB = useMemo(() => (filteredMovies.reduce((s, m) => s + m.revenue, 0) / 1000).toFixed(1), [filteredMovies]);
  const avgRt = useMemo(() => (filteredMovies.length ? (filteredMovies.reduce((s, m) => s + m.rtScore, 0) / filteredMovies.length).toFixed(0) : "-") , [filteredMovies]);
  const avgImdb = useMemo(() => (filteredMovies.length ? (filteredMovies.reduce((s, m) => s + m.rating, 0) / filteredMovies.length).toFixed(1) : "-") , [filteredMovies]);

  useEffect(() => {
    if (chartRef1.current) {
      const genreRevenue = {};
      movieData.forEach((m) => {
        genreRevenue[m.genre] = (genreRevenue[m.genre] || 0) + m.revenue;
      });
      Plotly.newPlot(
        chartRef1.current,
        [
          {
            x: Object.keys(genreRevenue),
            y: Object.values(genreRevenue),
            type: "bar",
            marker: {
              color: ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6"],
              line: { color: "#ffffff", width: 2 },
            },
            hovertemplate: "<b>%{x}</b><br>Revenue: $%{y}M<extra></extra>",
          },
        ],
        {
          title: { text: "Total Revenue by Genre (millions)", font: { size: 18, color: "#f3f4f6" } },
          paper_bgcolor: "rgba(31, 41, 55, 0.8)",
          plot_bgcolor: "rgba(31, 41, 55, 0.5)",
          font: { color: "#f3f4f6", size: 12 },
          xaxis: { color: "#9ca3af", gridcolor: "#374151" },
          yaxis: { color: "#9ca3af", gridcolor: "#374151" },
          margin: { t: 50, b: 50, l: 50, r: 20 },
        },
        { responsive: true, displayModeBar: false }
      );
    }

    if (chartRef2.current) {
      Plotly.newPlot(
        chartRef2.current,
        [
          {
            x: movieData.map((m) => m.rtScore),
            y: movieData.map((m) => m.rtAudience),
            mode: "markers",
            marker: {
              size: movieData.map((m) => Math.max(12, m.revenue / 25)),
              color: movieData.map((m) => m.revenue),
              colorscale: [
                [0, "#8b5cf6"],
                [0.5, "#ec4899"],
                [1, "#f59e0b"],
              ],
              showscale: true,
              colorbar: {
                title: "Revenue<br>(millions)",
                thickness: 15,
                len: 0.7,
                bgcolor: "rgba(31, 41, 55, 0.8)",
                bordercolor: "#6b7280",
                borderwidth: 1,
              },
              line: { color: "#ffffff", width: 1.5 },
            },
            text: movieData.map((m) => m.title),
            hovertemplate: "<b>%{text}</b><br>Critics: %{x}%<br>Audience: %{y}%<br>Revenue: $%{marker.color}M<extra></extra>",
          },
        ],
        {
          title: { text: "Rotten Tomatoes: Critics vs Audience", font: { size: 18, color: "#f3f4f6" } },
          xaxis: { title: "Critics Score (%)", color: "#9ca3af", gridcolor: "#374151", range: [50, 100] },
          yaxis: { title: "Audience Score (%)", color: "#9ca3af", gridcolor: "#374151", range: [75, 100] },
          paper_bgcolor: "rgba(31, 41, 55, 0.8)",
          plot_bgcolor: "rgba(31, 41, 55, 0.5)",
          font: { color: "#f3f4f6", size: 12 },
          margin: { t: 50, b: 50, l: 50, r: 50 },
        },
        { responsive: true, displayModeBar: false }
      );
    }

    if (chartRef3.current) {
      const yearRevenue = {};
      movieData.forEach((m) => {
        yearRevenue[m.year] = (yearRevenue[m.year] || 0) + m.revenue;
      });
      const sortedYears = Object.keys(yearRevenue).sort();
      Plotly.newPlot(
        chartRef3.current,
        [
          {
            x: sortedYears,
            y: sortedYears.map((y) => yearRevenue[y]),
            type: "scatter",
            mode: "lines+markers",
            fill: "tozeroy",
            fillcolor: "rgba(139, 92, 246, 0.2)",
            line: { color: "#8b5cf6", width: 4, shape: "spline" },
            marker: { size: 12, color: "#ec4899", line: { color: "#ffffff", width: 2 } },
            hovertemplate: "<b>%{x}</b><br>Total Revenue: $%{y}M<extra></extra>",
          },
        ],
        {
          title: { text: "Revenue Trend by Year", font: { size: 18, color: "#f3f4f6" } },
          xaxis: { title: "Year", color: "#9ca3af", gridcolor: "#374151" },
          yaxis: { title: "Total Revenue (millions)", color: "#9ca3af", gridcolor: "#374151" },
          paper_bgcolor: "rgba(31, 41, 55, 0.8)",
          plot_bgcolor: "rgba(31, 41, 55, 0.5)",
          font: { color: "#f3f4f6", size: 12 },
          margin: { t: 50, b: 50, l: 60, r: 20 },
        },
        { responsive: true, displayModeBar: false }
      );
    }

    if (chartRef4.current) {
      const sortedMovies = [...movieData].sort((a, b) => b.rtScore - a.rtScore).slice(0, 10);
      Plotly.newPlot(
        chartRef4.current,
        [
          {
            y: sortedMovies.map((m) => m.title),
            x: sortedMovies.map((m) => m.rtScore),
            type: "bar",
            orientation: "h",
            marker: {
              color: sortedMovies.map((m) => m.rtScore),
              colorscale: [
                [0, "#ef4444"],
                [0.6, "#f59e0b"],
                [1, "#10b981"],
              ],
              line: { color: "#ffffff", width: 1 },
            },
            text: sortedMovies.map((m) => `${m.rtScore}%`),
            textposition: "inside",
            hovertemplate: "<b>%{y}</b><br>RT Score: %{x}%<extra></extra>",
          },
        ],
        {
          title: { text: "Top 10 Movies - Rotten Tomatoes Critics Score", font: { size: 18, color: "#f3f4f6" } },
          xaxis: { title: "Critics Score (%)", color: "#9ca3af", gridcolor: "#374151", range: [0, 100] },
          yaxis: { color: "#9ca3af", automargin: true },
          paper_bgcolor: "rgba(31, 41, 55, 0.8)",
          plot_bgcolor: "rgba(31, 41, 55, 0.5)",
          font: { color: "#f3f4f6", size: 11 },
          margin: { t: 50, b: 50, l: 200, r: 20 },
        },
        { responsive: true, displayModeBar: false }
      );
    }

    return () => {
      [chartRef1, chartRef2, chartRef3, chartRef4].forEach((ref) => {
        if (ref.current) Plotly.purge(ref.current);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            🎬 CineMetrics Pro
          </h1>
          <p className="text-xl text-gray-300 font-light">Movie Analytics with Rotten Tomatoes Integration</p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 mb-6 shadow-2xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative group">
              <Search className="absolute left-3 top-3 text-purple-300 group-hover:text-pink-300 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by title or actor..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:bg-gray-800/70 outline-none transition-all border border-gray-700/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 bg-gray-800/50 backdrop-blur rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all border border-gray-700/50 cursor-pointer hover:bg-gray-800/70"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-gray-800/50 backdrop-blur rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all border border-gray-700/50 cursor-pointer hover:bg-gray-800/70"
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
            >
              {allNetworks.map((n) => (
                <option key={n} value={n}>
                  {n === "All" ? "All Networks" : n}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-gray-800/50 backdrop-blur rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all border border-gray-700/50 cursor-pointer hover:bg-gray-800/70"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">🔥 Sort by Popularity</option>
              <option value="revenue">💰 Sort by Revenue</option>
              <option value="rating">⭐ Sort by Rating</option>
              <option value="rtScore">🍅 Sort by RT Score</option>
              <option value="year">📅 Sort by Year</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
              <label className="block text-sm text-purple-300 mb-2 font-semibold">
                Minimum Rating: {minRating.toFixed(1)} ⭐
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
              <label className="block text-sm text-pink-300 mb-2 font-semibold">
                Max Rental Price: ${maxPrice.toFixed(2)} 💵
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 shadow-2xl hover:scale-105 transition-transform border border-purple-400/30">
            <TrendingUp className="mb-2 opacity-80" size={28} />
            <div className="text-3xl font-black">{filteredMovies.length}</div>
            <div className="text-sm text-purple-100 font-medium">Movies Found</div>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-5 shadow-2xl hover:scale-105 transition-transform border border-pink-400/30">
            <DollarSign className="mb-2 opacity-80" size={28} />
            <div className="text-3xl font-black">${totalRevenueB}B</div>
            <div className="text-sm text-pink-100 font-medium">Total Revenue</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 shadow-2xl hover:scale-105 transition-transform border border-green-400/30">
            <Award className="mb-2 opacity-80" size={28} />
            <div className="text-3xl font-black">{avgRt}%</div>
            <div className="text-sm text-green-100 font-medium">Avg RT Score</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 shadow-2xl hover:scale-105 transition-transform border border-blue-400/30">
            <Star className="mb-2 opacity-80" size={28} />
            <div className="text-3xl font-black">{avgImdb}</div>
            <div className="text-sm text-blue-100 font-medium">Avg IMDb Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-2xl border border-white/20 hover:shadow-purple-500/20 transition-shadow">
            <div ref={chartRef1} />
          </div>
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-2xl border border-white/20 hover:shadow-pink-500/20 transition-shadow">
            <div ref={chartRef2} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-2xl border border-white/20 hover:shadow-purple-500/20 transition-shadow">
            <div ref={chartRef3} />
          </div>
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-2xl border border-white/20 hover:shadow-green-500/20 transition-shadow">
            <div ref={chartRef4} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border border-white/20"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="h-48 w-full relative overflow-hidden" style={{ background: movie.poster }}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                  {movie.year}
                </div>
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1 bg-yellow-500/90 backdrop-blur px-2 py-1 rounded-full">
                    <Star size={14} className="text-black" fill="currentColor" />
                    <span className="text-black text-xs font-bold">{movie.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-green-400/90 backdrop-blur px-2 py-1 rounded-full">
                    <span className="text-black text-xs font-extrabold">🍅 {movie.rtScore}%</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-extrabold mb-1 line-clamp-1">{movie.title}</h3>
                <div className="text-xs text-gray-300 mb-3 flex items-center gap-2">
                  <Film size={14} />
                  <span>{movie.genre}</span>
                  <span className="opacity-50">•</span>
                  <Clock size={14} />
                  <span>{movie.runtime}m</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.networks.map((n) => (
                    <span key={n} className="text-xs bg-white/10 border border-white/20 px-2 py-1 rounded-full">
                      {n}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-200">
                    Revenue: <span className="font-bold">${movie.revenue}M</span>
                  </div>
                  <div className="text-sm font-bold bg-black/40 px-2 py-1 rounded-md">${movie.rentalPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedMovie(null)}>
            <div className="bg-gray-900 w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="h-40 relative" style={{ background: selectedMovie.poster }}>
                <button 
                  onClick={() => setSelectedMovie(null)} 
                  className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors bg-black/50 rounded-full p-2 backdrop-blur"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-black mb-2">{selectedMovie.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-4">
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">{selectedMovie.genre}</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">{selectedMovie.year}</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">⭐ {selectedMovie.rating.toFixed(1)}</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">🍅 {selectedMovie.rtScore}% Critics</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20">👥 {selectedMovie.rtAudience}% Audience</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/20"><Clock className="inline mr-1" size={14}/> {selectedMovie.runtime}m</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-purple-300 mb-2 flex items-center">
                    <Users size={16} className="mr-2" />
                    <span className="font-semibold">Cast</span>
                  </p>
                  <p className="text-gray-200">{selectedMovie.actors.join(", ")}</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-purple-300 mb-2 flex items-center">
                    <Film size={16} className="mr-2" />
                    <span className="font-semibold">Available on</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.networks.map((n) => (
                      <span key={n} className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl font-bold text-white shadow-lg">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500/50 rounded-xl p-4">
                  <div>
                    <p className="text-gray-200 text-sm">Box Office Revenue</p>
                    <p className="font-black text-2xl text-white">${selectedMovie.revenue}M</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-200 text-sm">Rental Price</p>
                    <p className="font-black text-2xl text-green-400">${selectedMovie.rentalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}