const elMoviesList = makeElement(".movies__list");
const elSelectGenres = makeElement(".movies__form__select");

function renderGenderSelect(films, element) {
  const result = ["All"];

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!result.includes(genre)) {
        result.push(genre);
      }
    });
  });
  element.innerHTML = null;
  result.forEach((genre) => {
    const newOption = createDOM("option");
    // newOption.value = genre.toLowerCase();
    newOption.textContent = genre;
    element.appendChild(newOption);
  });
}

function renderGenderList(genre, newGenreList) {
  const newLi = createDOM("li");
  newLi.textContent = genre;
  newGenreList.appendChild(newLi);
}

function renderMovies(filmsArr, element) {
  element.innerHTML = null;
  filmsArr.forEach((film) => {
    //   create elements
    const newLi = createDOM("li");
    const newImg = createDOM("img");
    const newHeading = createDOM("h3");
    const newParagraph = createDOM("p");
    const newTime = createDOM("time");
    const newGenreList = createDOM("ul");

    // adding classes and atributes
    newLi.setAttribute("class", "movies__item");
    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("alt", film.title);
    newImg.setAttribute("width", "150");
    newImg.setAttribute("height", "200");
    newImg.setAttribute("class", "movies__img");
    newHeading.setAttribute("class", "movies__heading");
    newParagraph.setAttribute("class", "movies__paragraph-description");
    newTime.setAttribute("datetime", normalizeDate(film.release_date));
    newTime.setAttribute("class", "movies__time");
    newGenreList.setAttribute("class", "movies__genres-list");

    // Assigning
    newHeading.textContent = film.title;
    newParagraph.textContent =
      film.overview.split(" ").slice(0, 20).join(" ") + " ...";
    newTime.textContent = normalizeDate(film.release_date);

    film.genres.forEach((genre) => {
      renderGenderList(genre, newGenreList);
    });
    newLi.appendChild(newImg);
    newLi.appendChild(newHeading);
    newLi.appendChild(newParagraph);
    newLi.appendChild(newTime);
    newLi.appendChild(newGenreList);

    element.appendChild(newLi);
  });
}
renderGenderSelect(films, elSelectGenres);
renderMovies(films, elMoviesList);

const elForm = makeElement(".movies__form");
const elGenresSelect = makeElement(".movies__form__select");
const elInputSearch = makeElement(".movies__form__input");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const selectGenres = elGenresSelect.value.trim();
  const inputSearch = elInputSearch.value.trim();
  const regex = new RegExp(inputSearch, "gi");
  const searchedFilms = films.filter((film) => film.title.match(regex));

  let foundFilms = [];

  const hasGenre = (film) => {
    return film.genres.includes(selectGenres);
  };

  if (selectGenres === "All") {
    foundFilms = searchedFilms;
  } else {
    foundFilms = searchedFilms.filter(hasGenre);
  }

  renderMovies(foundFilms, elMoviesList);
});
