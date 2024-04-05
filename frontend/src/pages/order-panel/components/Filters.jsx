import "./Filters.css";
import Button from "./Button";
import FilteredProducts from "./FilteredProducts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Filters() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const checkActiveFilter = () => {
    console.log(activeFilter);
    let style = "";
    {
      activeFilter
        ? (style = { outline: "1px solid rgba(0,0,0,.6)" })
        : (style = {});
    }
    return style;
  };

  return (
    <>
      <div className="categories-page-container">
        <div className="container">
          <div className="filters-header">
            <div className="filters-box">
              <div className="filters-box-title">
                {activeFilter === null ? "All" : activeFilter}
              </div>
            </div>
          </div>
          <div className="filters-links">
            <Button
              buttonContent="All"
              clickEffect={() => {
                setActiveFilter("all");
              }}
              style={
                activeFilter === "all" || activeFilter === null
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Pizzas"
              clickEffect={() => {
                setActiveFilter("Pizzas");
              }}
              style={
                activeFilter === "Pizzas"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Ramens"
              clickEffect={() => {
                setActiveFilter("Ramens");
              }}
              style={
                activeFilter === "Ramens"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Burgers"
              clickEffect={() => {
                setActiveFilter("Burgers");
              }}
              style={
                activeFilter === "Burgers"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Wraps"
              clickEffect={() => {
                setActiveFilter("Wraps");
              }}
              style={
                activeFilter === "Wraps"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Salads"
              clickEffect={() => {
                setActiveFilter("Salads");
              }}
              style={
                activeFilter === "Salads"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Pastas"
              clickEffect={() => {
                setActiveFilter("Pastas");
              }}
              style={
                activeFilter === "Pastas"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Desserts"
              clickEffect={() => {
                setActiveFilter("Desserts");
              }}
              style={
                activeFilter === "Desserts"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            {/* <Button
              buttonContent="Hot drinks"
              clickEffect={() => {
                setActiveFilter("cafe");
              }}
              style={
                activeFilter === "cafe"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            />
            <Button
              buttonContent="Cold drinks"
              clickEffect={() => {
                setActiveFilter("drinks");
              }}
              style={
                activeFilter === "drinks"
                  ? { outline: "1px solid rgba(0,0,0,.6)" }
                  : {}
              }
            /> */}
          </div>
        </div>
        <div className="categories-products-box">
          <div className="container">
            <div className="categories-products-grid">
              {activeFilter === null ? (
                <FilteredProducts filter={"all"} />
              ) : (
                <FilteredProducts filter={activeFilter} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Filters;
