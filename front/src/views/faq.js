import React, { useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styled from "../../node_modules/styled-components";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";

const Icon = styled(props => (
  <div {...props}>
    <div className="minus">-</div>
    <div className="plus">+</div>
  </div>
))`
  & > .plus {
    display: block;
    color: #a30726;
    font-size: 24px;
  }
  & > .minus {
    display: none;
    color: #a30726;
    font-size: 24px;
  }
  .Mui-expanded & > .minus {
    display: flex;
  }
  .Mui-expanded & > .plus {
    display: none;
  }
`;

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function Faq(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChangeFaq = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="inner_header">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={<Link to="/">
          <img src={require("../assets/images/logo.svg")} alt="logo" className="img-fluid"/></Link>}
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 50,
          color: "dark"
        }}
        {...rest}
      />
      <ScrollToTopOnMount/>
      <div className={classes.pageHeader + " inner_pageheader"}>
        <div className="bg_red_1">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className="d-flex align-items-center">
                <h2 className="inner_title">Frequently Asked Questions</h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        </div>
        <div className="container mt-3">
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <div className="faq_panel">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeFaq('panel1')} className="mt-5">
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className="accordian_head"><h2>1. What is an NFT?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>NFT is the abbreviation from Non-Fungible Tokens and are unique digital items such as artworks (picture, video, music), collectibles or even game items. The process of transforming a digital piece into an NFT is called minting, and the process happens with the help of a protocol, such as ERC-721 (a smart contract standard) that is hosted on Wenlambo’s own blockchain.</p>
                        <p>As an artist, after the tokenization of your artwork, you can get the uniqueness and brand it as your work. Once it is out there, the ownership is given by the smart contract, which is then blockchain-managed.</p>
                   </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeFaq('panel2')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <div className="accordian_head"><h2>2. What does “minting” mean?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>Minting an NFT is the process your digital art becomes a part of a blockchain – a public ledger that is unchangeable and tamper-proof. You can imagine the process metal coins go through when are minted and added into circulation, only NFT minting is digital</p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel3'} onChange={handleChangeFaq('panel3')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel3bh-content" id="panel3bh-header">
                    <div className="accordian_head"><h2>3. What is Gas?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>Gas fees are like transaction fees on the Wenlambo blockchain. When you make transactions, such as transfer crypto to another wallet or purchase a digital collectible on NFT Connected, you will need enough WENLAMBO in your wallet for the minting process gas fee or for the initial transaction on purchase and the associated gas fees.</p>
                        <p>Take into consideration that gas prices do fluctuate due to network congestion, it's important to check 
gas prices with websites like <a href="https://ethgasstation.info/" className="faq_a">WENLAMBO Gas Station</a> before confirming a transaction. One possible solution is to
try the transaction again later when prices are lower.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel4'} onChange={handleChangeFaq('panel4')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel4bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>4. Are the ‘gas’ fees included in the prices of the NFT on NFTConnected?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>No. The gas fee is given by the Wenlambo blockchain and NFTConnected does not have any connection 
with this fee and is not commissioned in any way by NFTConnected. You can get further information 
from WENLAMBO documentation <a href="https://ethereum.org/en/developers/docs/gas/" className="faq_a">center</a></p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel5'} onChange={handleChangeFaq('panel5')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel5bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>5. How do I get WENLAMBO?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>You can buy WENLAMBO from one of the exchanges in the market, ones that we have used in the past are 
<span className="faq_bold_text"> Coinbase</span>, <span className="faq_bold_text">Binance</span> and <span className="faq_bold_text">Crypto.com</span>, these platforms are used to buy and store your WENLAMBO. Once you got 
WENLAMBO in your wallet, you will need the make a transfer your WENLAMBO into a non-custodial digital wallet like 
<span className="faq_bold_text"> MetaMask</span>, <span className="faq_bold_text">Portis</span> or <span className="faq_bold_text">WalletConnect</span> compatible wallets</p>
                   <p>Please take into consideration time delays and limits given by each platform once you are in the process 
of buying WENLAMBO and transfer it to the non-custodial digital wallet.</p>
<p>After making the transfer to a non-custodial wallet as mentioned earlier, you can auction or purchase 
any NFT available on <span className="faq_bold_text">NFTConnected.com</span></p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel6'} onChange={handleChangeFaq('panel6')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel6bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>6. How much WENLAMBO is required to have in my balance to purchase an NFT?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>This is entirely on your choice. Taking into consideration that the principle of purchasing a NFT on 
                      <span className="faq_bold_text"> NFTConnected</span> is based on dutch auction, the final price is not controlled by us, so each bid will increase 
its price and is based on each bidder’s wallet balance and desire to purchase the NFT at a specific price.</p>
                   <p><span className="faq_bold_text">Note:</span> that the WENLAMBO price fluctuates and also you need to consider the ‘gas’ fees that will add to the final 
price.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChangeFaq('panel7')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel7bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>7. What is a dutch auction?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>In our efforts to create a transparent and a safe auction, we have come with the dutch auction model. 
This means that every action with a NFT released on <span className="faq_bold_text"> NFTConnected </span> is timed and has an initial price that 
continues to decline over time till it reaches its floor price. Once the NFT is live on auction, anyone can 
bid and redeem a NFT on <span className="faq_bold_text">NFTConnected</span> marketplace at any given time, if the NFT is not sold during the 
period of the auction, it will be posted at the floor price to be purchased at any given time.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel8'} onChange={handleChangeFaq('panel8')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel8bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>8. Can I create an NFT on nftconnected.com without putting it on sale?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                    <p>Yes. The minting process is independent from selling it, so if you want to sell it, store it, or decide to sell 
it later, you can do either one you like.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel9'} onChange={handleChangeFaq('panel9')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel9bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>9. Can I change the price of an already created collectible?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                    <p>Absolutely, you can manage the price of your already created NFT at any time without any transaction 
fee. The only thing is that you need to sign the requested signature stamp via your wallet.</p></div>
                  </AccordionDetails>
                </Accordion>

              </div>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <div className="faq_panel">
               
                <Accordion expanded={expanded === 'panel10'} onChange={handleChangeFaq('panel10')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel10bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>10. Can I gift or send a collectible to someone?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>Yes, we have created this option thinking that your creation could be a great gift</p>
                      <p>The only thing you need to do is go on the detail page of a collectible you own, press “...” to open the 
menu and select “transfer token”.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion expanded={expanded === 'panel11'} onChange={handleChangeFaq('panel11')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>11. What does “burn a token” mean?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>If you desire to cancel the created NFT and erase it from the Blockchain, the ERC-721 protocol allows 
you to create but also to destroy it, i.e., <span className="faq_bold_text">burning the token.</span></p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel12'} onChange={handleChangeFaq('panel12')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>12. What is “unlockable content”?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>As a content creator, after a transfer of ownership you can add unlockable content to your collectibles. 
Artists use this feature to include high resolution files, making-off’s. videos, secret messages etc.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel13'} onChange={handleChangeFaq('panel13')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>13. How does the royalty system work?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>Whenever you create your NFT, you can set a certain percentage as royalty for future sales of your NFT.</p>
                    <p>Example: You create a digital graphic and sell it for 2.3B WENLAMBO($100) and you have already set the royalty 10 
percent. After a period, the new owner of your created NFT sells it at a higher price, let us say 2.3B WENLAMBO($100). 
Your buyer then sells your painting at a higher price point for 2.3B WENLAMBO($100). When the smart contract 
processes the sale, the blockchain knows to send a 10% of the sale to the original creator, which is 
yourself, which means you will receive 10% of the selling price, 2.3B WENLAMBO($100).</p>
<p><span className="faq_bold_text">Note:</span> The Royalty system does not carry on to other platforms. We are trying our best to develop and 
make available this future.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel14'} onChange={handleChangeFaq('panel14')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>14. Can I report an artwork or collectible?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>Yes, just enter the detailed page of the token you want to report, click on “...” button and press 
“Report”</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel15'} onChange={handleChangeFaq('panel15')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>15. What is verification?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>We have created a simple and effective system to offer a second layer of guarantee to creators and 
collectors that show enough proof of authenticity and active presence on the marketplace. Several 
factors are taken into consideration when we apply the Verified Badge such as: social media activity, 
dialogues with inside community members, number of minted items and so on so forth.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel16'} onChange={handleChangeFaq('panel16')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>16. How to get a "verified" badge?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>After completing the bellow mentioned tips on getting the profile ready for the badge, you need to fill 
out the BadgeForm.</p>
<p>Tips for your account to get clearance:</p>
<ul className="faq_ul">
    <li>Complete NFT Connected profile submission: user pic + cover + custom link</li>
    <li>At least 2 links of your social media profiles<br />
    <span>
    - We are looking for active social media presence that has history, shares with your artworks, 
and being active with you communities. Mass following raises eyebrows, keep it real and we 
will consider it a plus.
    </span></li>
    <li>Behind the Scenes captures, let us dive in your world and see the hard work you are doing.
</li>
<li>For Collectors, we will have a look over your portfolio and see your previous purchases</li>
<li>Let us know you, write few sentences about yourself. Why have you chosen NFT Connected? 
What is your inspiration?</li>
</ul>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel17'} onChange={handleChangeFaq('panel17')}>
                  <AccordionSummary expandIcon={<Icon />} aria-controls="panel11bh-content" id="panel4bh-header">
                    <div className="accordian_head"><h2>17. It has been a while and I did not receive the badge. Why?</h2></div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="accordian_para">
                      <p>If two weeks has passed since submitting your request, most likely you did not provide enough 
information, or your NFT Connected account is not active enough.</p>
<p>Please take into consideration that our team reserves the right to not grant the verified badges without 
further explanation, as we receive hundreds of requests daily.</p>
<p>However, do not let it discourage you! The verified badge is not the key to success on the marketplace. 
Fill in your profiles, make more sales or purchases, and try one more time later.</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
