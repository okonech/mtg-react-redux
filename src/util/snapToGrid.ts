export default function snapToGrid(x: number, y: number) {
    const snappedX = Math.round(x / 25) * 25;
    const snappedY = Math.round(y / 25) * 25;
    return [snappedX, snappedY];
}
