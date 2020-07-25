import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AvatarService {
	constructor(private readonly configService: ConfigService) {}
	options: Record<string, string[]> = {
		accessoriesType: [
			"Blank",
			"Kurt",
			"Prescription01",
			"Prescription02",
			"Round",
			"Sunglasses",
			"Wayfarers"
		],

		hatColor: [
			"Black",
			"Blue01",
			"Blue02",
			"Blue03",
			"Gray01",
			"Gray02",
			"Heather",
			"PastelBlue",
			"PastelGreen",
			"PastelOrange",
			"PastelRed",
			"PastelYellow",
			"Pink",
			"Red",
			"White"
		],

		topType: [
			"EyePatch",
			"Hat",
			"Hijab",
			"LongHairBigHair",
			"LongHairBob",
			"LongHairBun",
			"LongHairCurly",
			"LongHairCurvy",
			"LongHairDreads",
			"LongHairFrida",
			"LongHairFro",
			"LongHairFroBand",
			"LongHairMiaWallace",
			"LongHairNotTooLong",
			"LongHairShavedSides",
			"LongHairStraight",
			"LongHairStraight2",
			"LongHairStraightStrand",
			"NoHair",
			"ShortHairDreads01",
			"ShortHairDreads02",
			"ShortHairFrizzle",
			"ShortHairShaggy",
			"ShortHairShaggyMullet",
			"ShortHairShortCurly",
			"ShortHairShortFlat",
			"ShortHairShortRound",
			"ShortHairShortWaved",
			"ShortHairSides",
			"ShortHairTheCaesar",
			"ShortHairTheCaesarSidePart",
			"Turban",
			"WinterHat1",
			"WinterHat2",
			"WinterHat3",
			"WinterHat4"
		],

		skinColor: [
			"Tanned",
			"Yellow",
			"Pale",
			"Light",
			"Brown",
			"DarkBrown",
			"Black"
		],

		mouthType: [
			"Concerned",
			"Default",
			"Disbelief",
			"Eating",
			"Grimace",
			"Sad",
			"ScreamOpen",
			"Serious",
			"Smile",
			"Tongue",
			"Twinkle",
			"Vomit"
		],

		facialHairType: [
			"BeardLight",
			"BeardMajestic",
			"BeardMedium",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"Blank",
			"MoustacheFancy",
			"MoustacheMagnum"
		],

		hairColor: [
			"Black",
			"Auburn",
			"Blonde",
			"BlondeGolden",
			"Brown",
			"BrownDark",
			"Platinum",
			"Red",
			"PastelPink",
			"SilverGray"
		],

		facialHairColor: [
			"Black",
			"Auburn",
			"Blonde",
			"BlondeGolden",
			"Brown",
			"BrownDark",
			"Platinum",
			"Red"
		],

		eyebrowType: [
			"Angry",
			"AngryNatural",
			"Default",
			"DefaultNatural",
			"FlatNatural",
			"FrownNatural",
			"RaisedExcited",
			"RaisedExcitedNatural",
			"SadConcerned",
			"SadConcernedNatural",
			"UnibrowNatural",
			"UpDown",
			"UpDownNatural"
		],

		eyeType: [
			"Close",
			"Cry",
			"Default",
			"Dizzy",
			"EyeRoll",
			"Happy",
			"Hearts",
			"Side",
			"Squint",
			"Surprised",
			"Wink",
			"WinkWacky"
		],

		clotheType: [
			"BlazerShirt",
			"BlazerSweater",
			"CollarSweater",
			"Hoodie",
			"Overall",
			"ShirtCrewNeck",
			"ShirtScoopNeck",
			"ShirtVNeck"
		],

		clotheColor: [
			"Black",
			"Blue01",
			"Blue02",
			"Blue03",
			"Gray01",
			"Gray02",
			"Heather",
			"PastelBlue",
			"PastelGreen",
			"PastelOrange",
			"PastelRed",
			"PastelYellow",
			"Pink",
			"Red",
			"White"
		]
	};

	generateAvatar = () => {
		let avatarParams: Record<string, string> = {};
		Object.keys(this.options).forEach((option) => {
			let idx = Math.floor(Math.random() * this.options[option].length);
			avatarParams[option] = this.options[option][idx];
		});

		let avatarUrl = `${this.configService.get<string>("APP_URL")}/avatar?`;

		Object.keys(avatarParams).map((key) => {
			avatarUrl += `${key}=${avatarParams[key]}&`;
		});

		return { url: avatarUrl, params: avatarParams };
	};
}
