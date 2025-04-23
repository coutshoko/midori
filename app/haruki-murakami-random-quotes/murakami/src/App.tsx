import { useState } from "react";
import quotesData from "./assets/hm.json";

type Quote = {
  quote: string;
};

const RandomQuotes = () => {
  const quotes = quotesData.map((item: Quote) => item.quote);
  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-between bg-green-200 min-h-screen text-center">
      <header className="pt-8">
        <h1 className="text-4xl font-bold text-gray-700">
          Haruki Murakami Random Quotes
        </h1>
      </header>
      <main className="p-8">
        <blockquote className="italic mb-4 text-lg text-gray-800">
          <p>{currentQuote}</p>
        </blockquote>
        <button
          onClick={getRandomQuote}
          className="bg-red-300 text-black py-2 px-4 rounded-lg cursor-pointer hover:bg-red-200 transition duration-200"
        >
          New Quote
        </button>
      </main>
      <footer className="pb-8">
        <a
          href="https://github.com/astarshoko/haruki-murakami-random-quotes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default RandomQuotes;