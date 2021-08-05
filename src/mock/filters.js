const taskToFilterMap = {
  watchList: (tasks) => tasks.filter((task) => task.isWatchlist).length,
  history: (tasks) => tasks.filter((task) => task.isHistory).length,
  favorites: (tasks) => tasks.filter((task) => task.isFavorite).length,
};

export const generateFilter = (tasks) => Object.entries(taskToFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(tasks),
  }),
);
