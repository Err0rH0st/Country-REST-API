const countryName = new URLSearchParams(window.location.search).get("name");
const flagImage = document.querySelector('.country-details img')
const countryTitle = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currency = document.querySelector('.currency')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const themeChanger = document.querySelector('.theme-changer')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg

    countryTitle.innerText = country.name.common

    if (country.name.nativeName){
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else{
      nativeName.innerText = country.name.common
    }

    population.innerText = country.population.toLocaleString("en-IN")

    region.innerText = country.region

    if(country.subregion){
    subRegion.innerText = country.subregion
    } else{
      subRegion.innerText = 'N/A'
    }

    if(country.capital){
      capital.innerText = country.capital
    }else{
      capital.innerText = 'N/A'
    }

    if(country.currencies){
      currency.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
    } else{
      currency.innerText = 'N/A'
    }

    topLevelDomain.innerText = country.tld.join(', ')

    if(country.languages){
      languages.innerText = Object.values(country.languages).join(', ')
    } else{
      languages.innerText = 'N/A'
    }

    if(country.borders){
      country.borders.forEach((border) =>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) =>{
          const borderCountryTag = document.createElement('a')
          borderCountryTag.innerText = borderCountry.name.common
          borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
          borderCountries.append(borderCountryTag)
        })
      })
    }
  });
  themeChanger.addEventListener('click', () =>{
    document.body.classList.toggle('dark')
  })
