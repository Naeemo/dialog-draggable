export function getCssTranslateCoords(transformExp: string): {
    x: number
    y: number
    z: number
} {
    if (transformExp === '') {
        return { x: 0, y: 0, z: 0 }
    }
    const matchResult = transformExp.match(
        /translate3d\((?<x>[-.\d]+)(?:px)?,\s*(?<y>[-.\d]+)(?:px)?,\s*(?<z>[-.\d]+)(?:px)?\)/
    )
    if (!matchResult || !matchResult.groups) {
        return { x: 0, y: 0, z: 0 }
    }

    return {
        x: Number(matchResult.groups.x),
        y: Number(matchResult.groups.y),
        z: Number(matchResult.groups.z),
    }
}
