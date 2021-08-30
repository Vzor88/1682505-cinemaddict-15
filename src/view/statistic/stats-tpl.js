import {isNameRank} from '../../utils/statistic.js';
import {generateDuration} from '../../utils/card-film.js';

const isTopGenreFilm = (films) => {
  if(films.length === 0) {
    return ' ';
  } else {
    let topGenre = ' ';
    const watchedFilmGenres = {};
    films.forEach((film) => {
      for (const item of film.film.filmInfo.genre){
        item in watchedFilmGenres ? watchedFilmGenres[item]++ :  watchedFilmGenres[item] = 1;
      }
    });

    const topCountFilm = Object.values(watchedFilmGenres).sort((a, b) =>  b - a);
    Object.entries(watchedFilmGenres).forEach((item) => {
      if(item[1] === topCountFilm[0]){
        topGenre = item[0];
      }
    });
    return topGenre;
  }
};

export const createStatsTemplate = (films) => {
  const initialValue = 0;
  let totalDuration = films.reduce( (accumulator, currentValue) => accumulator + currentValue.film.filmInfo.runtime, initialValue);
  totalDuration = generateDuration(totalDuration, true);

  const watchedFilmCount = films.length;

  return `<section class="statistic">
     <p class="statistic__rank">
       Your rank
       <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       <span class="statistic__rank-label">${isNameRank(watchedFilmCount)}</span>
     </p>

     <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
       <p class="statistic__filters-description">Show stats:</p>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
       <label for="statistic-all-time" class="statistic__filters-label">All time</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
       <label for="statistic-today" class="statistic__filters-label">Today</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
       <label for="statistic-week" class="statistic__filters-label">Week</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
       <label for="statistic-month" class="statistic__filters-label">Month</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
       <label for="statistic-year" class="statistic__filters-label">Year</label>
     </form>

     <ul class="statistic__text-list">
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">You watched</h4>
         <p class="statistic__item-text">${watchedFilmCount} <span class="statistic__item-description">movies</span></p>
       </li>
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">Total duration</h4>
         <p class="statistic__item-text">${totalDuration.hours} <span class="statistic__item-description">h</span> ${totalDuration.minutes} <span class="statistic__item-description">m</span></p>
       </li>
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">Top genre</h4>
         <p class="statistic__item-text">${isTopGenreFilm(films)}</p>
       </li>
     </ul>

     <div class="statistic__chart-wrap">
  <canvas class="statistic__chart" width="1000"></canvas>
  </div>

  </section>`;
};

