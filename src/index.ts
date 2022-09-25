import { getCssTranslateCoords } from './util'

function getDraggableAncestor(path: EventTarget[]): null | HTMLDialogElement {
    let draggableFlag = false
    for (let i = 0; i < path.length; i++) {
        const et = path[i] as HTMLElement

        if (et.tagName === 'BUTTON' || et.tagName === 'A') {
            return null
        }

        if (et.tagName === 'DIALOG' && draggableFlag) {
            return et as HTMLDialogElement
        }

        if (et.dataset && Object.hasOwn(et.dataset, 'dialogDraggable')) {
            draggableFlag = true
        }
    }

    return null
}

const handlePointerDown = (pointerDownEvt: PointerEvent) => {
    const target = pointerDownEvt.target as HTMLElement
    if (!target) {
        return
    }

    let dialog: HTMLDialogElement
    if (target.tagName === 'DIALOG') {
        dialog = target as HTMLDialogElement
    } else {
        const path = pointerDownEvt.composedPath()
        const dialogAncestor = getDraggableAncestor(path)
        if (!dialogAncestor) {
            return
        }
        dialog = dialogAncestor as HTMLDialogElement
    }

    const { x, y } = getCssTranslateCoords(dialog.style.transform)
    const xOffset = pointerDownEvt.clientX - dialog.offsetLeft - x
    const yOffset = pointerDownEvt.clientY - dialog.offsetTop - y
    const xMin = -dialog.offsetLeft
    const xMax = window.innerWidth - dialog.offsetLeft - dialog.offsetWidth
    const yMin = -dialog.offsetTop
    const yMax = window.innerHeight - dialog.offsetTop - dialog.offsetHeight
    if (xOffset < 0 || xOffset > dialog.offsetWidth) {
        return
    }
    if (yOffset < 0 || yOffset > dialog.offsetHeight) {
        return
    }

    function calculateTransform(pointerX: number, pointerY: number) {
        const xMoved = pointerX - dialog.offsetLeft - xOffset
        const yMoved = pointerY - dialog.offsetTop - yOffset
        const x = Math.min(Math.max(xMin, xMoved), xMax)
        const y = Math.min(Math.max(yMin, yMoved), yMax)

        dialog.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    dialog.setPointerCapture(pointerDownEvt.pointerId)
    const handleMove = (pointerMoveEvt: PointerEvent) =>
        calculateTransform(pointerMoveEvt.clientX, pointerMoveEvt.clientY)

    const handleTouchMove = (touchMoveEvt: TouchEvent) => {
        touchMoveEvt.preventDefault()
        const clientX = touchMoveEvt.touches[0].clientX
        const clientY = touchMoveEvt.touches[0].clientY
        calculateTransform(clientX, clientY)
    }
    const handleRelease = (pointerUpEvt: PointerEvent) => {
        dialog.releasePointerCapture(pointerUpEvt.pointerId)
        dialog.removeEventListener('pointermove', handleMove)
        dialog.removeEventListener('touchmove', handleTouchMove)
        dialog.removeEventListener('pointerup', handleRelease)
    }

    dialog.addEventListener('pointermove', handleMove)
    dialog.addEventListener('touchmove', handleTouchMove)
    dialog.addEventListener('pointerup', handleRelease)
}

export function makeDialogDraggable() {
    window.removeEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerdown', handlePointerDown)
}
