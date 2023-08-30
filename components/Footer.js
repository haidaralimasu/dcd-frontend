import Link from "next/link";
import { IconFacebook, IconLinkedin, IconTwiter } from "./svg";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="cm_logo">
                            <Link href="/">
                                <img src="assets/logo.png" />
                                <p>Digital Citizen<br />DAO</p>
                            </Link>
                        </div>

                        <h3>Contracts</h3>
                        <p>Citizen NFT Smart Contract</p>

                        <h3>Follow Us</h3>
                        <div className="social_icons">
                            <a href="#" target="_blank"><IconFacebook /></a>
                            <a href="#" target="_blank"><IconTwiter /></a>
                            <a href="#" target="_blank"><IconLinkedin /></a>
                        </div>
                   </div>


                   <div className="col-lg-3 col-md-6">
                        <h3>Community Links</h3>
                        <ul>
                            <li><Link href="/">White Paper</Link></li>
                            <li><Link href="/">Committees</Link></li>
                            <li><Link href="/">Economics</Link></li>
                            <li><Link href="/">Education</Link></li>
                            <li><Link href="/">About DCD</Link></li>
                        </ul>
                   </div>

                   
                   <div className="col-lg-3 col-md-6">
                        <h3>Governance</h3>
                        <ul>
                            <li><Link href="/">Gnosis Safe</Link></li>
                            <li><Link href="/">Voting</Link></li>
                            <li><Link href="/">Forum</Link></li>
                            <li><Link href="/">DCD Apps</Link></li>
                        </ul>
                   </div>

                   
                   <div className="col-lg-3 col-md-6">
                        <h3>NFTs</h3>
                        <ul>
                            <li><Link href="/">Citizenship NFTs</Link></li>
                            <li><Link href="/">Civilian NFTs</Link></li>
                            <li><Link href="/">Business NFTs</Link></li>
                        </ul>
                   </div>


                </div> 
            </div>


            <div className="copyright_wrapper">
                <p>Copyright ©2023 <b>Digital Citizen DAO</b> Company S.L. All rights reserved.</p>
            </div>

           
        </footer>
    )
}

export default Footer;

                                                    