import React, { useEffect } from "react";
import Search from "../../components/Searching/Search";

function Home() {
  useEffect(() => {
    document.title = "Garuda";
  }, []);

  return (
    <div>
      {/* <SearchComponent /> */}
      <Search />
    </div>
  );
}

export default Home;
