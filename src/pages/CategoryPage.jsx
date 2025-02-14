import React from 'react';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CategoryPage = ({ category }) => {
  const [items, setItems] = useState([]);
  const filePath = {
   "Heroes": "/data/characters.json",
    "Locations": "/data/location.json",
    "Episodes": "/data/episode.json"
  };

  useEffect(() => {
    fetch(filePath[category])
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error("Ошибка загрузки:", error));
  }, [category]);

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <NavLink to={`/${category.toLowerCase()}/${item.id}`}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;