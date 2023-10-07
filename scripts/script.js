const url = 'https://restcountries.com/v2/all';
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const container = document.querySelector('.container');
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const countries = data.map((country) => ({
      name: country.name,
      flag: country.flags.png,
      neighbors: country.borders,
      neighborsFlag :country.flags,
      area : country.area,
      population : country.population,
    }));

    countries.forEach((country) => {
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('text-light','text-center','bg-dark','align-items-center','row')
      countryDiv.style.border = '2px solid gold'
      const img = document.createElement('img','p-2');
      img.classList.add('col');
      img.src = country.flag;

      const h2 = document.createElement('h2');
      h2.classList.add('col');
      h2.textContent = country.name;

      const h4 = document.createElement('h4')
      h4.classList.add('col-md-6',)
      h4.textContent = `Country's area is ${country.area / 1000} thousand square km.`

      const h5 = document.createElement('h5')
      h5.classList.add('col-md-6')
      h5.textContent = `The country's population is approximately ${Math.round(country.population/1000000)} millions `
      

      const p = document.createElement('p')
      p.classList.add('col','text-danger')
      p.style.display = 'block'
      p.style.fontSize = '22px'
      p.innerHTML = `<bold>${country.neighbors}</bold>`

      if (country.neighbors === undefined) {
        p.textContent = 'There are no neighboring countries';
      } else {
        p.textContent = `Neighbors: ${country.neighbors}`;
      }

      container.appendChild(countryDiv);
      countryDiv.appendChild(img);
      countryDiv.appendChild(h2);
      countryDiv.appendChild(h5)
      countryDiv.appendChild(h4)
      countryDiv.appendChild(p)

    });

    const dataNamesForSearching = data.map((el) => {
        return el.flag
    });

    function searching () {
        const searchTerm = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

    const filteredItems = Array.from(dataNamesForSearching).filter(item => {
        const itemText = item.toLowerCase();
        return itemText.includes(searchTerm);
    })
    filteredItems.forEach(item => {
        const resultItem = document.createElement('li');
        resultItem.textContent = item;
        searchResults.appendChild(resultItem);
    });
    }
           searchInput.addEventListener('input', searching);
  });

