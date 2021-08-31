import {isNameRank} from '../../utils/statistic.js';
import {generateDuration} from '../../utils/card-film.js';
import {COUNTS} from '../../consts.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getWatchedFilmList} from '../../utils/statistic.js';
import dayjs from "dayjs";

export const createChartTemplate = (films, dayTo = dayjs(), dayFrom = dayjs().subtract(200, 'year')) => {
  const statsCtx = document.querySelector('.statistic__chart');

  return new Chart(statsCtx,  {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: getWatchedFilmList(films).genreList,
      datasets: [{
        data: getWatchedFilmList(films).countList,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


export const createStatsTemplate = (films) => {
  const initialValue = 0;
  let totalDuration = films.reduce( (accumulator, currentValue) => accumulator + currentValue.film.filmInfo.runtime, initialValue);
  totalDuration = generateDuration(totalDuration, true);
  const statsCtxHeight = COUNTS.BAR_HEIGHT * getWatchedFilmList(films).genreList.length;

  const watchedFilmCount = films.length;

  return `<section class="statistic">
     <p class="statistic__rank">
       Your rank
       <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       <span class="statistic__rank-label">${isNameRank(watchedFilmCount)}</span>
     </p>

     <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
       <p class="statistic__filters-description">Show stats:</p>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked="true">
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
         <p class="statistic__item-text">${getWatchedFilmList(films).genreList[0]}</p>
       </li>
     </ul>

     <div class="statistic__chart-wrap">
  <canvas class="statistic__chart" width="1000" height="${statsCtxHeight}">

  </canvas>
  </div>

  </section>`;
};

