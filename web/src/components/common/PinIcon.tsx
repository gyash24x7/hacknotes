import Icon from "@atlaskit/icon";
import React from "react";

const CustomIcon = () => (
	<svg
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 24 24"
		xmlSpace="preserve"
		fill="currentColor"
	>
		<path d="M15,4v7l2,3v2h-4v5l-1,1l-1-1v-5H7v-2l2-3V4c0-1.1,0.9-2,2-2h2C14.1,2,15,2.9,15,4z" />
	</svg>
);

export default () => <Icon glyph={CustomIcon} label="pin" />;
