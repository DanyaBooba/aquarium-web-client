import { motion } from 'framer-motion';
import ChatCss from '../../components/module/Chat/ChatCss';

const MotionDiv = motion.div;

function LayoutChat({ children }) {
    return (
        <>
            <MotionDiv
                className="chat__motion-div"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                {children}
            </MotionDiv>
            <ChatCss />
        </>
    );
}

export default LayoutChat;
