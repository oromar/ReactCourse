const INITIAL_STATE = { description: '', list: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload.data }
        case 'TODO_ADDED':
        case 'CLEAR':
            return { ...state, /* list: [...state.list, action.payload.data], */ description: '' }
        default:
            return state
    }
}

