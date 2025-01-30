"use client";
import MobileNav from "../MobileNav";
import React, { useState } from "react";
import SelectModal from "../selectModal";
import { useAccount } from 'wagmi';

const Swap = () => {
  const [value, setValue] = useState(1);
  const [isLiquidity, setIsLiquidity] = useState(false);
  const [change, setChange] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();

  return (
    <>
      <MobileNav />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white w-full max-w-md mx-auto rounded-3xl shadow-2xl p-4 sm:p-6 hover:shadow-3xl transition-shadow duration-300">
          <div className="flex justify-around mb-4 sm:mb-6">
            {isLiquidity ? (
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={() => setIsLiquidity(false)}
                  className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200"
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
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <p className="text-lg font-semibold">Add Liquidity</p>
                <button className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <button
                  className={`text-base sm:text-lg font-semibold ${
                    value === 1 ? "text-white underline" : "text-blue-200"
                  } hover:text-white transition-colors duration-200`}
                  onClick={() => setValue(1)}
                >
                  Swap
                </button>
                <button
                  className={`text-base sm:text-lg font-semibold ${
                    value === 2 ? "text-white underline" : "text-blue-200"
                  } hover:text-white transition-colors duration-200`}
                  onClick={() => setValue(2)}
                >
                  Pool
                </button>
              </>
            )}
          </div>
          <div>
            {value === 1 || isLiquidity ? (
              <div>
                <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                  <div className="space-y-2 sm:space-y-4 w-full sm:w-1/2">
                    <fieldset className="flex flex-col">
                      <label htmlFor="" className="text-sm text-blue-100">
                        From
                      </label>
                      <input
                        type="number"
                        className="rounded-lg p-2 bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                        placeholder="0.0"
                      />
                    </fieldset>
                    <fieldset className="flex flex-col">
                      <label htmlFor="" className="text-sm text-blue-100">
                        To
                      </label>
                      <input
                        type="number"
                        className="rounded-lg p-2 bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                        placeholder="0.0"
                      />
                    </fieldset>
                  </div>
                  <div className="flex justify-center flex-col space-y-2 mt-4 sm:mt-0 sm:w-1/2 sm:pl-4">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="flex items-center justify-center bg-blue-700 p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 w-full"
                    >
                      <span className="text-sm">Select a token</span>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                      >
                        <path
                          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </button>
                    <div className="text-center">
                      <button
                        onClick={() => setChange((prev) => !prev)}
                        className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6V18M12 18L7 13M12 18L17 13"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className={`w-full bg-blue-700 rounded-lg p-2 sm:p-3 text-white font-semibold hover:bg-blue-800 transition-colors duration-200 ${
                      isConnected ? "cursor-default" : ""
                    }`}
                  >
                    {isConnected ? (
                      <span className="truncate">{address}</span>
                    ) : (
                      "Connect Wallet"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() => setIsLiquidity(true)}
                  className="text-center bg-blue-700 rounded-lg p-2 sm:p-3 text-white font-semibold hover:bg-blue-800 transition-colors duration-200"
                >
                  <button>Add Liquidity</button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-blue-100">Your Liquidity</p>
                  <button className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </button>
                </div>
                <p className="mt-4 text-center text-sm text-blue-200">
                  Connect to a wallet to view your liquidity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && <SelectModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default Swap;