import { actionConsts } from "../definitions/actionConsts";

export const addError = (message) =>
    ({
        type: actionConsts.Test,
        payload: message
    })

export const clearFilters = () => {
  return {
    type: actionConsts.clear
  }
}

export const updateFilters = (category, filters) => {
  return {
    type: actionConsts.update,
    payload: {[category] : filters}
  }
}

export const addToFavourites = payload => {
  return {type: "ADD_FAV_ITEM", payload}
}

export const removeFromFavourites = payload => {
  return {type: "REMOVE_FAV_ITEM", payload}
}