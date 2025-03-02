import { Comments } from './ui/Comments/Comments';
import type { CommentsSchema, Comment, CommentSchema } from './model/types/comments';
import { updateComment } from './model/services/updateComment/updateComment';
import { deleteComment } from './model/services/deleteComment/deleteComment';
import { fetchComments } from './model/services/fetchComments/fetchComments';
import { addComment } from './model/services/addComment/addComment';
import { commentsActions, commentsReducer, getArticleComments }
  from './model/slices/commentsSlice';
import { articleDetailsRecommendationsReducer }
  from '../Article/model/slice/articleListSlice/ArticleRecommendationsSlice';

export {
  Comments,
  Comment,
  CommentSchema,
  updateComment,
  deleteComment,
  addComment,
  fetchComments,
  CommentsSchema,
  getArticleComments,
  commentsActions,
  commentsReducer,
  articleDetailsRecommendationsReducer,
};
