import { AutoDismissFlag, FlagGroup } from "@atlaskit/flag";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { FlagContext } from "../utils/context";
import { FlagData } from "../utils/types";
import ErrorIcon from "./icons/ErrorIcon";
import SuccessIcon from "./icons/SuccessIcon";

const IconWrapper = styled.span`
	width: 24px;
	height: 24px;

	span {
		width: 100%;
		svg {
			width: 100%;
		}
	}
`;

export const FlagProvider = (props: { children: ReactNode }) => {
	const [flags, setFlags] = useState<FlagData[]>([]);

	const dismissFlag = () => setFlags(flags.slice(1));
	const addFlag = (flag: FlagData) => setFlags([flag, ...flags]);

	return (
		<FlagContext.Provider value={{ addFlag }}>
			{props.children}
			<FlagGroup onDismissed={dismissFlag}>
				{flags.map(({ appearance, title }, i) => (
					<AutoDismissFlag
						title={title}
						id={i + "flag"}
						key={i + "flag"}
						icon={
							<IconWrapper>
								{appearance === "success" ? <SuccessIcon /> : <ErrorIcon />}
							</IconWrapper>
						}
					/>
				))}
			</FlagGroup>
		</FlagContext.Provider>
	);
};
