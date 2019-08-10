import {
    ADD_NEW_GRADIENT_STOP,
    SET_ACTIVE_GRADIENT_STOP,
    UPDATE_GRADIENT_STOP,
    REMOVE_GRADIENT_STOP,
    CHANGE_GRADIENT_TYPE,
    CHANGE_GRADIENT_DIRECTION,
    CHANGE_GRADIENT_ANGLE
} from './actionTypes'
import uuid from 'uuid/v4'

export function updateGradientStop(id, newValsObj) {
    return {
        type: UPDATE_GRADIENT_STOP,
        payload: { id, values: newValsObj }
    }
}

export function setActiveGradientStop(id) {
    return {
        type: SET_ACTIVE_GRADIENT_STOP,
        payload: id
    }
}

export function addNewGradientStop(color, percent) {
    return {
        type: ADD_NEW_GRADIENT_STOP,
        payload: {
            id: uuid(),
            color: color || { h: Math.random(), s: 1, v: 1, a: 1 },
            percent
        }
    }
}

export function removeGradientStop(id) {
    return {
        type: REMOVE_GRADIENT_STOP,
        payload: id
    }
}

export function changeGradientType(type) {
    return {
        type: CHANGE_GRADIENT_TYPE,
        payload: type
    }
}

export function changeGradientDirection(direction) {
    return { type: CHANGE_GRADIENT_DIRECTION, payload: direction }
}

export function chnageGradientAngle(angle) {
    return {
        type: CHANGE_GRADIENT_ANGLE,
        payload: angle
    }
}
