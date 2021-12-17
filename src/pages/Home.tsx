import React, { useEffect, useState } from "react"
import Default from "../layouts/Default"
import { useWeb3React } from "@web3-react/core"
import { useContract } from "../hooks/useContract"
import Config from "../Config"
import { BigNumber } from "ethers"
import { getXVaderPrice } from "../common/graphql"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation } from "react-router-dom"

import vaderABI from "../contracts/abis/vader.json"
import xvaderABI from "../contracts/abis/xvader.json"
import linearVestingABI from "../contracts/abis/linearVesting.json"
import vaderLogo from "../assets/img/vader-logo.svg"

export default function Home(): JSX.Element {
	const { account } = useWeb3React()

	const search = useLocation().search
	const address = new URLSearchParams(search).get("address") || account

	const numberFormatter = new Intl.NumberFormat("en-GB", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})

	const [vaderBalance, setVaderBalance] = useState<BigNumber | null>(null)
	const [xvaderBalance, setXvaderBalance] = useState<BigNumber | null>(null)
	const [totalXvaderBalance, setTotalXvaderBalance] = useState<BigNumber | null>(null)

	const [xvaderExchangeRate, setXvaderExchangeRate] = useState<BigNumber | null>(null)

	const [stakedVader, setStakedVader] = useState<BigNumber | null>(null)
	const [claimableVader, setClaimableVader] = useState<BigNumber | null>(null)

	const [coinGeckoStatistics, setCoinGeckoStatistics] = useState<null | {
		marketCap: number
		pricePerVader: number
		totalSupply: number
		circulatingSupply: number
		marketCapRank: number,
		priceChangePercentage24h: number
	}>(null)

	// contracts
	const vaderContract = useContract(Config.addresses.vader, vaderABI)
	const xvaderContract = useContract(Config.addresses.xvader, xvaderABI)
	const linearVestingContract = useContract(Config.addresses.linearVesting, linearVestingABI)

	const removeDecimals = (number: BigNumber) => number.div(BigNumber.from("10").pow("18"))

	// Effects
	useEffect(() => {
		(async () => {
			const coinGeckoStats = await (await fetch("https://api.coingecko.com/api/v3/coins/vader-protocol")).json()

			setCoinGeckoStatistics({
				marketCap: coinGeckoStats.market_data.market_cap.usd,
				pricePerVader: coinGeckoStats.market_data.current_price.usd,
				totalSupply: coinGeckoStats.market_data.total_supply,
				circulatingSupply: coinGeckoStats.market_data.circulating_supply,
				marketCapRank: coinGeckoStats.market_data.market_cap_rank,
				priceChangePercentage24h: coinGeckoStats.market_data.price_change_percentage_24h
			})

			const xvaderPrice = await getXVaderPrice("Hour", 0)

			if(xvaderPrice?.global?.value) {
				setXvaderExchangeRate(BigNumber.from(xvaderPrice.global.value))
			}
		})()
	}, [])

	useEffect(() => {
		if (address) {
			// vader balance
			(async () => {
				if (vaderContract) {
					setVaderBalance(await vaderContract.balanceOf(address))
				}

				if (xvaderContract) {
					setXvaderBalance(await xvaderContract.balanceOf(address))
				}

				if (linearVestingContract) {
					setClaimableVader(await linearVestingContract.getClaim(address))
				}
			})()
		} else {
			setVaderBalance(null)
			setXvaderBalance(null)
		}
	}, [account])

	useEffect(() => {
		if (vaderContract) {
			(async () => {
				setStakedVader(await vaderContract.balanceOf(Config.addresses.xvader))
			})()
		} else {
			setStakedVader(null)
		}
	}, [vaderContract])

	useEffect(() => {
		if (null === vaderBalance || null === xvaderBalance || null === xvaderExchangeRate) {
			setTotalXvaderBalance(BigNumber.from("0"))
		} else {
			setTotalXvaderBalance(
				vaderBalance
					.add(removeDecimals(xvaderBalance.mul(xvaderExchangeRate)))
					.add(claimableVader || "0")
			)
		}
	}, [vaderBalance, xvaderBalance, xvaderExchangeRate, claimableVader])

	return (
		<Default>
			<>
				<div className="py-4 text-center">
					<div className="hero mb-5">
						<div className="logo mb-3">
							<img
								src={vaderLogo}
								alt="Vader Protocol"
								style={{
									height: "75px"
								}}
							/>
						</div>
						<h1>invader.tools</h1>
						<p className={"lead text-muted"}>any invader&apos;s fav toolbox.</p>
					</div>
					<h2 className={"mb-4"}>Statistics</h2>
					<div className="mb-5">
						{coinGeckoStatistics ? (
							<div className={"row justify-content-center"}>
								<div className="col-md-4 col-lg-3">
									<div className="card">
										<div className="card-header small text-muted">$VADER Price</div>
										<div className="card-body text-center lead">${coinGeckoStatistics.pricePerVader}</div>
									</div>
									<div className="card mt-3">
										<div className="card-header small text-muted">Market Cap</div>
										<div className="card-body text-center lead">${numberFormatter.format(coinGeckoStatistics.marketCap)}</div>
									</div>
								</div>
								<div className="col-md-4 col-lg-3">
									<div className="card">
										<div className="card-header small text-muted">Circulating Supply</div>
										<div className="card-body">
											<p className="text-center lead mb-0">{numberFormatter.format(Math.round(coinGeckoStatistics.circulatingSupply))}</p>
											<p className="small text-muted">{Math.round(coinGeckoStatistics.circulatingSupply/coinGeckoStatistics.totalSupply*100)} %</p>
										</div>
									</div>
									<div className="card mt-4">
										<div className="card-header small text-muted">Total Supply</div>
										<div className="card-body">
											<p className="text-center lead mb-0">{numberFormatter.format(Math.round(coinGeckoStatistics.totalSupply))}</p>
											<p className="small text-muted">100 %</p>
										</div>
									</div>
								</div>
								<div className="col-md-4 col-lg-3">
									<div className="card">
										<div className="card-header small text-muted">Staked $VADER</div>
										{(stakedVader && coinGeckoStatistics) ? (
											<div className="card-body">
												<p className="text-center lead mb-0">{numberFormatter.format(removeDecimals(stakedVader).toNumber())}</p>
												<p className="small text-muted">{Math.round(removeDecimals(stakedVader).toNumber()/coinGeckoStatistics.circulatingSupply*100)} % of circulating</p>
											</div>
										) : (
											<div className="card-body text-center text-muted">{account ? "Loading statistics..." : "Connect wallet"}</div>
										)}
									</div>
								</div>
								<div className="col-md-4 col-lg-3">
									<div className="card text-start">
										<div className="card-header small text-muted">Your $VADER Balance</div>
										{account ? (
											<>
												<div className={"list-group list-group-flush"}>
													{(totalXvaderBalance) ? (
														<div className="list-group-item">Total: {numberFormatter.format(removeDecimals(totalXvaderBalance).toNumber())} {(coinGeckoStatistics.pricePerVader) && (
															<span className={"small ms-2"}>(${numberFormatter.format(removeDecimals(totalXvaderBalance).toNumber()*coinGeckoStatistics.pricePerVader)})</span>
														)}</div>
													) : (
														<div className="list-group-item">Total: Loading...</div>
													)}
													<div className="list-group-item small text-muted">$VADER: {vaderBalance ? numberFormatter.format(removeDecimals(vaderBalance).toNumber()) : "Loading..."}
														{(vaderBalance && coinGeckoStatistics.pricePerVader) && (
															<span className={"small ms-2"}>(${numberFormatter.format(removeDecimals(vaderBalance).toNumber()*coinGeckoStatistics.pricePerVader)})</span>
														)}
													</div>
													<div className="list-group-item small text-muted">$xVADER: {xvaderBalance ? numberFormatter.format(removeDecimals(xvaderBalance).toNumber()) : "Loading..."}
														{(xvaderBalance && coinGeckoStatistics.pricePerVader) && (
															<span className={"small ms-2"}>(${numberFormatter.format(removeDecimals(xvaderBalance).toNumber()*coinGeckoStatistics.pricePerVader)})</span>
														)}
													</div>
													<div className="list-group-item small text-muted">Claimable: {claimableVader ? numberFormatter.format(removeDecimals(claimableVader).toNumber()) : "Loading..."}
														{(claimableVader && coinGeckoStatistics.pricePerVader) && (
															<span className={"small ms-2"}>(${numberFormatter.format(removeDecimals(claimableVader).toNumber()*coinGeckoStatistics.pricePerVader)})</span>
														)}
														{claimableVader && claimableVader.gt("0") && (
															<>
																<p className={"mt-1"}>
																	<a href="https://www.vaderprotocol.app/acquire" target={"_blank"} className={"small"} rel="noreferrer">
																		Claim Now{" "}
																		<FontAwesomeIcon icon={"external-link-alt"} />
																	</a>
																</p>
															</>
														)}
													</div>
												</div>
											</>
										) : (
											<div className="card-body text-center text-muted">Connect wallet</div>
										)}
									</div>
									<div className="card mt-4">
										<div className="card-header small text-muted">Exchange Rate</div>
										<div className="list-group list-group-flush">
											<div className="list-group-item small text-muted">Exchange Rate: {xvaderExchangeRate ? xvaderExchangeRate.mul("100000").div(BigNumber.from("10").pow("18")).toNumber()/100000 : "Loading..."}</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="card">
								<div className="card-body text-center lead">Loading statistics...</div>
							</div>
						)}
					</div>
					<h2>become an invader</h2>
					<p className="lead">
						<a href="https://discord.com/invite/vaderprotocol" target={"_blank"} rel="noreferrer" className={"btn btn-sm btn-dark mt-2"}>Join Vader Protocol</a>
					</p>
				</div>
			</>
		</Default>
	)
}
