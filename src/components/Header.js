import React from 'react';


function Header() {
    return ( 
    <div>
        <header className="header">
		<h1>todos</h1>
		<form>
			<input className="new-todo" placeholder="What needs to be done?" autoFocus />
		</form>
	</header>
    </div>);
}

export default Header;