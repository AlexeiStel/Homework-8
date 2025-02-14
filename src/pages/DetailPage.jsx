import React from 'react';
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const DetailPage = ({category}) => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
     const filePath = {
      "Heroes": "/data/characters.json",
      "Locations": "/data/location.json",
      "Episodes": "/data/episode.json"
    };

    useEffect(() => {
      fetch(filePath[category])
        .then(response => response.json())
        .then(data => {
          const foundItem = data.find(i => i.id === Number(id));
          setItem(foundItem);
        })
        .catch(error => console.error("Ошибка загрузки:", error));
    }, [id, category]);

    if (!item) return <h2>Загрузка...</h2>;
  
    return (
    <>   
      {category=== "Heroes" && <div className='card'>
            <h2>{item.name}</h2>
            <p>{item.status}</p>
            <p>{item.species}</p>
            <p>{item.type}</p>
            <p>{item.gender}</p>
            <img src={item.image} alt={item.name} />
            <p>{item.created}</p>
            <NavLink to="/"  style={ ({ isActive }) => isActive ? {color: "red"} : {color: "white"}} >
                Назад
            </NavLink>
        </div>}
        {category === "Episodes" && <div className='card'>
            <h2>{item.name}</h2>
            <p>{item.air_date}</p>
            <p>{item.episode}</p>
            <p>{item.created}</p>
            <NavLink to="/"  style={ ({ isActive }) => isActive ? {color: "red"} : {color: "white"}} 
            >
                Назад
            </NavLink>
        </div>}
       { category === "Locations" && <div className='card'>
            <h2>{item.name}</h2>
            <p>{item.type}</p>
            <p>{item.dimension}</p>
            <p>{item.created}</p>
            <NavLink 
                to="/"
				style={ ({ isActive }) => isActive ? {color: "red"} : {color: "white"}} 
            >
                Назад
            </NavLink>
        </div>
}
      </>
    );
  };
  
  export default DetailPage;