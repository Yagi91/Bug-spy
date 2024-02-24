import { useEffect, useState, useRef, useCallback, ReactElement } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getBugsComments, createComment, deleteComment } from "./api-comments";
import { formatDate, formatDateLong } from "../../common/utils";
import React from "react";

export interface CommentProps {
  user: { name: string; _id: string };
  bug: string;
  text: string;
  parentComment?: string;
  level?: number;
  replies?: CommentProps[];
  created?: string;
  _id?: string;
}

export const CommentSection = ({ bugId, isOpen }: { bugId: string, isOpen:boolean }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "failed" | "succeeded">('idle');
  const [newCommentText, setNewCommentText] = useState<string>("");

  const userId = useAppSelector((state) => state.auth.userInfo._id);
  console.log(isOpen, bugId);
  useEffect(() => {
    async function fetchComments(bugId: string) {
      setStatus('loading');
      try {
        console.log('bugId', bugId);
        const data: CommentProps[] = await getBugsComments({bugId});
        setComments(data);
        setStatus("succeeded");
      }
      catch (err) {
        setStatus("failed");
        setError(err as string);
      }
    }
    if(status === 'idle'&& isOpen){fetchComments(bugId);}

  }, [ bugId, status, isOpen]);

  const handlenewCommentTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
  }
  type SubmitCommentprops = Omit<CommentProps, "user"> & { user: string };
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting comment");
    e.preventDefault();
    const newComment: SubmitCommentprops = {
      bug: bugId,
      text: newCommentText,
      user: userId as string,
    }
    try {
      const comment = await createComment(newComment);
      // Update the comments state with the new comment
      setComments([...comments, comment]);
      setNewCommentText(""); // Clear the input field
    } catch (error) {
      console.error(error);
      setError(error as string);
    }
  }

  const handleSubmitReply = useCallback(async (props: SubmitCommentprops) => {
    try {
      const reply: CommentProps = await createComment(props);
      // Update the comments state with the new comment
      const addReplyToComments = (comments: CommentProps[]): CommentProps[] => {
        return comments.map((comment) => {
          if (comment._id === props.parentComment) {
            return {
              ...comment,
              replies: comment.replies ? [...comment.replies, reply] : [reply],
            };
          } else {
            return {
              ...comment,
              replies: addReplyToComments(comment.replies ? comment.replies : []),
            };
          }
        });
      };
      setComments((prevComments) => addReplyToComments(prevComments));

    } catch (error) {
      console.error(error);
      setError(error as string);
    }
  }, []);

  const handleRemoveComment = async (commentId: string) => {
    try {

      const data = await deleteComment({ commentId });

      console.log(data);
      // Update the comments state with the new comment
      const removeComment = (id: string, comments: CommentProps[]): CommentProps[] => {
        return comments.reduce((acc, comment) => {
          if (comment._id === id) {
            return acc; // Exclude current comment
          } else if (comment.replies) {
            return [...acc, { ...comment, replies: removeComment(id, comment.replies) }]; // Recursively search in replies
          } else {
            return [...acc, comment]; // Include current comment
          }
        }, [] as CommentProps[]);
      };

      setComments(prevComments => removeComment(commentId, prevComments));
    } catch (error) {
      console.error(error);
      setError(error as string);
    }
  }

  console.log("comments", comments);

  return (
    <section className="bg-neutral-300 py-8 rounded-lg lg:py-16 antialiased h-64 overflow-y-auto">
      <div className="max-w-full px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-500">Discussion ({comments.length})</h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmitComment}>
          <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-white border-white">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea id="comment" rows={6}
              value={newCommentText}
              onChange={handlenewCommentTextChange}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-white"
              placeholder="Write a comment..." required></textarea>
          </div>
          <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
          </button>
        </form>
        {status === 'loading' && <h2 className="text-center font-bold">Loading...</h2>}
        {status === 'failed' && <h2 className="text-center font-bold">Failed to load comments</h2>}
        {status === 'succeeded' && comments.length > 0 ? comments.map((comment) => <Comment comment={comment} handleRemove={handleRemoveComment}>{<ReplyForm createReply={handleSubmitReply} userId={userId as string} parentId={comment._id as string} bugId={comment.bug} />}</Comment>) : <h2 className="text-center font-bold">No Comments yet</h2>}
        {/* {comments.length > 0 ? comments.map((comment) => <Comment comment={comment} handleRemove={handleRemoveComment}>{<ReplyForm createReply={handleSubmitReply} userId={userId as string} parentId={comment._id as string} bugId={comment.bug} />}</Comment>) : <h2 className="text-center font-bold">No Comments</h2>} */}
      </div>
    </section>
  )
}


function Comment({ comment, extraClasses, handleRemove, children }: { comment: CommentProps, extraClasses?: string, handleRemove?: (commentId: string) => void, children?: ReactElement<any, any> | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formattedDate = formatDate(comment.created as string);

  const handleCommentSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dropdown = ref.current;
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  }

  // Close the dropdown if the user clicks outside of it
  const handleClickOutside = (event: any) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      console.log("click outside");
      const dropdown = ref.current;
      dropdown?.classList.add("hidden");
    }
  };

  return (
    <>
      <article className={"p-6 text-base bg-neutral-300 rounded-lg " + extraClasses}>
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"><img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt={comment.user.name} />{comment.user.name}</p>
            <p className="text-sm text-gray-600"><time dateTime={formattedDate}
              title={formatDateLong(comment.created as string)}>{formattedDate}</time></p>
          </div>
          <div className="relative inline-block" ref={parentRef}>
            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
              onClick={handleCommentSettings}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none bg-gray-300 hover:bg-gray-400 focus:ring-gray-500"
              type="button">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span className="sr-only">Comment settings</span>
            </button>
            <div id="dropdownComment1" ref={ref} data-dropdown-content
              className="hidden absolute z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 right-0">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton">
                <li>
                  <button type="button"
                    className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</button>
                </li>
                <li>
                  <button type="button"
                    onClick={() => handleRemove && handleRemove(comment._id as string)}
                    className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</button>
                </li>
                <li>
                  <button type="button"
                    className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</button>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        <p className="text-gray-900">{comment.text}</p>
        {children && React.cloneElement(children, { parentId: comment._id })}
      </article>
      {comment.replies && comment.replies.map((reply) => <div className=" ml-6 lg:ml-12"><Comment comment={reply} handleRemove={handleRemove} children={comment.level && comment.level < 2 ? children : null} /></div>)}
    </>
  )
}

const ReplyForm = ({ parentId, bugId, userId, createReply }: { userId: string, parentId: string, bugId: string, createReply?: (props: Omit<CommentProps, "user"> & { user: string }) => Promise<void> }) => {
  const [replyText, setReplyText] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLDivElement>(null);


  const handleSubmitReply = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('clicked button, isVisible:', isVisible);
    setIsVisible(!isVisible);
    if (isVisible && replyText) {
      setReplyText(""); // Clear the input field
      if (createReply) {
        await createReply({ bug: bugId, text: replyText, user: userId, parentComment: parentId });
      }
    }
  }

  // const handleTransitionEnd = () => {
  //   if (isVisible && textAreaRef.current) {
  //     textAreaRef.current.focus();
  //   }
  // };

  console.log('isVisible', isVisible);
  return (
    <form className="w-full transiton flex items-center mt-1 space-x-2">
      <div className={`bg-gray-300 overflow-hidden transition-all duration-500 ${isVisible ? 'w-full max-w-full' : 'w-0 max-w-0 overflow-hidden'}`} >
        <label htmlFor="Reply" className="sr-only">Your Reply</label>
        <textarea id="Reply" rows={1}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full text-sm text-gray-900 border-0 border-b-2 border-gray-700 focus:ring-0 focus:outline-none bg-gray-300"
          placeholder="Write a Reply..." required></textarea>
      </div>
      <button type='submit'
        onClick={handleSubmitReply}
        className="flex items-center text-sm text-gray-500 hover:underline font-medium">
        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
        </svg>
        Reply
      </button>
    </form>
  )
}


export default CommentSection;