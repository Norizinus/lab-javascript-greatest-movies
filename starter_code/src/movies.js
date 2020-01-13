/* eslint no-restricted-globals: 'off' */

// Iteration 1: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(itemsToSort) {
  let sortedItems = [...itemsToSort];

  sortedItems.sort(function(a, b) {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
  return sortedItems;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct

function howManyMovies(movies) {
  let movieCount = movies.reduce(function(accumulator, movie) {
    if (
      movie.director === "Steven Spielberg" &&
      movie.genre.includes("Drama")
    ) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
  return movieCount;
}

// Iteration 3: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(moviesToOrder) {
  orderedMovies = [];
  for (movie of moviesToOrder) {
    orderedMovies.push(movie.title);
  }
  orderedMovies.sort(function(a, b) {
    return a.localeCompare(b);
  });
  if (moviesToOrder.length >= 20) {
    let firstTwentyMovies = orderedMovies.slice(0, 20);
    return firstTwentyMovies;
  }
  return orderedMovies;
}

// Iteration 4: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  if (movies.length === 0) {
    return 0;
  }
  //   let movieCount = 0;
  let averageRating =
    movies.reduce(function(accumulator, movie) {
      if (movie.rate === undefined) {
        return accumulator;
      }
      // movieCount ++;
      return accumulator + movie.rate;
    }, 0) / movies.length; // this doesn't make sense... because if a movie doesn't have a rating it shouldn't affect the average rating. so the average should ignore those movies alltogether and movies.length should be reduced. But Jasmine wasn't happy with that ¯\_(ツ)_/¯
  return parseFloat(averageRating.toFixed(2));
}

// Iteration 5: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies) {
  console.log(movies);
  let dramaMovies = movies.filter(function(movie) {
    // console.log(movie.genre);
    // console.log(movie.genre.includes("Drama"))
    return movie.genre.includes("Drama");
  });
  return ratesAverage(dramaMovies);
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
  //   let moviesInMinutes = [...movies];
  let moviesInMinutes = movies.map(function(movie) {
    return { ...movie };
  });
//   console.log(moviesInMinutes);
//   console.log(moviesInMinutes[0] === movies[0])
  //   console.log(moviesInMinutes.filter(el => el.duration));
  //   console.log(moviesInMinutes.map(el => el).length);

  let movieDurations = moviesInMinutes.map(function(movie) {
    let timeValues = movie.duration.split(" ");
    let movieDurationinMinutes = 0;
    for (value of timeValues) {
      if (value.includes("h")) {
        movieDurationinMinutes += parseInt(value.replace("h", "")) * 60;
      } else if (value.includes("min")) {
        movieDurationinMinutes += parseInt(value.replace("min", ""));
      }
    }
    return movieDurationinMinutes;
  });

  moviesInMinutes.forEach(function(movie, index) {
    movie.duration = movieDurations[index];
  });

  return moviesInMinutes;
}

// BONUS Iteration: Best yearly rate average - Best yearly rate average

function bestYearAvg(movies) {
  let movieYears = movies.map(function(movie, index) {
    return movie.year;
  });

  let individualMovieYears = movieYears.filter(function(year, index, years) {
    return years.indexOf(year) === index;
  });

  let moviesGroupedByYearWithAvg = [];
  for (year of individualMovieYears) {
    let moviesOfOneYear = movies.filter(function(movie) {
      if (movie.year === year) {
        return true;
      }
    });
    moviesGroupedByYearWithAvg.push({
      year: year,
      movies: moviesOfOneYear,
      averageRate: ratesAverage(moviesOfOneYear)
    });
  }

  moviesGroupedByYearWithAvg.sort(function(a, b) {
    if (a.averageRate === b.averageRate) {
      return a.year - b.year;
    }
    return b.averageRate - a.averageRate;
  });

  if (moviesGroupedByYearWithAvg.length === 0) {
    return null;
  }
  let answer = `The best year was ${moviesGroupedByYearWithAvg[0].year} with an average rate of ${moviesGroupedByYearWithAvg[0].averageRate}`;
  return answer;
}

bestYearAvg(movies);
