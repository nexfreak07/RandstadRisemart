import React, { useState, useEffect } from "react";
import { API } from "./constants";
import Header from "./components/Header";
import styles from "./App.module.css";
import Card from "./components/Card";
import Lists from "./components/Lists";


function App() {
  const [albums, setAlbums] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seenTitles, setSeenTitles] = useState({});
  const [searchTerm, setSearchTerm] = useState("")

  const setSearchText = (searchText) => {
    setSearchTerm(searchText);
  }

  console.log(searchTerm)

 

  function handleSeen(title) {
    setSeenTitles(prevState => {     
      const newSeenTitles = { ...prevState };
      if (!newSeenTitles[title.userId]) {
        newSeenTitles[title.userId] = []; 
      }
      if (!newSeenTitles[title.userId].some(item => item.id === title.id)) { 
       newSeenTitles[title.userId] = [...newSeenTitles[title.userId], title]; 
      }
      return newSeenTitles;
    });
  }



  const [selectedData, setSelectedData] = useState(null)
  // const [showCards, setShowCards] = useState(true) //To Hide Cards on Click

  function handleSelectData(data){
    setSelectedData(data)
    // setShowCards(false)
  }

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(API);
        const dataList = await res.json();

        const groupedAlbums = {};
        dataList.forEach((data) => {
          const { userId } = data;
          if (!groupedAlbums[userId]) {
            groupedAlbums[userId] = [];
          }
          groupedAlbums[userId].push(data);
        });

        setAlbums(groupedAlbums);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return <h1>Loading Data....</h1>;
  }

  if (error) {
    return <h1>Something Went Wrong</h1>;
  }


  return (
    <div>
      <Header setSearchTerm={setSearchText} />
      <div className={styles.card}>
        {Object.keys(albums).map((key)=> {  
          let newCardData = []
          if(searchTerm){
            console.log(albums[key])
            newCardData = albums[key].filter((data)=> data.title.toLowerCase().includes(searchTerm.toLowerCase()))
            console.log(newCardData);
            // newCardData = albums[key].filter.toLowerCase().includes(searchTerm.toLowerCase());
            return <Card key={key} id={key} data={newCardData} onSelectCard={handleSelectData} seenTitles={seenTitles[key] ?? 0}/>

          }
          return <Card key={key} id={key} data={albums[key]} onSelectCard={handleSelectData} seenTitles={seenTitles[key] ?? 0}/>})}

      {selectedData && (
        <Lists titleList={selectedData} handleSeen={handleSeen} searchTerm={searchTerm}/>
      )}
      </div>
    </div>
  );
}

export default App;
