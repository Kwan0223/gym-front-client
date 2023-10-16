import React, { useContext, useEffect, useState } from 'react';
import Card from "../page/card";
import '../css/Content.css';
import { useLocation } from 'react-router-dom';
import SearchBar from "../page/SearchBar";
import axios from "axios";
import Pagination from "./Pagination";

const Content = () => {
    const location = useLocation();

    const [searchItem, setSearchItem] = useState({
        area: '',
        name: ''
    });
    const [points, setPoints] = useState({ content: [] });
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadPoints(currentPage);
    }, [currentPage]);

    const loadPoints = (page) => {
        axios.get(`http://localhost:8080/api/v1/point?page=${page - 1}&size=5`)
            .then(response => {
                setPoints(response.data);
                setTotalPages(response.data.totalPages);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (searchInput) => {
        setSearchItem(searchInput);
        axios.get(`http://localhost:8080/api/v1/point/search`, {
            params: {
                pointName: searchInput.name,
                page: 0,
                size: 5
            }
        })
            .then(response => {
                setPoints(response.data);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="main-container">
            <SearchBar onSearch={handleSearch} />
            <div className="card-container">
                {points.content ? (
                    points.content.map((data, index) =>  <Card key={index} data={data} type="content" />)
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Pagination totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );

};

export default Content;
