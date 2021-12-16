import React from "react"
import { Nav, Navbar as BSNavbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { ConnectorNames } from "../constants/connectorNames"
import useAuth from "../hooks/useAuth"
import vaderLogo from "../assets/img/vader-logo.svg"

export default function Navbar(): JSX.Element {
	const { login, isConnecting } = useAuth()

	const { account } = useWeb3React()

	return (
		<>
			<BSNavbar bg="transparent" expand="lg">
				<div className={"container-fluid"}>
					<Link to={"/"} className={"navbar-brand"}>
						<img
							src={vaderLogo}
							alt="Vader Protocol"
							style={{
								height: "25px",
								verticalAlign: "sub"
							}}
							className={"me-2"}
						/>
						invader.tools
						<small className="text-muted ms-2">For Vader Protocol</small>
					</Link>
					<BSNavbar.Toggle aria-controls="basic-navbar-nav" />
					<BSNavbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<a href={"https://www.vaderprotocol.io"} target={"_blank"} className={"nav-link"} rel="noreferrer">VaderProtocol.io</a>
							<a href={"https://discord.gg/vaderprotocol"} target={"_blank"} className={"nav-link"} rel="noreferrer">Discord</a>
							{account ? (
								<a href={"#"} className={"nav-link btn btn-dark text-white"}>
									{account.slice(0,5)+"..."+account.slice(-3)}
								</a>
							) : (
								<a
									href={"#"}
									onClick={event => {
										event.preventDefault()
										event.currentTarget.blur()

										login(ConnectorNames.Injected)
									}}
									className={"nav-link btn btn-dark text-white"}
								>{isConnecting ? "Connecting..." : "Connect"}</a>
							)}
						</Nav>
					</BSNavbar.Collapse>
				</div>
			</BSNavbar>
		</>
	)
}
