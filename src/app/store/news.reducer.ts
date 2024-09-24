export interface NewsItem {
  id: number;
  text: string;
}

export const initialState: {
  news: NewsItem[];
  selectedItem: NewsItem | undefined;
  newsText: string;
} = {
  news: [],
  selectedItem: undefined,
  newsText: "",
};

const ADD_NEWS = "ADD_NEWS";
const NEWS_TEXT_UPDATE = "NEWS_TEXT_UPDATE";
const SELECT_NEWS = "SELECT_NEWS";

export const newsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_NEWS: {
      const newsPost: NewsItem = {
        id: 1,
        text: state.newsText,
      };
      let stateCopy = { ...state };
      stateCopy.news = [...state.news];
      stateCopy.news.push(newsPost);
      stateCopy.newsText = action.payload;
      return stateCopy;
    }
    case NEWS_TEXT_UPDATE: {
      let stateCopy = { ...state };
      stateCopy.news = [...state.news];
      stateCopy.newsText = action.payload;
      return stateCopy;
    }
    case SELECT_NEWS: {
      let stateCopy = { ...state };
      stateCopy.news = [...state.news];
      stateCopy.selectedItem = state.news.find(
        (news: NewsItem) => news.id === action.payload
      );
      return stateCopy;
    }
    default:
      return state;
  }
};

export const selectNews = (state: any) => state.news;
