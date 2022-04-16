import React from 'react';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';

function RightClickMenu() {
	return (
		<div className='app'>
			<ContextMenuTrigger id='my-context-menu-1'>
				<div style={{ border: '1px solid black', height: '50px', width: '150px', margin: '20px' }}>Right Click On Me</div>
			</ContextMenuTrigger>

			<ContextMenu id='my-context-menu-1' animation='fade' hideOnLeave={true}>
				<ContextMenuItem>Menu Item 1</ContextMenuItem>
				<ContextMenuItem>Menu Item 2</ContextMenuItem>
				<ContextMenuItem>Menu Item 3</ContextMenuItem>
				<ContextMenuItem>Menu Item 4</ContextMenuItem>
			</ContextMenu>
		</div>
	);
}

export default RightClickMenu;
