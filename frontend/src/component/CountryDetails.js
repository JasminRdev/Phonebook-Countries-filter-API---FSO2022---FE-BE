const CountryDetails = ({results}) => {

    const country = results[0]
    console.log(country.languages)
    const valuesOnly = Object.values(country.languages);
const languages = valuesOnly.map(language =>  <li>{language}</li>)
    return (
        <div>

        <h1>{country.name.common}</h1>

        <p> capital {country.capital}</p>
        <p> area {country.area}</p>

        <h3> languages: </h3>
        <li>{languages}</li>
       <br></br>
        <img src={country.flags.png} />
        </div>

    )
}

export default CountryDetails