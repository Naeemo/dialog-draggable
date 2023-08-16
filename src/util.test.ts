import { describe, expect, it } from 'vitest'
import { getCssTranslateCoords } from './util'

describe('util', () => {
    it.concurrent('getCssTranslateCoords', () => {
        expect(getCssTranslateCoords(``)).toEqual({ x: 0, y: 0, z: 0 })
        expect(getCssTranslateCoords(`translate3d(0,0,0)`)).toEqual({
            x: 0,
            y: 0,
            z: 0,
        })
        expect(getCssTranslateCoords(`translate3d(0px,0,0)`)).toEqual({
            x: 0,
            y: 0,
            z: 0,
        })
        expect(getCssTranslateCoords(`translate3d(10px,0,0)`)).toEqual({
            x: 10,
            y: 0,
            z: 0,
        })
        expect(
            getCssTranslateCoords(`translate3d(10px,1234.23423px,0)`),
        ).toEqual({
            x: 10,
            y: 1234.23423,
            z: 0,
        })
        expect(
            getCssTranslateCoords(`translate3d(10px,-1234.23423px,0)`),
        ).toEqual({
            x: 10,
            y: -1234.23423,
            z: 0,
        })
        expect(
            getCssTranslateCoords(`translate3d(-314.113px, -5.5px, 0px);`),
        ).toEqual({
            x: -314.113,
            y: -5.5,
            z: 0,
        })
    })
})
