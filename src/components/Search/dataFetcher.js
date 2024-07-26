// src\components\Search\dataFetcher.js
import data from "../../data/data.json";

export const fetchData = async () => {
  // Simulate async fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000); // Simulating delay
  });
};
