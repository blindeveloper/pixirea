const swimmersReducer = (state = [], action) => {
  switch (action.type) {
  case 'MOVE_TO_LEFT':
    return state
  case 'MOVE_TO_RIGHT':
    return state
  case 'MOVE_TO_TOP':
    return state
  case 'MOVE_TO_BOTTOM':
    return state
  default:
    return state
  }
}

export default swimmersReducer