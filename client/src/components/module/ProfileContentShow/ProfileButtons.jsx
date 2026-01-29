import { useState } from 'react'
import { Stack } from '@mui/joy'
import ModalShowQRCode from '../ModalShowQRCode/ModalShowQRCode'

import { ProfileButtonMessage } from './ProfileButtons/ProfileButtonMessage'
import { ModalMore } from './ProfileButtons/ModalMore'
import { ProfileButtonSettings } from './ProfileButtons/ProfileButtonSettings'

function ProfileButtons({ username, id, side = false, itsme = false }) {
    const [shareOpen, setShareOpen] = useState(false);

    return (
        <>
            <Stack direction="row" justifyContent="center" mt={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {side && <ProfileButtonMessage id={id} />}
                {!side && <ProfileButtonSettings />}
                <ModalMore setShareOpen={setShareOpen} side={side} id={id} itsme={itsme} />
            </Stack>

            <ModalShowQRCode
                shareOpen={shareOpen}
                setShareOpen={setShareOpen}
                username={username}
                id={id}
            />
        </>
    );
}

export default ProfileButtons
