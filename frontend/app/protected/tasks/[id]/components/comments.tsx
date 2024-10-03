import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { CommentDTO } from "@/services/dto/comment-dto";
import { useWebsocket } from "@/store/ws-store";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";

interface CommentType {
  comments: Array<CommentDTO>;
}

export default function Comment({ comments }: CommentType) {
  const { socket } = useWebsocket();
  const [commentState, setCommentState] = useState<Array<CommentDTO>>(
    comments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );

  useEffect(() => {
    socket?.on("commentCreated", (comment) => {
      setCommentState((prevState) => {
        const commentIndex = prevState.find((t) => t.id === comment.id);
        if (!commentIndex) {
          return [...prevState, comment].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return prevState;
      });
    });
  }, [setCommentState]);

  return (
    <>
      {commentState.map((comment) => {
        return (
          <Card key={comment.id} className="py-5 px-2 my-2">
            <CardContent>
              <div className="flex gap-5 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {comment.user.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{comment.user.username}</span>
                  <span className="text-xs text-mute">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <p className="mt-5">{comment.content}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
