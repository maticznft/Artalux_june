import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { usePrevious } from "./my-items";
import { v1_Ranks } from "actions/v1/user";
import config from "lib/config";
const dashboardRoutes = [];
const useStyles = makeStyles(styles);
// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
export default function Terms(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const Wallet_Details = useSelector((state) => state.wallet_connect_context);

  const [Ranking, setRanking] = useState("");
  const [CatName, setCatName] = useState("All");
  const [Time, setTime] = useState(7);
  const [LoadMore, setLoadMore] = useState(true);
  const [Page, setPage] = useState(1);
  const prevPage = usePrevious(Page);
  const [ShowModal, setShowModal] = useState(false);

  useEffect(() => {
    if (Page === 1)
      setShowModal(true)
    GetRankings();
  }, [Page, Time, CatName]);

  const GetRankings = async () => {
    var Arg = {
      Page: prevPage === Page ? 1 : Page,
      limit: 100,
      Cat: CatName,
      Time: Time,
    };
    //("arg data for get rankimgs ",Arg);
    var Resp = await v1_Ranks(Arg);
    //("resp for get ramks in ranking page ",Resp);
    if (Resp.Success) {
     
      //("Resp.Ranks ",Resp);
      if (Resp.Ranks.length > 0) {
        setRanking(Resp.Ranks);
        setLoadMore(true);
      } else {
        if(prevPage === Page)
          setRanking(Resp.Ranks);
        setLoadMore(false);
      }
      setTimeout(() => {
        setShowModal(false)
      }, 1500);
    } else toast.error("Error in Rank Fetch", { autoClose: 1500 });
  };

  return (
    <div className="inner_header">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={<Link to="/">
          <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid" /></Link>}
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 50,
          color: "dark"
        }}
        {...rest}
      />
      <ScrollToTopOnMount />
      <div className={classes.pageHeader + " inner_pageheader"}>
        <div className={classes.container + " nft_rankings"}>
          <h2>Top NFTs</h2>
          <p>The top NFTs on Artalux, ranked by volume, floor price and other statistics.</p>
          <div className="nft">
            <div className="d-flex align-items-center justify-content-center drop m-auto">
              <div className="last mr-0 mr-md-2">
                <div class="form-group">
                  <div class="dropdown days">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    last {Time === 1 ? "24 hours" : `${Time} days`}{" "}
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" onClick={() => setTime(1)}>Last 24 Hours</a>
                      <a class="dropdown-item" onClick={() => setTime(7)}>Last 7 Days</a>
                      <a class="dropdown-item" onClick={() => setTime(30)}>Last 30 Days </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="last mr-0 mr-md-2">
                <div class="form-group">
                  <div class="dropdown category">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    {CatName} Categories{" "}
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" onClick={() => setCatName("All")}>All</a>
                      <a class="dropdown-item" onClick={() => setCatName("Art")}>Art</a>
                      <a class="dropdown-item" onClick={() => setCatName("Collectibles")}>Collectibles</a>
                      <a class="dropdown-item" onClick={() => setCatName("Music")}>Music</a>
                      <a class="dropdown-item" onClick={() => setCatName("Photo")}>Photo</a>
                      <a class="dropdown-item" onClick={() => setCatName("Sports")}>Sports</a>
                      <a class="dropdown-item" onClick={() => setCatName("Games")}>Games</a>
                      <a class="dropdown-item" onClick={() => setCatName("Video")}>Video</a>
                      <a class="dropdown-item" onClick={() => setCatName("Jewellery")}>Jewellery</a>
                      <a class="dropdown-item" onClick={() => setCatName("Virtual Worlds")}>Virtual Worlds</a>
                      <a class="dropdown-item" onClick={() => setCatName("VIP")}>VIP</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="last ml-auto">
                <div class="form-group">
                  <div class="dropdown category">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    All Time
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" onClick={() => setCatName("All")}>Time</a>
                      <a class="dropdown-item" onClick={() => setCatName("Art")}>Time</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table mt-5">
              <table className="m-auto w-100">
                <tr>
                  <th>Creator</th>
                  <th>Volume</th>
                  <th>24h%</th>
                  <th>7d%</th>
                  <th>Floor Price</th>
                  <th>Owners</th>
                  <th>Items</th>
                </tr>
        
                {Ranking &&
                    Ranking.length > 0 &&
                    Ranking.map((Rank, i) => {
                      return (
                 <tr>
                   <Link to={`/my-items/${Rank._id}`}>
                    <td> {Rank.Creator.name
                    ? Rank.Creator.name
                    : Rank._id.slice(0, 15).concat("...")}</td></Link>

                    <td> {Rank.Volume.toFixed(4)} USD</td>

                    {Rank.Day1 ? 
                    ( Rank.Day1 === 0 || Rank.Day1 < 0 ?
                    (<td>  {Rank.Day1}%</td>)
                    :(<td>{Rank.Day1}%</td>)):(<td>---</td>)}

                    {Rank.Day7 ? 
                    ( Rank.Day7 === 0 || Rank.Day7 < 0 ?
                    (<td>  {Rank.Day7}%</td>)
                    :(<td>{Rank.Day7}%</td>)):(<td>---</td>)}
                  
                    <td>{Rank.Floor.toFixed(2)} USD</td>
                    <td>{Rank.Owners}</td>
                    <td>{Rank.Item}</td>
                  </tr> 
                );
              })
        }
                
              
                
              </table>
              {LoadMore && (
              <div className="pb-5 text-center pt-4">
                <button
                  className="create_btn"
                  onClick={() => setPage(Page + 1)}
                >
                  Load more
                </button>
              </div>
            )}
          
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <Modal
          isOpen={ShowModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-body text-center">
          <div className="item_prof_img2">
            <img src={require("../assets/images/logo_big_iocn.png")} alt="Profile" className="img-fluid items_profile"/>
          </div>
          </div>
        </Modal> */}
    </div>
  );
}
