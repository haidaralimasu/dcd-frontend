import Link from "next/link";
import ConnectButton from "./ConnectButton";

const Header = () => {

    const toggleMenu = () => {
        document.body.classList.toggle('menu_open')
    }


    return (
        <header>
            <div className="container position-relative">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="cm_logo">
                        <Link href="/">
                            <img src="assets/logo.png" />
                            <p>Digital Citizen<br />DAO</p>
                        </Link>
                    </div>
                    <div className="cm_menu_primary">
                        <ul>
                            <li><Link href="/">Constitution</Link> </li>
                            <li><Link href="/">Citizenship</Link> </li>
                            <li><Link href="/">Assets</Link> </li>
                            <li><Link href="/">DAO</Link> </li>
                            <li><Link href="/">Committees</Link> </li>
                            <li><Link href="/">Community</Link> </li>
                        </ul>

                        <div className="menu_close_trigger" onClick={toggleMenu}>
                            <span />
                        </div>
                    </div>
                    <div className="cm_header_action">
                        <ConnectButton classes="btn btn-outline-primary mx-2" />
                        <div className="menu_trigger" onClick={toggleMenu}>
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;

