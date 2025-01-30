"use client";
import { useState } from "react";

const tokens = [
  {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: "0xB161EF31F105E8eBC35Bffb447D5B68e9A7F90c6",
    decimals: 18,
  },
  {
    name: "Nad Swap",
    symbol: "NAD",
    address: "0x93D67777d711aC167F02864a2c1aF9f7A40B24d3",
    decimals: 18,
  },

  { name: "Ethereum", symbol: "ETH", address: "0xeth", decimals: 18 },
  { name: "Tether", symbol: "USDT", address: "0xusdt", decimals: 18 },
  { name: "Binance Coin", symbol: "BNB", address: "0xbnb", decimals: 18 },
];

const SelectModal = ({ setIsOpen, onSelectToken }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
      <div className="bg-[#0E100F] text-[#FBFAF9] w-full max-w-md rounded-2xl shadow-lg border border-[#A0055D] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select a Token</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-[#A0055D] rounded-full hover:bg-[#A0055D]/80 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {/* فیلد جستجو */}
        <input
          type="text"
          placeholder="Enter contract address or search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-[#0E100F] text-[#FBFAF9] placeholder-[#FBFAF9]/50 border border-[#A0055D] focus:outline-none focus:ring-2 focus:ring-[#A0055D]"
        />
        {/* لیست توکن‌های فیلتر‌شده */}
        <div className="max-h-64 overflow-y-auto">
          {filteredTokens.map((token, index) => (
            <div
              key={index}
              onClick={() => {
                onSelectToken(token);
                setIsOpen(false);
              }}
              className="flex items-center p-2 hover:bg-[#A0055D]/20 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-[#A0055D] rounded-full flex items-center justify-center text-[#FBFAF9]">
                {token.symbol[0]}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold">{token.name}</p>
                <p className="text-xs text-[#FBFAF9]/70">{token.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
