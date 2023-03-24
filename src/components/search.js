const Search = () =>{
    return (
        <>
        <div className="hp-search">
            <form action="">
                <input
                    className="hp-search-box"
                    type="text"
                    placeholder="Search for tweets"
                    name="search" />
                <button className="hp-search-button" type="submit">
                    <ion-icon name="search-outline" />
                </button>
            </form>
        </div>
        </>

    )
}
export default Search;