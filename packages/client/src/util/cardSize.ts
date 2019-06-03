
let cardSize: CardSize;
setCardHeight(22.5);

interface CardSize {
    height: number;
    width: number;
}

export function setCardHeight(heightVh: number) {
    cardSize = {
        height: heightVh,
        width: heightVh * 0.716
    };
}

export function getCardSizeVh() {
    return cardSize;
}

export function getCardSizePx() {
    const { height, width } = cardSize;
    const { clientHeight } = document.documentElement;
    return {
        height: Math.round((height / 100) * clientHeight),
        width: Math.round((width / 100) * clientHeight)
    };
}
