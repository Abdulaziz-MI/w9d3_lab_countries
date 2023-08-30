countriesContainer = document.querySelector("#countriesContainer");
let countries = [];

const fetchData = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        // check if the call has not successfully been made
        if (!response.ok) {  
            throw new Error("Failed to fetch data from the API");
        }
        // else when the link works
        countries = await response.json();
        countries.splice(96, 1);
        populateCountriesList(countries);
    } catch (error) { // if there is an error with collecting the json data - log it
        console.error("Error fetching data:", error);
    }
};

    // Maybe could've done it cleaner but this works 
    const populateCountriesList = (countriesData) => {
        countriesContainer.innerHTML = ''; // This clears previous content
    
        countriesData.forEach((country) => {
            const countryContainer = document.createElement("div");
            countryContainer.className = "countryContainer";
    
    
            const mainName = document.createElement('h3');
            flagEmoji = country.flag;
            mainName.textContent =  `${country.name.common} ${flagEmoji}`;
            mainName.classList = "heading" //used classes incase i want to style later
            countryContainer.appendChild(mainName)
        
            const population = document.createElement("p");
            population.textContent = `Population: ${country.population}`
            population.classList = "population"
            countryContainer.appendChild(population)
            
            const continent = document.createElement("p");
            continent.textContent = `Continent: ${country.continents}`
            continent.classList = "continent"
            countryContainer.appendChild(continent)

            const googleMap = document.createElement("a");
            googleMap.textContent = `Google Map`
            googleMap.href = country.maps.googleMaps
            googleMap.classList = "googleMap" 
            countryContainer.appendChild(googleMap)
            
            const capital = document.createElement("p");
            capital.textContent = `Capital: ${country.capital}`
            capital.classList = "capital"
            countryContainer.appendChild(capital)

            const imgFlag = document.createElement('img');
            imgFlag.src = country.flags.png;
            imgFlag.classList = "flagImg"
            countryContainer.appendChild(imgFlag)

            countriesContainer.appendChild(countryContainer);
        });
    };

    document.querySelector("#form").addEventListener("submit", (event) => {
        event.preventDefault();        
        const input = document.querySelector("input");
        
        // when the form is submitted the input value is collected, trimmed and lowercased
        const inputValue = input.value.trim().toLowerCase();


    // Then filtering the countries that includes the user input
        const filteredCountries = countries.filter((country) =>
            country.name.common.toLowerCase().includes(inputValue)
        );
    // display the filtered countries
        populateCountriesList(filteredCountries);
    });
    
    const setUp = async () => {
        await fetchData();
    };
    
    setUp();








