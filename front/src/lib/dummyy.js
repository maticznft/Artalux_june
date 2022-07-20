<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
className="modal modal_dialog"
>
<div className="modal-content">
    <div className="modal-header text-center">
      <h5 className="modal-title" id="connect_modalLabel">Connect Your Wallet</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <ul className="connect_ul mb-4">
        {

          window.ethereum
          && new Web3(window.ethereum)
          && new Web3(window.web3.currentProvider)
          && (new Web3(window.web3.currentProvider.isMetaMask))
          &&

          <li>
            <div className=" connect_card" onClick={() => {
              //localStorage.setItem('walletConnectType','mt')
              window.$('.modal').modal('hide')
              // getInit('mt')
              if (localStorage.walletconnect != null) {
                localStorage.removeItem('walletconnect')
              }
              // props.Set_WalletConnected("true");
            }} >
              <div className="card-body-mod">
                <div className="media follow_media">
                  {/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

                  <div className="media-body flex_body">
                    <div className="w-100">
                      <div className="wallet-lists"
                      >
                        <p className="my-0 media_text">
                             <img src={Icon1} alt="Metamask" className="img-fluid" />
                             Metamask</p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </li>

        }
        {

          // window.ethereum
          // && new Web3(window.ethereum)
          // && new Web3(window.web3.currentProvider)
          // &&

          <li>
            <div className=" connect_card" onClick={() => {
              // localStorage.setItem('walletConnectType','mt')
              window.$('.modal').modal('hide')
              // getInit('mt')
              if (localStorage.walletconnect != null) {
                localStorage.removeItem('walletconnect')
              }
              // props.Set_WalletConnected("true");
            }} >
              <div className="card-body-mod">
                <div className="media follow_media">
                  {/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

                  <div className="media-body flex_body">
                    <div className="w-100">
                      <div className="wallet-lists"
                      >
                        <p className="my-0 media_text">
                             <img src={Coin} alt="CoinBase" className="Coinbase" />
                             CoinBase</p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </li>
        }
        <li>
          <div className="connect_card" onClick={() => {
            // localStorage.setItem('walletConnectType','wc')
            window.$('.modal').modal('hide')
            // getInit('wc')
            // props.Set_WalletConnected("true");
          }}>
            <div className="card-body-mod">
              <div className="media follow_media">
                {/* <img src={require("../../assets/images/connect_img_1.png")} alt="User" className="img-fluid mr-2" /> */}

                <div className="media-body flex_body">
                  <div className="w-100">
                    <div className="wallet-lists"
                    >
                      <p className="my-0 media_text">
                         <img src={Icon3} alt="WalletConnect" className="img-fluid"/>
                         
                         Wallet Connect</p>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </li>
        {/* {window.ethereum
        && new Web3(window.ethereum)
        && new Web3(window.web3.currentProvider)
        && (new Web3(window.web3.currentProvider.isWalletConnect)) &&

        <li>
          <div className="connect_card  d-xl-none"
            onClick={() => {
              // localStorage.setItem('walletConnectType','mt')
              window.$('.modal').modal('hide')
              getInit('mt')
              if (localStorage.walletconnect != null) {
                localStorage.removeItem('walletconnect')
              }
              props.Set_WalletConnected("true");
            }}
          >
            <div className="card-body-mod">
              <div className="media follow_media">

                <div className="media-body flex_body">
                  <div className="w-100">
                    <div className="wallet-lists" >
                      <p className="my-0 media_text"> <img src={Icon4} />Trust wallet</p>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </li>} */}

      </ul>
    </div>
  </div>
</Modal>