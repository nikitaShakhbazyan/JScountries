const url = 'https://restcountries.com/v2/all';
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const container = document.querySelector('.container');
const countryDivs = []; 

const fetchFunction = function() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => ({
        name: country.name,
        flag: country.flags.png,
        neighbors: country.borders,
        neighborsFlag: country.flags,
        area: country.area,
        population: country.population,
      }));

      countries.forEach((country) => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add(
          'countryContainer',
          'text-light',
          'text-center',
          'bg-dark',
          'align-items-center',
          'row'
        );
        countryDiv.style.border = '2px solid gold';
        countryDivs.push(countryDiv);
        const img = document.createElement('img');
        img.classList.add('col', 'p-2');
        img.src = country.flag;

        const h2 = document.createElement('h2');
        h2.classList.add('col');
        h2.textContent = country.name;

        const h4 = document.createElement('h4');
        h4.classList.add('col-md-6');
        h4.textContent = `Country's area is ${country.area / 1000} thousand square km.`;

        const h5 = document.createElement('h5');
        h5.classList.add('col-md-4');
        h5.textContent = `The country's population is approximately ${country.population.toLocaleString()} people`;

        const p = document.createElement('p');
        p.classList.add('col', 'text-danger');
        p.style.display = 'block';
        p.style.fontSize = '22px';
        if (country.neighbors === undefined) {
          p.textContent = 'There are no neighboring countries';
        } else {
          p.textContent = `Neighbors: ${country.neighbors}`;
        }

        // const a = document.createElement('a');
        // a.classList.add('col-md-2', 'alert', 'alert-success', 'aTagForMore');
        // a.textContent = `Click here for more information`;
        // a.href = `country_details.html?country=${country.name}`;

        const containerForData = document.createElement('div');
        containerForData.classList.add('dataContainer');
        container.appendChild(countryDiv);
        countryDiv.appendChild(img);
        countryDiv.appendChild(h2);
        countryDiv.appendChild(h5);
        countryDiv.appendChild(h4);
        countryDiv.appendChild(p);
      });

      function searching() {
        const searchTerm = searchInput.value.toLowerCase();
      
        countryDivs.forEach((countryDiv) => {
          const h2 = countryDiv.querySelector('h2');
          const h2Text = h2.textContent.toLowerCase();
      
          if (h2Text.includes(searchTerm)) {
            countryDiv.style.display = 'block'; 
          } else {
            countryDiv.style.display = 'none';
          }
        }
    )}
      
      searchInput.addEventListener('input', searching);
      

      function ClearingResults() {
        const query = searchInput.value;
        if (query === '') {
          searchResults.innerHTML = '';
        }
      }
      searchInput.addEventListener('input', ClearingResults);

    });
};


fetchFunction();
