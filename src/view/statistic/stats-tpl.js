import {isNameRank} from '../../utils/statistic.js';
import {generateDuration, ucFirstName} from '../../utils/card-film.js';
import {RadioButtonType, SIZES} from '../../consts.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getWatchedFilmList, countWatchedFilmsInDateRange, isWatchedList} from '../../utils/statistic.js';

const generateRadioButton = (buttons, activeButton) => (
  `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${buttons}" value="${buttons}" ${buttons === activeButton ? 'checked' : ' '}>
  <label for="statistic-${buttons}" class="statistic__filters-label">${ucFirstName(buttons)}</label>`
);

const renderRadioButtonsTemplate = (radioButtons, activeRadioButton) => radioButtons.map((radioButtonValue) => generateRadioButton(radioButtonValue, activeRadioButton)).join('');

export const createChartTemplate = (films, dateFrom, dateTo, statsCtx) => (
  new Chart(statsCtx,  {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: getWatchedFilmList(countWatchedFilmsInDateRange(films, dateFrom, dateTo)).genresList,
      datasets: [{
        data: getWatchedFilmList(countWatchedFilmsInDateRange(films, dateFrom, dateTo)).countsList,
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
  })
);

export const createStatsTemplate = (films, dateFrom, dateTo, activeRadioButton) => {
  const initialValue = 0;
  let totalDuration = countWatchedFilmsInDateRange(films, dateTo, dateFrom).reduce( (accumulator, currentValue) => accumulator + currentValue.filmInfo.runtime, initialValue);
  totalDuration = generateDuration(totalDuration, true);
  const statsCtxHeight = SIZES.BAR.HEIGHT * getWatchedFilmList(countWatchedFilmsInDateRange(films, dateFrom, dateTo)).genresList.length;

  const watchedFilmCount = countWatchedFilmsInDateRange(films, dateFrom, dateTo).length;

  const watchedListGenres = isWatchedList(getWatchedFilmList(countWatchedFilmsInDateRange(films, dateFrom, dateTo)).genresList);

  return `<section class="statistic">
     <p class="statistic__rank">
       Your rank
       <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       <span class="statistic__rank-label">${isNameRank(films.length)}</span>
     </p>

     <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
       <p class="statistic__filters-description">Show stats:</p>

       ${renderRadioButtonsTemplate(Object.values(RadioButtonType), activeRadioButton)}

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
         <p class="statistic__item-text">${watchedListGenres.length > 0 ? watchedListGenres[0] : ' '}</p>
       </li>
     </ul>

     <div class="statistic__chart-wrap">
  <canvas class="statistic__chart" width="1000" height="${statsCtxHeight}">

  </canvas>
  </div>

  </section>`;
};

