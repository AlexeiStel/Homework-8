import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import './CategoryPage.css';

const CategoryPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxPages, setMaxPages] = useState(null);
  const [error, setError] = useState(null);
  const observer = useRef(null);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setItems([]);  
    setMaxPages(null);
    setPage(1);    
    setError(null);
  }, [type]);

  useEffect(() => {
    if (loading || (maxPages && page > maxPages)) return;
    setLoading(true);
    setError(null);
    axios
      .get(`https://rickandmortyapi.com/api/${type}?page=${page}`)
      .then((response) => {
        setItems((prevItems) => [...prevItems, ...response.data.results]); 
        setMaxPages(response.data.info.pages)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setError("Ошибка загрузки данных. Попробуйте позже.");
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting 
          && !loading 
          && !error 
          && (!maxPages || page < maxPages)
        ) {
          setPage((prev) => prev + 1); 
        }
      },
      { threshold: 1.0 }
    );

    const loadMoreElement = document.getElementById("load-more");
    if (loadMoreElement) {
      observer.current.observe(loadMoreElement);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect(); 
      }
    };
  }, [loading, error, maxPages, page]);

  if (!isAuthenticated) {
    return <div>Пожалуйста, войдите в систему для доступа к категориям.</div>;
  }

  return (
    <div className="category-container">
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={item.id+'-'+page+'-'+index}>
            <Link to={`/category/${type}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      {loading && <p>Загрузка...</p>}
      <div id="load-more" style={{ height: "20px" }}></div>
    </div>
  );
};

export default CategoryPage;
