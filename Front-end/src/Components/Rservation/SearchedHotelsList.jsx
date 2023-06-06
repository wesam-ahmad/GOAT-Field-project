
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const SearchedHotelsList = () => {
  const [openList, setOpenList] = useState(false);
  const [sortBy, setSortBy] = useState("Fliter");
  const [pitches, setPitches] = useState([]);
  const [filteredPitches, setFilteredPitches] = useState([]);
  const [searchName, setSearchName] = useState(
    sessionStorage.getItem("stadiumName") || ""
  );
  const [priceRange, setPriceRange] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    sessionStorage.getItem("city") || ""
  );
  console.log(searchName);
  console.log(priceRange);
  console.log(selectedLocation);
  console.log(filteredPitches);

useEffect(() => {
  // Fetch the data from the server
  fetch("http://localhost:5151/getdatas")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const filteredData = data.filter((pitch) => pitch.deleted !== false);
        setPitches(filteredData);
        setFilteredPitches(filteredData);
      } else {
        console.error("Invalid data format:", data);
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });
  sessionStorage.clear();
}, []);

  //  const handleSortByAndOpenList = (e) => {
  //    const selectedSortBy = e.target.value;
  //    setSortBy(selectedSortBy);
  //    setOpenList(false);

  //    // Apply sorting logic based on the selected option
  //    const sortedPitches = [...filteredPitches];
  //    if (selectedSortBy === "Our top picks") {
  //         //add
  //    } else if (selectedSortBy === "Lowest price") {
  //      sortedPitches.sort((a, b) => a.price - b.price);
  //    } else if (selectedSortBy === "Highest price") {
  //      sortedPitches.sort((a, b) => b.price - a.price);
  //    }

  //    setFilteredPitches(sortedPitches);
  //  };

  useEffect(() => {
    filterPitches();
  }, [searchName, priceRange, selectedLocation]);

  const filterPitches = () => {
    let filtered = pitches;

    if (searchName) {
      filtered = filtered.filter((pitch) =>
        pitch.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-");
      filtered = filtered.filter(
        (pitch) => pitch.price >= parseInt(min) && pitch.price <= parseInt(max)
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (pitch) => pitch.location === selectedLocation
      );
    }

    setFilteredPitches(filtered);
  };

  // const handleSearch = () => {
  //   filterPitches();
  // };

  return (
    <>
      <div className="mb-20">
        <div className="flex items-center flex-wrap justify-center mt-8">
          <input
            type="text"
            name="place"
            placeholder="Search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-300">$200 - $300</option>
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            <option value="Amman">Amman</option>
            <option value="Zarqa">Zarqa</option>
            <option value="Irbid">Irbid</option>
            <option value="Aqaba">Aqaba</option>
            <option value="Jerash">Jerash</option>
            <option value="Madaba">Madaba</option>
          </select>
          {/* <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button> */}
        </div>
        <div className="ms-[16vw]">
          <h2>{filteredPitches.length} Properties Found</h2>
        </div>
        {/* <FilterContainer>
        <FilterButton onClick={() => setOpenList(!openList)}>
          Sort by: {sortBy}
          <IconContainer>
            <ExpandLessOutlined className="expand-icon" />
            <ExpandMoreOutlined className="expand-icon" />
          </IconContainer>
        </FilterButton>
        {openList === true && (
          <OptionsListContainer>
            <ul>
              <li>
                <option onClick={handleSortByAndOpenList}>Our top picks</option>
              </li>

              <li>
                <option onClick={handleSortByAndOpenList}>Lowest price</option>
              </li>

              <li>
                <option onClick={handleSortByAndOpenList}>Highest price</option>
              </li>
            </ul>
          </OptionsListContainer>
        )} 
      </FilterContainer> */}


        {filteredPitches.map((data) => (
          <section className="w-full " key={data.id}>
            <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 shadow-md">
              <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
                <div className=" flex flex-col justify-center ms-10 relative p-8 md:w-4/6">
                  <div className="flex flex-col md:flex-row">
                    <h2 className="mb-2 text-2xl font-black">{data.name}</h2>
                  </div>
                  <h3>City: {data.location}</h3>
                  <h3>Pitch Size: {data.size}</h3>
                  <p className="mt-3 font-bold">Description:</p>
                  <p className=" font-sans text-base tracking-normal">
                    {data.description}
                  </p>

                  <span className="font-bold mt-3">Per two hours :</span>
                  <div className="flex flex-col md:flex-row md:items-end">

                    <p className=" text-4xl font-black">
                      {data.price} JD
                    </p>
                    {/* <span className="ml-2 text-xs uppercase">258 Sales</span> */}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row">
                    <Link to={"/rservationdetails/" + data.id}>
                      <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">


                        See More
                      </button>
                    </Link>

                  </div>
                </div>
                <div className="mx-auto  md:w-2/3  w-full flex items-center px-2 pt-1 md:p-6">
                  <Link to={`/rservationdetails/${data.id}`}>

                    <img
                      className="block h-auto max-w-1/2 rounded-md shadow-lg"
                      src={`data:image/jpeg;base64,${data.images[0]}`}
                      alt="Shop image"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))

        }


      </div>
    </>
  );
};

export default SearchedHotelsList;
