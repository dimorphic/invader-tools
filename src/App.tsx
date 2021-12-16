import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

// Pages
import Home from "./pages/Home"
import useEagerConnect from "./hooks/useEagerConnect"

// Assets
import "./assets/sass/styles.scss"

export interface IRoute {
	path: string
	exact?: boolean
	children: JSX.Element
}

// Register FontAwesomeIcons
library.add(fas)

export default function App(): JSX.Element {
	useEagerConnect()

	const routes: IRoute[] = [
		{
			path: "/",
			exact: true,
			children: <Home />
		},
	]

	return (
		<BrowserRouter>
			{routes.map((route: IRoute, key: number) => <Route key={key} path={route.path} exact={route.exact || false}>{route.children}</Route>)}
		</BrowserRouter>
	)
}
