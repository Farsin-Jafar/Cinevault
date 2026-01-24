import { useState } from "react";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

function Filter({ onApply, onClose }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minVotes, setMinVotes] = useState(0);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply({
      genres: selectedGenres,
      minRating,
      minVotes,
      yearFrom,
      yearTo,
      sortBy,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3">
      <div className="bg-white w-full max-w-lg rounded-xl p-5 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Advanced Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Sort */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sort by</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity.desc">Popularity</option>
            <option value="vote_average.desc">Rating</option>
            <option value="release_date.desc">Release date</option>
            <option value="revenue.desc">Revenue</option>
          </select>
        </div>

        {/* Genres */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Genres</label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => toggleGenre(g.id)}
                className={`px-3 py-1 rounded-full border text-sm
                  ${
                    selectedGenres.includes(g.id)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Minimum Rating: {minRating}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Votes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Minimum Votes
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 500"
            className="w-full border rounded-lg px-3 py-2"
            value={minVotes}
            onChange={(e) => setMinVotes(Number(e.target.value))}
          />
        </div>

        {/* Year range */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">From Year</label>
            <input
              type="number"
              placeholder="eg:1999"
              className="w-full border rounded-lg px-3 py-2"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">To Year</label>
            <input
              type="number"
              placeholder="eg:2024"
              className="w-full border rounded-lg px-3 py-2"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
