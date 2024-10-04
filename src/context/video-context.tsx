import { createContext, useReducer, ReactNode, useContext } from "react";

interface State {
  videoSrc: string | null;
  startTime: number;
  endTime: number;
  duration: number;
}

interface VideoContextType extends State {
  setVideoSrc: (src: string | null) => Promise<void>;
  setStartTime: (value: number) => Promise<any>;
  setEndTime: (value: number) => Promise<any>;
  setDuration: (value: number) => Promise<any>;
}

const initialState: State = {
  videoSrc: "",
  startTime: 0,
  endTime: 0,
  duration: 0,
};

export const VideoContext = createContext<VideoContextType>({
  ...initialState,
  setVideoSrc: () => Promise.resolve(),
  setStartTime: () => Promise.resolve(),
  setEndTime: () => Promise.resolve(),
  setDuration: () => Promise.resolve(),
});

interface VideoProviderProps {
  children: ReactNode;
}

const handlers: any = {
  INITIALIZE: (state: State, action: any) => {
    return { ...state };
  },
  SET_VIDEO_SRC: (state: State, action: any) => {
    const { videoSrc } = action.payload;
    return { ...state, videoSrc };
  },
  SET_START_TIME: (state: State, action: any) => {
    const { startTime } = action.payload;
    return { ...state, startTime };
  },
  SET_END_TIME: (state: State, action: any) => {
    const { endTime } = action.payload;
    return { ...state, endTime };
  },
  SET_DURATION: (state: State, action: any) => {
    const { duration } = action.payload;
    return { ...state, duration };
  },
};

export const VideoProvider = (props: VideoProviderProps) => {
  const reducer = (state: State, action: any) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const setVideoSrc = async (videoSrc: string | null) => {
    dispatch({
      type: "SET_VIDEO_SRC",
      payload: { videoSrc },
    });
  };

  const setStartTime = async (startTime: number) => {
    dispatch({
      type: "SET_START_TIME",
      payload: { startTime },
    });
  };

  const setEndTime = async (endTime: number) => {
    dispatch({
      type: "SET_END_TIME",
      payload: { endTime },
    });
  };

  const setDuration = async (duration: number) => {
    dispatch({
      type: "SET_DURATION",
      payload: { duration },
    });
  };

  return (
    <VideoContext.Provider
      value={{
        ...state,
        setVideoSrc,
        setStartTime,
        setEndTime,
        setDuration,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const VideoConsumer = VideoContext.Consumer;
