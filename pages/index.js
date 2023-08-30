import ConnectButton from "@/components/ConnectButton";
import {
  IconBusiness,
  IconCard,
  IconCities,
  IconCitizen,
  IconCitizenShip,
  IconComunity,
  IconContract,
  IconETH,
  IconGraph,
  IconHands,
  IconHumanCode,
  IconInternet,
  IconReward,
  IconSeed,
  IconSetting,
  IconSupply,
  IconThreeDots,
  IconUSD,
} from "@/components/svg";
import {
  useUsdtPrice,
  useGetInvestmentByAddress,
  useTotalRaisedUSDT,
  useETHToDCD,
  useUSDTToDCD,
} from "@/hooks/useContract";
import Head from "next/head";
import { Mainnet, useEthers } from "@usedapp/core";
import { ethers } from "ethers";

import { useState } from "react";
import {
  usdtAddress,
  dcdSaleAddress,
  usdtInterface,
  dcdPresaleInterface,
} from "@/config";
import { notifyError, notifySuccess } from "@/notifications";

export default function Home() {
  const [activeBtn, setActiveBtn] = useState(1);
  const [ecosystemBtn, setEcosystemBtn] = useState("1");

  const { account, switchNetwork, chainId } = useEthers();

  const [amountToPayInUSDT, setAmountToPayInUSDT] = useState(0);
  const usdtToDCD = useUSDTToDCD(amountToPayInUSDT);
  const formattedUSDTTODCD = usdtToDCD ? usdtToDCD.toString() : 0;

  const [amountToPayInETH, setAmountToPayInETH] = useState(0);
  const ethToDCD = useETHToDCD(amountToPayInETH);
  const formattedETHTODCD = ethToDCD ? ethToDCD.toString() : 0;

  const usdtPrice = useUsdtPrice();
  const formattedUsdtPrice = usdtPrice ? usdtPrice.toString() : "0";

  const totalPriceRaised = useTotalRaisedUSDT();
  const formattedTotalPriceRaised = totalPriceRaised
    ? totalPriceRaised.toString() / 1000000
    : 0;

  const handleChangeETH_DCD = (event) => {
    setAmountToPayInETH(event.target.value);
  };
  const handleChangeUSDT_DCD = (event) => {
    setAmountToPayInUSDT(event.target.value);
  };

  console.log(((formattedTotalPriceRaised / 1386000) * 100).toString() + "%");

  const buyTokenUsdt = async () => {
    if (chainId != Mainnet.chainId) {
      await switchNetwork(Mainnet.chainId);
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);

      try {
        const busdtContract = new ethers.Contract(
          usdtAddress,
          usdtInterface,
          signer
        );

        let approveTx = await busdtContract.approve(
          dcdSaleAddress,
          amountToPayInUSDT.toString() * 1000000
        );

        await approveTx.wait();
        await notifySuccess(
          "USDT Is Approved Please Confirm Next Transaction !"
        );
      } catch (error) {
        console.log(error);
        await notifyError("Something Went Wrong While Approving USDT !");
      }

      const contract = new ethers.Contract(
        dcdSaleAddress,
        dcdPresaleInterface,
        signer
      );

      let tx = await contract.buyTokensUSDT(
        amountToPayInUSDT.toString() * 1000000
      );

      await tx.wait();
      await notifySuccess("Successfully Purchased Tokens");
    } catch (error) {
      console.log(error);
      await notifyError("Something Went Wrong While Buying Tokens With USDT");
    }
  };

  const buyTokenNative = async () => {
    if (chainId != Mainnet.chainId) {
      await switchNetwork(Mainnet.chainId);
    }

    try {
      // const provider = new ethers.providers.JsonRpcProvider(bscRPCURL);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
      const contract = new ethers.Contract(
        dcdSaleAddress,
        dcdPresaleInterface,
        signer
      );

      let tx = await contract.buyTokensNative({
        value: ethers.utils.parseUnits(amountToPayInETH, "ether"),
      });

      await tx.wait();
      await notifySuccess("Successfully Purchased Tokens");
    } catch (error) {
      console.log(error);
      await notifyError("Something Went Wrong While Buying Tokens With ETH");
    }
  };

  return (
    <>
      <Head>
        <title>Digital Citizen DAO</title>
        <meta name="description" content="Digital Citizen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="main_banner">
          <div
            className="banner_bg"
            style={{ backgroundImage: `url(assets/banner-bg.png)` }}
          />

          <div className="banner_inner_bg">
            {/* <img src="assets/earth.png" /> */}
            <img src="assets/earth-big.gif" />
            <div className="banner_bg_box" />
            <div className="container">
              {/* <h2>8,045,222,209</h2> */}
              <iframe
                title="World Population"
                src="https://www.theworldcounts.com/embeds/counters/121?background_color=none&color=white&font_family='Familjen Grotesk', sans-serif&font_size=40"
                style={{
                  border: "none",
                  background: "transparent",
                  paddingTop: 80,
                  fontFamily: `'Familjen Grotesk', 'sans-serif'`,
                  maxWidth: "100%",
                }}
                height="300"
                width="800"
              ></iframe>
              {/* <h3>World Population</h3> */}
              {/* <h4>Globally, right now</h4> */}
              <h1>Turning digital natives into Digital Citizens.</h1>
              <h5>
                Digital Citizen DAO’s mission is to deliver economic
                opportunities to our Ethereum based, citizen governed community.
              </h5>

              <div className="banner_counts">
                <div>
                  <b>195</b>
                  <h6>Countries Supported</h6>
                </div>

                <div>
                  <b>100+</b>
                  <h6>Locations</h6>
                </div>

                <div>
                  <b>1</b>
                  <h6>City</h6>
                </div>
              </div>

              <div className="my-5">
                <button className="btn btn-secondary">View More</button>
              </div>
            </div>
          </div>
        </div>

        <section className="g_4">
          <div className="container cm_ecosystem_wrapper">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6">
                <div className="pre_stage_wrapper">
                  <div className="pre_stage_heading">
                    <h3>Pre-Sale: Stage 1</h3>

                    <div className="range_picker">
                      <p>Until next price $0.24 (+118.18%)</p>
                      <div className="range_picker_line_wrapper">
                        <div
                          className="range_picker_line"
                          style={{
                            width:
                              (
                                (formattedTotalPriceRaised / 1386000000000) *
                                100
                              ).toString() + "%",
                          }}
                        />
                      </div>
                      <p>
                        ${formattedTotalPriceRaised.toLocaleString("en-US")} /
                        $1,386,000
                      </p>
                    </div>

                    <div className="input_border">
                      <div className="input_border_inner">
                        <p>Round 1 – 26M Tokens</p>
                        <small>$0.11</small>
                      </div>
                    </div>

                    <div className="input_border">
                      <div className="input_border_inner">
                        <p>Round 2 – 13M Tokens</p>
                        <small>$0.24</small>
                      </div>
                    </div>

                    <div className="input_border">
                      <div className="input_border_inner">
                        <p>Round 3 – 26M Tokens</p>
                        <small>$0.5</small>
                      </div>
                    </div>

                    <div className="input_border">
                      <div className="input_border_inner">
                        <p>Round 4 – 65M Tokens</p>
                        <small>$0.74</small>
                      </div>
                    </div>

                    <div className="input_border">
                      <div className="input_border_inner">
                        <p>Round 1 – 153.4 Tokens</p>
                        <small>$0.83</small>
                      </div>
                    </div>

                    <div className="input_border">
                      <div className="input_border_inner d-flex justify-content-between align-items-center">
                        <div className="text-center">
                          <div>Presale Price</div>
                          <h4>${formattedUsdtPrice / 1000000}</h4>
                        </div>

                        <div className="text-center">
                          <div>Listing Price</div>
                          <h4>$1</h4>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-center">Estimated Citizenship Price</h3>

                    <div className="text-center">
                      <div className="cut_border me-3">
                        <div className="cut_border_inner">
                          <small>Founding Father = 10858 DCD</small>
                        </div>
                      </div>

                      <div className="cut_border">
                        <div className="cut_border_inner">
                          <small>Founding Father = 10858 DCD</small>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <div
                        className={`input_border ${
                          activeBtn == 1 ? "active" : ""
                        }`}
                        onClick={() => setActiveBtn(1)}
                      >
                        <div className="input_border_inner d-flex align-items-center">
                          <IconETH />
                          <small className="ms-2">ETH</small>
                        </div>
                      </div>

                      <div
                        className={`input_border mx-5 ${
                          activeBtn == 2 ? "active" : ""
                        }`}
                        onClick={() => setActiveBtn(2)}
                      >
                        <div className="input_border_inner d-flex align-items-center">
                          <IconCard />
                          <small className="ms-2">CARD</small>
                        </div>
                      </div>

                      <div
                        className={`input_border ${
                          activeBtn == 3 ? "active" : ""
                        }`}
                        onClick={() => setActiveBtn(3)}
                      >
                        <div className="input_border_inner d-flex align-items-center">
                          <small className="ms-2">$ USDT</small>
                        </div>
                      </div>
                    </div>

                    <div className="cm_ecosystem_inputs">
                      <div className="cm_ecosystem_inputs_left">
                        <span
                          onClick={() => setEcosystemBtn(1)}
                          className={`${ecosystemBtn == 1 ? "active" : ""}`}
                        >
                          $
                        </span>
                        <span
                          onClick={() => setEcosystemBtn(2)}
                          className={`with_color ${
                            ecosystemBtn == 2 ? "active" : ""
                          }`}
                        >
                          <IconETH />
                        </span>
                        <span>
                          {activeBtn == 1 ? (
                            <input
                              onChange={handleChangeETH_DCD}
                              placeholder="0"
                              type="number"
                            />
                          ) : null}
                          {activeBtn == 2 ? (
                            <input placeholder="02" type="text" />
                          ) : null}
                          {activeBtn == 3 ? (
                            <input
                              onChange={handleChangeUSDT_DCD}
                              placeholder="0"
                              type="number"
                            />
                          ) : null}
                        </span>
                        <span
                          onClick={() => setEcosystemBtn(3)}
                          className={`with_color ${
                            ecosystemBtn == 3 ? "active" : ""
                          }`}
                        >
                          <img src="assets/logo.png" />
                        </span>
                      </div>

                      <div className="cm_ecosystem_inputs_right">
                        <span style={{ width: "1000px" }}>
                          {activeBtn == 1 ? (
                            <input
                              disabled
                              placeholder={ethers.utils.formatUnits(
                                formattedETHTODCD
                              )}
                              type="number"
                            />
                          ) : null}
                          {activeBtn == 2 ? (
                            <input placeholder="02" type="text" />
                          ) : null}
                          {activeBtn == 3 ? (
                            <input
                              disabled
                              placeholder={ethers.utils.formatUnits(
                                formattedUSDTTODCD
                              )}
                              type="number"
                            />
                          ) : null}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      {account ? (
                        <>
                          {" "}
                          {activeBtn == 1 ? (
                            <button
                              onClick={() => buyTokenNative()}
                              className="btn btn-primary me-3"
                            >
                              Buy Now
                            </button>
                          ) : null}
                          {activeBtn == 3 ? (
                            <button
                              onClick={() => buyTokenUsdt()}
                              className="btn btn-primary me-3"
                            >
                              Buy Now
                            </button>
                          ) : null}
                        </>
                      ) : null}

                      <ConnectButton classes="btn btn-primary me-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 cm_ecosystem">
                <div className="cm_ecosystem_heading">
                  <h5>DIGITAL CITIZEN DAO, IS THE WORLD'S FIRST</h5>
                  <h3>DO-EVERYTHING CRYPTO ECOSYSTEM</h3>
                </div>

                <p>
                  Equal weight, democratic citizenship means that everyone's
                  vote counts and nobody has more say than anyone else.
                </p>

                <ul>
                  <li
                    style={{ backgroundImage: `url(assets/eco-line-bg.svg)` }}
                  >
                    <div>
                      <IconHumanCode />
                    </div>
                    <p>
                      Earn regular dividends just for being a citizen & for
                      participating in governance, plus, unparalleled
                      opportunities to make citizenship your primary source of
                      income.
                    </p>
                  </li>

                  <li
                    style={{ backgroundImage: `url(assets/eco-line-bg.svg)` }}
                  >
                    <div>
                      <IconHands />
                    </div>
                    <p>
                      Everything you need all in once place. Citizens have
                      access to tools that are not found anywhere else on the
                      blockchain, as well as great ideas borrowed from other
                      projects.
                    </p>
                  </li>

                  <li
                    style={{ backgroundImage: `url(assets/eco-line-bg.svg)` }}
                  >
                    <div>
                      <IconInternet />
                    </div>
                    <p>
                      Interact seamlessly with our global community online,
                      on-chain in our metaverse or in the real world at
                      businesses and properties that YOU own as a citizen.
                    </p>
                  </li>

                  <li
                    style={{ backgroundImage: `url(assets/eco-line-bg.svg)` }}
                  >
                    <div>
                      <IconGraph />
                    </div>
                    <p>
                      Access the DAO from anywhere on your mobile device or on
                      the Digital Citizen dApp
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="g_3">
          <div className="container">
            <h2 className="sction_heading">What is Digital Citizen DAO?</h2>
            <p className="sction_sub_heading">
              Digital Citizen DAO is the first ever cohesive on-chain digital
              society. We’re innovating society itself, keeping the parts that
              work well and eliminating or re-inventing the parts that need
              improvement.
            </p>

            <div className="row">
              <div className="col-lg-6">
                <div className="cm_card px-5">
                  <h3>Our Goals</h3>

                  <ul className="cm_goals">
                    <li>
                      <img src="assets/logo.png" />
                      <h4>VDemocratize truth</h4>
                      <p>
                        Digital Citizen DAO is breaking down the monopoly that
                        media & government have on information by creating the
                        first immutable single source of truth.
                      </p>
                    </li>

                    <li>
                      <img src="assets/logo.png" />
                      <h4>VDemocratize truth</h4>
                      <p>
                        Digital Citizen DAO is breaking down the monopoly that
                        media & government have on information by creating the
                        first immutable single source of truth.
                      </p>
                    </li>

                    <li>
                      <img src="assets/logo.png" />
                      <h4>VDemocratize truth</h4>
                      <p>
                        Digital Citizen DAO is breaking down the monopoly that
                        media & government have on information by creating the
                        first immutable single source of truth.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="r_g_box">
                  <img src="assets/rectangle-gradiant.svg" />
                  <div className="r_g_box_inner w-100">
                    <h2>Tokenomics</h2>
                    <p>DCD is the native token of the Digital Citizen DAO.</p>

                    <div className="d-flex justify-content-between px-5 mt-5 tokenomics">
                      <div>
                        <IconSupply />
                        <h2>400M</h2>
                        <p>Supply</p>
                      </div>

                      <div>
                        <IconSetting />
                        <h2>~250M</h2>
                        <p>Market Cap at Listing</p>
                      </div>

                      <div>
                        <IconCitizen />
                        <h2>1,600+</h2>
                        <p>Citizens on waiting list</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="sction_heading">Become a Citizen</h2>

            <div className="row">
              <div className="col-md-4">
                <div className="cm_card_outline">
                  <div>
                    <img src="assets/citizen-img.png" />
                  </div>
                  <h3>Become a Citizen</h3>
                  <p>
                    Get your Citizenship today or, if you’re not ready to take
                    that step yet, find other ways to benefit.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="cm_card_outline">
                  <div>
                    <img src="assets/engaged-img.png" />
                  </div>
                  <h3>Get Engaged</h3>
                  <p>
                    A society needs all types of people to function. See what
                    opportunities there are to get engaged or recommend
                    something entirely new. It’s your community, be a part of
                    it.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="cm_card_outline">
                  <div>
                    <img src="assets/earn-and-grow-img.png" />
                  </div>
                  <h3>Earn & Grow</h3>
                  <p>
                    Ultimately DCD is about creating economic freedom for
                    people.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="g_2">
          <div className="container">
            <h2 className="sction_heading pb-4">Our accomplishments so far</h2>

            <div className="row d-flex justify-content-center my-5 py-5">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconSeed />
                  <h3>Seed Phase</h3>
                  <p>
                    We have completed our initial seed phase, raising enough
                    capital to get our project off the ground and running.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconCitizenShip />
                  <h3>Citizenship</h3>
                  <p>
                    With Citizenship The Future Of The DAO Is In Your Hands
                    Through Proposals And Voting.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconComunity />
                  <h3>Committees</h3>
                  <p>
                    Committees Are How Our Teams Are Organized. Meet Like Minded
                    People Just Like Yourself And Work To Improve The DAO.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconReward />
                  <h3>Recruitment Rewards</h3>
                  <p>
                    Help our community grow and earn huge rewards by recruiting
                    new members to the DOA.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconCities />
                  <h3>Virtual Cities</h3>
                  <p>
                    Cities are the basic organization of citizens. Some cities
                    represent real world locations while others are completely
                    on-chain.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconBusiness />
                  <h3>Business</h3>
                  <p>
                    Businesses are a special type of smart contract that allow
                    our DAO to earnrevenue and payback our citizens.
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="cm_rotate_card">
                  <img
                    className="gradiant_path"
                    src="assets/gradiant-path.svg"
                  />
                  <IconContract />
                  <h3>Smart Contracts</h3>
                  <p>
                    DCD consists of an elaborate network of smart contracts that
                    enhance our ompetitive edge in everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="sction_heading">How Will You Shape The Future?</h2>

            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="cm_card">
                  <div>
                    <img src="assets/icon-economic.svg" />
                  </div>
                  <h3>Economics</h3>
                  <p>
                    Economic freedom for all citizens is our goal. Help create
                    an economy that ensures our citizens are compensated for
                    participation with the DAO.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="cm_card">
                  <div>
                    <img src="assets/icon-build.svg" />
                  </div>
                  <h3>Build</h3>
                  <p>
                    Help develop the software, hardware, concepts and products
                    that drive our ecosystem. Build the future and reap the
                    rewards of our combined success.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="cm_card">
                  <div>
                    <img src="assets/icon-govern.svg" />
                  </div>
                  <h3>Govern</h3>
                  <p>
                    Your opinion matters, we want you to share it and help form
                    the foundation of how we interact with each other and the
                    outside world.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="cm_card">
                  <div>
                    <img src="assets/icon-community.svg" />
                  </div>
                  <h3>Community</h3>
                  <p>
                    Connect with people, grow our global community & earn
                    rewards.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="cm_card">
                  <div>
                    <img src="assets/icon-legal.svg" />
                  </div>
                  <h3>Legal</h3>
                  <p>
                    Help shape the future legal framework of DAOs across the
                    globe.
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="cm_card">
                  <div>
                    <img src="assets/icon-more.svg" />
                  </div>
                  <h3>More...</h3>
                  <p>
                    Discover other ways you can assist the DAO. Don't see
                    something? Let us know.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
