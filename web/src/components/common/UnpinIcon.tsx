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
		<path d="M13,22h-2c-1.1,0-2-0.9-2-2v-7l-2-3V8h4V3l1-1l1,1v5h4v2l-2,3v7C15,21.1,14.1,22,13,22z" />
	</svg>
);

export default () => <Icon glyph={CustomIcon} label="pin" />;
