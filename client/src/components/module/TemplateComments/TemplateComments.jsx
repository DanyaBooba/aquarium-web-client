import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, Button, CircularProgress } from "@mui/joy";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useCommentsPost } from "../../../hooks/post/useCommentsPost";
import ServerError from "../ServerError/ServerError";
import { CommentsShow } from "./CommentsShow";
import { AddComment } from "./AddComment";
import { AnimatePresence, motion } from "framer-motion";

function AuthStub() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "12px",
                border: "1px dashed",
                borderColor: "neutral.outlinedBorder",
                textAlign: "center",
                mb: 2,
            }}
        >
            <Typography mb={2}>
                Чтобы оставить комментарий, нужно быть авторизованным
            </Typography>
            <Button
                size="sm"
                onClick={() => navigate("/auth")}
                sx={{
                    borderRadius: '50px',
                    px: 2,
                }}
            >
                Войти или зарегистрироваться
            </Button>
        </Box>
    );
}

function CorrectComments({
    comments = [],
    globalPostId = 0,
    countComments,
    upperCountComments = () => { },
    downCountComments = () => { },
}) {
    const [newComments, setNewComments] = useState([]);
    const [showComments, setShowComments] = useState([]);

    useEffect(() => {
        setShowComments(comments);
    }, [comments]);

    const { isAuth } = useAuth();

    const handlerNewComment = (comment) => {
        upperCountComments();
        setNewComments([
            comment,
            ...newComments
        ]);
    }

    const onDelete = (id) => {
        setShowComments(prev => prev.filter(c => c.id !== id));
        setNewComments(prev => prev.filter(c => c.id !== id));
        downCountComments();
    }

    const onEdit = (id, newContent) => {
        setShowComments(prev => prev.map(c => (c.id === id ? { ...c, content: newContent } : c)));
        setNewComments(prev => prev.map(c => (c.id === id ? { ...c, content: newContent } : c)));
    };

    return (
        <>
            {isAuth ? (
                <AddComment
                    globalPostId={globalPostId}
                    setNewComments={handlerNewComment}
                />
            ) : (
                <AuthStub />
            )}

            {countComments === 0 && (
                <Typography color="neutral">
                    Комментариев нет.
                </Typography>
            )}

            {countComments > 0 && (
                <CommentsShow
                    comments={showComments ?? []}
                    newComments={newComments ?? []}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
        </>
    )
}

function ShowCountComments({ countComments = 0 }) {
    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={countComments}
                initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ display: "inline-block", marginLeft: 8 }}
            >
                {countComments}
            </motion.span>
        </AnimatePresence>
    );
}

export default function TemplateComments({ globalPostId = 0 }) {
    const { comments, error, loading } = useCommentsPost(globalPostId);
    const [countComments, setCountComments] = useState(-1);

    useEffect(() => {
        if (!error) {
            setCountComments((comments ?? []).length);
        }
    }, [loading, error, comments]);

    const upperCountComments = () =>
        setCountComments(countComments + 1);

    const downCountComments = () =>
        setCountComments(Math.max(0, countComments - 1));

    const { hash } = useLocation();

    useEffect(() => {
        if (!hash || countComments < 0) return;

        const el = document.getElementById(hash.slice(1));
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, [hash, countComments]);

    return (
        <Box my={4}>
            <Typography level="title-lg" mb={2} id="comments">
                Комментарии
                {!error && countComments >= 0 && (
                    <ShowCountComments countComments={countComments} />
                )}
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <ServerError desc="Не удалось загрузить комментарии" />
            ) : (
                <CorrectComments
                    comments={comments ?? []}
                    globalPostId={globalPostId}
                    countComments={countComments}
                    upperCountComments={upperCountComments}
                    downCountComments={downCountComments}
                />
            )}
        </Box>
    );
}
