import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/${type}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      });
  }, [type, id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Карточка не найдена</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>{item.status}</p>
      <p>{item.species}</p>
    </div>
  );
};

export default DetailPage;