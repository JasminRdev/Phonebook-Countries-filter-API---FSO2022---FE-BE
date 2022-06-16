
import CountryDetails from "./CountryDetails"

const Country = ({ inputCountries, handleCountries, countries  }) => {
   
    const results = countries.filter(o => o.name.common.toLowerCase().includes(inputCountries.toLocaleLowerCase()));
 
        const eachResult = results.map(item => 
            <li key={item.name.common}>
        {item.name.common}
        </li>)

        const textOfResult = "Sorry to many matches. Please specify more."

      const showSingleResult = <CountryDetails results={results} />
     
    
const someCountries = results.length < 11 ? eachResult : textOfResult

const a = true

return(
<div>
<hr></hr>
<p>find countries</p>
<input type="text" value={inputCountries} onChange={handleCountries}></input>
<ul>

{a ? someCountries : ""}

{results.length === 1 ? showSingleResult : a}
</ul>
</div>
)
}
export default Country