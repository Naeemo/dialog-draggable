import { getCssTranslateCoords } from './util'

const handlePointerDown = (pointerDownEvt: PointerEvent) => {
    const target = pointerDownEvt.target as HTMLElement
    if (!target || target.tagName !== 'DIALOG') {
        return
    }

    const { x, y } = getCssTranslateCoords(target.style.transform)
    const xOffset = pointerDownEvt.clientX - target.offsetLeft - x
    const yOffset = pointerDownEvt.clientY - target.offsetTop - y
    const xMin = -target.offsetLeft
    const xMax = window.innerWidth - target.offsetLeft - target.offsetWidth
    const yMin = -target.offsetTop
    const yMax = window.innerHeight - target.offsetTop - target.offsetHeight
    if (xOffset < 0 || xOffset > target.offsetWidth) {
        return
    }
    if (yOffset < 0 || yOffset > target.offsetHeight) {
        return
    }

    function calculateTransform(pointerX: number, pointerY: number) {
        const xMoved = pointerX - target.offsetLeft - xOffset
        const yMoved = pointerY - target.offsetTop - yOffset
        const x = Math.min(Math.max(xMin, xMoved), xMax)
        const y = Math.min(Math.max(yMin, yMoved), yMax)

        target.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    target.setPointerCapture(pointerDownEvt.pointerId)
    const handleMove = (pointerMoveEvt: PointerEvent) =>
        calculateTransform(pointerMoveEvt.clientX, pointerMoveEvt.clientY)

    const handleTouchMove = (touchMoveEvt: TouchEvent) => {
        const clientX = touchMoveEvt.touches[0].clientX
        const clientY = touchMoveEvt.touches[0].clientY
        calculateTransform(clientX, clientY)
    }
    const handleRelease = (pointerUpEvt: PointerEvent) => {
        target.releasePointerCapture(pointerUpEvt.pointerId)
        target.removeEventListener('pointermove', handleMove)
        target.removeEventListener('touchmove', handleTouchMove)
        target.removeEventListener('pointerup', handleRelease)
    }

    target.addEventListener('pointermove', handleMove)
    target.addEventListener('touchmove', handleTouchMove)
    target.addEventListener('pointerup', handleRelease)
}

export function makeDialogDraggable() {
    window.removeEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerdown', handlePointerDown)
}
