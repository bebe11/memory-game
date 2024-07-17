import {useCookies} from "react-cookie";
import {ICard} from "../interfaces/ICard";

export enum CookieType {
    CARDS = "CARDS",
    MOVES = "MOVES",
    TABLE_SIZE = "TABLE_SIZE",
}

const useCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies([
        CookieType.CARDS,
        CookieType.MOVES,
        CookieType.TABLE_SIZE,
    ]);

    const getCookieCards = (): ICard[] => cookies.CARDS;

    const setCookieCards = (cards: ICard[]) => setCookie(CookieType.CARDS, cards);

    const resetCookieCards = () => removeCookie(CookieType.CARDS);

    const getCookieMoves = (): number => cookies.MOVES;

    const setCookieMoves = (value: number) => setCookie(CookieType.MOVES, value);

    const resetCookieMoves = () => removeCookie(CookieType.MOVES);

    const getCookieTableSize = () => cookies.TABLE_SIZE;

    const setCookieTableSize = (value: number) => setCookie(CookieType.TABLE_SIZE, value);

    return {
        getCookieCards,
        setCookieCards,
        getCookieMoves,
        setCookieMoves,
        resetCookieMoves,
        getCookieTableSize,
        setCookieTableSize,
        resetCookieCards
    };
};

export default useCookie;
