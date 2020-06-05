import {
  GET_FILES_SUCCESS,
  GET_FILES_FAIL,
  DELETE_TAG_REQUEST,
  SAVE_TAG_REQUEST,
  DELETE_FILE_REQUEST,
  ADD_DURATION,
  ADD_SIZE,
  REMOVE_FILES,
} from '../actions/types';

const initialState = {
  entities: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FILES_SUCCESS: {
      const newEntities = { ...state.entities };
      Object.entries(payload).forEach(([key, value]) => {
        newEntities[key] = value;
      });
      return {
        entities: newEntities,
      };
    }
    case GET_FILES_FAIL:
      return {
        entities: {},
      };
    case DELETE_FILE_REQUEST: {
      const { submissionId } = payload;
      let entities = { ...state.entities };
      const obj = {};
      Object.entries(entities).forEach(([key, value]) => {
        if (key !== submissionId) {
          obj[key] = value;
        }
      });
      entities = obj;
      return {
        entities,
      };
    }
    case SAVE_TAG_REQUEST: {
      const { submissionId, tagId, tag } = payload;
      const entities = { ...state.entities };
      if (tag.new) {
        const newTagInfo = {};
        Object.entries(tag).forEach(([key, value]) => {
          if (key !== 'new' && key !== 'edited') {
            newTagInfo[key] = value;
          }
        });
        if (!entities[submissionId].entity.tags) {
          entities[submissionId].entity.tags = {};
        }
        entities[submissionId].entity.tags[tagId] = newTagInfo;
        return {
          entities,
        };
      }
      const newTagInfo = {};
      Object.entries(entities[submissionId].entity.tags[tagId]).forEach(([key, value]) => {
        if (key !== 'edited') {
          newTagInfo[key] = value;
        }
      });
      entities[submissionId].entity.tags[tagId] = newTagInfo;
      return {
        entities,
      };
    }
    case DELETE_TAG_REQUEST: {
      const { submissionId, tagId } = payload;
      const entities = { ...state.entities };
      const obj = {};
      Object.entries(entities[submissionId].entity.tags).forEach(([key, value]) => {
        if (key !== tagId) {
          obj[key] = value;
        }
      });
      entities[submissionId].entity.tags = obj;
      return {
        entities,
      };
    }
    case ADD_DURATION: {
      const { submissionId, duration, prettifiedDuration } = payload;
      const entities = { ...state.entities };
      if (entities[submissionId]) {
        entities[submissionId].entity.prettifiedDuration = prettifiedDuration;
        entities[submissionId].entity.duration = duration;
      }
      return {
        entities,
      };
    }
    case ADD_SIZE: {
      const { submissionId, size, prettifiedSize } = payload;
      const entities = { ...state.entities };
      if (entities[submissionId]) {
        entities[submissionId].entity.prettifiedSize = prettifiedSize;
        entities[submissionId].entity.size = size;
      }
      return {
        entities,
      };
    }
    case REMOVE_FILES:
      return {
        initialState,
      };
    default:
      return state;
  }
}
