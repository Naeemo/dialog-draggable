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

    target.setPointerCapture(pointerDownEvt.pointerId)
    const handleMove = (pointerMoveEvt: PointerEvent) => {
        const xMoved = pointerMoveEvt.clientX - target.offsetLeft - xOffset
        const yMoved = pointerMoveEvt.clientY - target.offsetTop - yOffset
        const x = Math.min(Math.max(xMin, xMoved), xMax)
        const y = Math.min(Math.max(yMin, yMoved), yMax)

        target.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const handleRelease = (pointerUpEvt: PointerEvent) => {
        target.releasePointerCapture(pointerUpEvt.pointerId)
        target.removeEventListener('pointermove', handleMove)
        target.removeEventListener('pointerup', handleRelease)
    }
    target.addEventListener('pointermove', handleMove)
    target.addEventListener('pointerup', handleRelease)
}

export function makeDialogDraggable() {
    window.removeEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerdown', handlePointerDown)
}
