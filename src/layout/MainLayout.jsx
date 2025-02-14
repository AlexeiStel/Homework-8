import {NavLink, Outlet} from 'react-router-dom';
import { AuthStatus } from '../component/AuthStatus';

export function MainLayout() {
    return (
        <>
        <AuthStatus />
        <ul>
			<li>
				<NavLink 
					style={ ({ isActive }) => isActive ? {color: "red"} : {}} 
					to="/" 
					>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink 
					style={ ({ isActive }) => isActive ? {color: "red"} : {}} 
					to="/heroes">Heroes
				</NavLink>
			</li>
			<li>
				<NavLink 
				style={ ({ isActive }) => isActive ? {color: "red"} : {}} 
				to="/locations">
					Locations
				</NavLink>
			</li>
			<li>
				<NavLink 
				style={ ({ isActive }) => isActive ? {color: "red"} : {}} 
				to="/episodes">
					Episodes
				</NavLink>
			</li>
		</ul>

        <Outlet />
        </>
    )
}