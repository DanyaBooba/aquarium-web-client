export default function ChatCss() {
    return (
        <style>
            {`
                .profile {
                    display: flex;
                    padding-left: 0;
                    padding-right: 0;
                }
                main {
                    margin-bottom: 0 !important;
                }
                .chat__motion-div {
                    padding-left: 24px;
                    padding-right: 24px;
                }
                @media(max-width: 1100px) {
                    .profile {
                        flex-direction: column;
                    }

                    .MuiContainer-root {
                        padding-left: 0px;
                        padding-right: 0px;
                    }

                    .profile__header {
                        padding-left: 16px;
                        padding-right: 16px;
                    }

                    .chat__motion-div {
                        height: calc(100dvh - 56.35px) !important;
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
                `}
        </style>
    )
}
