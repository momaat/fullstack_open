import { useEffect } from "react";
import Country from "./Country";


const Countries = ({countries, handleClick}) => {

    // const onClick = (val) => {
    //    handleClick(val)
    // }
    return (
        <>
            {countries.length == 1 
            
            ?   <Country countries={countries}/>
            :   countries.map(country =>
                    <div key={country['name']['common']}>
                        <p>
                            {country['name']['common']}
                            {/* <button onClick={() => console.log('button pressed')}>show</button> */}
                        </p>
                    </div>
                )
            }    
            
            
        </>
    )
}

export default Countries