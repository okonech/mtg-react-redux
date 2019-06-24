
// calc if 2 rectangles intersect, with tolerance overlap allowed
function rectIntersecting(aLeft: number, aTop: number, aRight: number, aBottom: number,
                          bLeft: number, bTop: number, bRight: number, bBottom: number,
                          tolerance = 0) {

    return !(
        aBottom - tolerance < bTop
        // 'a' top doesn't touch 'b' bottom
        || aTop + tolerance > bBottom
        // 'a' right doesn't touch 'b' left
        || aRight - tolerance < bLeft
        // 'a' left doesn't touch 'b' right
        || aLeft + tolerance > bRight
    );
}

interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export default function rectIntersect<T extends Rect>(rect1: T, rect2: T, tolerance = 0) {
    const { left, top, right, bottom } = rect1;
    const { left: l2, top: t2, right: r2, bottom: b2 } = rect2;
    return rectIntersecting(left, top, right, bottom, l2, t2, r2, b2, tolerance);
}
