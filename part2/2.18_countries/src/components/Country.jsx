const Country = ({countries}) => {
    const country = countries[0]
    const languages = Object.values(country['languages'])

    return (
        <div>
            <h1>{country['name']['common']}</h1>
            <p>capital {country['capital']}</p>
            <p>area {country['area']}</p>
            <p><strong>languages:</strong></p>
            <ul>
                {languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <div className='flag'>
                <img src={country['flags']['png']} />
            </div>
        </div>
    )
}

export default Country