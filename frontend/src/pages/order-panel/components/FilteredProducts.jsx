import "./FilteredProducts.css";
import { items } from "./Data";
import { useNavigate } from "react-router-dom";
import CustomizeOrder from "./CustomizeOrder";
import { useEffect, useState } from "react";
import OrderFinalisation from "./OrderFinalisation";
import axios from "axios";

function FilteredProducts({ filter }) {
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/data/", {}).then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <>
      {filter === "all"
        ? items
            .sort((a, b) => a.id - b.id)
            .map((product, index) => {
              return (
                <div
                  className={product.status === "Not available" ? "product-box-not-available" : "product-box" }
                  // className="product-box"
                  key={index}
                  onClick={() => {
                    setActive(product.id);
                    document
                      .querySelector(".customize-order-container")
                      .classList.add("active");

                    // document
                    //   .querySelector(".order-finalisation-container")
                    //   .classList.add("active");
                  }}
                >
                  <div
                    className="product-box-img"
                    // style={{ backgroundImage: `url(${product.img})` }}
                    style={{
                      backgroundImage: `url(http://localhost:8000/images/${product.img})`,
                    }}
                  ></div>
                  <div className="product-box-details">
                    {product.status === "Available" ? (
                      <>
                        <div className="product-box-title">
                          {product.description}
                        </div>
                        <div className="product-box-price">
                          {product.price} PLN
                        </div>
                      </>
                    ) : null}
                    {product.status === "Promotion" ? (
                      <>
                        <div className="product-box-promotion-title">
                          <div className="product-box-title">
                            {product.description}
                          </div>
                          <div className="product-box-promotion-info">
                            Promotion
                          </div>
                        </div>
                        <div className="product-box-promotion-prices">
                          <div className="product-box-promotion-default-price">
                            {product.defaultPrice} PLN
                          </div>
                          <div className="product-box-promotion-price">
                            {product.price} PLN
                          </div>
                        </div>
                      </>
                    ) : null}
                    {product.status === "Not available" ? (
                      <>
                        <div className="product-box-promotion-title">
                          <div className="product-box-title">
                            {product.description}
                          </div>
                          <div className="product-box-promotion-info">
                            Not available
                          </div>
                        </div>
                        <div className="product-box-price">
                          {product.price} PLN
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })
        : items
            .filter(({ category }) => category === filter)
            .sort((a, b) => a.id - b.id)
            .map((product, index) => {
              return (
                <div
                  className={product.status === "Not available" ? "product-box-not-available" : "product-box" }
                  // className="product-box"
                  key={index}
                  onClick={() => {
                    setActive(product.id);
                    document
                      .querySelector(".customize-order-container")
                      .classList.add("active");
                  }}
                >
                  <div
                    className="product-box-img"
                    // style={{ backgroundImage: `url(${product.img})` }}
                    style={{
                      backgroundImage: `url(http://localhost:8000/images/${product.img})`,
                    }}
                  ></div>
                  <div className="product-box-details">
                  {product.status === "Available" ? (
                      <>
                        <div className="product-box-title">
                          {product.description}
                        </div>
                        <div className="product-box-price">
                          {product.price} PLN
                        </div>
                      </>
                    ) : null}
                    {product.status === "Promotion" ? (
                      <>
                        <div className="product-box-promotion-title">
                          <div className="product-box-title">
                            {product.description}
                          </div>
                          <div className="product-box-promotion-info">
                            Promotion
                          </div>
                        </div>
                        <div className="product-box-promotion-prices">
                          <div className="product-box-promotion-default-price">
                            {product.defaultPrice} PLN
                          </div>
                          <div className="product-box-promotion-price">
                            {product.price} PLN
                          </div>
                        </div>
                      </>
                    ) : null}
                    {product.status === "Not available" ? (
                      <>
                        <div className="product-box-promotion-title">
                          <div className="product-box-title">
                            {product.description}
                          </div>
                          <div className="product-box-promotion-info">
                            Not available
                          </div>
                        </div>
                        <div className="product-box-price">
                          {product.price} PLN
                        </div>
                      </>
                    ) : null}
                    {/* <div className="product-box-title">
                      {product.description}
                    </div>
                    <div className="product-box-price">{product.price} PLN</div> */}
                  </div>
                </div>
              );
            })}
      <CustomizeOrder active={active} />
      {/* <OrderFinalisation active={active}/> */}
    </>
  );
}
export default FilteredProducts;
