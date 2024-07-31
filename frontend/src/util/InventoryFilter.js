export const orderByName = (movies, Asc) => {
  return movies
    .slice()
    .sort((a, b) =>
      Asc
        ? a.original_title.localeCompare(b.original_title)
        : b.original_title.localeCompare(a.original_title)
    );
};

export const orderByRating = (movies, Asc) => {
  return movies
    .slice()
    .sort((a, b) =>
      Asc ? a.vote_average - b.vote_average : b.vote_average - a.vote_average
    );
};

export const orderByPrice = (movies, Asc) => {
  return movies
    .slice()
    .sort((a, b) => (Asc ? a.price - b.price : b.price - a.price));
};

export const orderByRetailPrice = (movies, Asc) => {
  return movies
    .slice()
    .sort((a, b) =>
      Asc ? a.retailPrice - b.retailPrice : b.retailPrice - a.retailPrice
    );
};

export const orderByAvalibleAmount = (movies, Asc) => {
  return movies
    .slice()
    .sort((a, b) =>
      Asc
        ? a.avalibleAmount - b.avalibleAmount
        : b.avalibleAmount - a.avalibleAmount
    );
};

export const orderBySoldAmount = (movies, Asc) => {
  return movies
    .slice()
    .sort((a, b) =>
      Asc ? a.soldAmount - b.soldAmount : b.soldAmount - a.soldAmount
    );
};
